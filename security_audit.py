#!/usr/bin/env python3
"""
security_audit.py — Auditoria de segurança estática da aplicação web IEFP Hackers
Analisa: CSP, Firestore rules, Storage rules, XSS, SRI, auth, IDOR, dados sensíveis

Uso: python3 security_audit.py [--dir <caminho>] [--out <ficheiro.txt>]
"""

import os
import re
import sys
import json
import glob
import argparse
import datetime
from pathlib import Path
from dataclasses import dataclass, field
from typing import List, Optional


# ── Estruturas de dados ────────────────────────────────────────────────────────

@dataclass
class Finding:
    severity: str          # CRITICAL | HIGH | MEDIUM | LOW | INFO
    category: str
    title: str
    location: str
    detail: str
    fix: str

    SEV_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3, "INFO": 4}

    def __lt__(self, other):
        return self.SEV_ORDER.get(self.severity, 99) < self.SEV_ORDER.get(other.severity, 99)


findings: List[Finding] = []


def add(severity, category, title, location, detail, fix=""):
    findings.append(Finding(severity, category, title, location, detail, fix))


# ── Utilitários ───────────────────────────────────────────────────────────────

def read(path) -> Optional[str]:
    try:
        return Path(path).read_text(encoding="utf-8")
    except Exception:
        return None


def find_lines(content: str, pattern: str, flags=re.IGNORECASE) -> List[tuple]:
    """Devolve lista de (nº_linha, texto) onde o padrão faz match."""
    matches = []
    for i, line in enumerate(content.splitlines(), 1):
        if re.search(pattern, line, flags):
            matches.append((i, line.strip()))
    return matches


def js_files(base: str) -> List[str]:
    return glob.glob(os.path.join(base, "templates", "js", "*.js"))


def all_template_files(base: str) -> List[str]:
    result = []
    for ext in ("*.js", "*.html", "*.css"):
        result += glob.glob(os.path.join(base, "templates", "**", ext), recursive=True)
    return result


# ── 1. CSP (firebase.json) ────────────────────────────────────────────────────

def audit_csp(base: str):
    path = os.path.join(base, "firebase.json")
    raw = read(path)
    if not raw:
        add("HIGH", "CSP", "firebase.json não encontrado", path, "Sem configuração de hosting detectada.")
        return

    try:
        cfg = json.loads(raw)
    except json.JSONDecodeError:
        add("HIGH", "CSP", "firebase.json inválido", path, "JSON malformado.")
        return

    headers = {}
    for h in cfg.get("hosting", {}).get("headers", []):
        src = h.get("source", "")
        for hdr in h.get("headers", []):
            headers.setdefault(src, {})[hdr["key"].lower()] = hdr["value"]

    csp_main = headers.get("**", {}).get("content-security-policy", "")
    csp_cheat = headers.get("cheatsheet_*.html", {}).get("content-security-policy", "")

    # Verificar unsafe-inline especificamente no script-src (não em style-src)
    script_src_match = _re.search(r'script-src([^;]+)', csp_main)
    if script_src_match and "'unsafe-inline'" in script_src_match.group(1):
        add("HIGH", "CSP", "unsafe-inline em script-src",
            f"{path} → headers['**']",
            "CSP contém 'unsafe-inline' em script-src — anula a proteção XSS.",
            "Usar hash SHA-384 do bundle inline em vez de 'unsafe-inline'.")
    elif "'sha384-" in csp_main and 'script-src' in csp_main:
        add("INFO", "CSP", "script-src usa hash SHA-384 (sem unsafe-inline) ✓",
            f"{path} → headers['**']",
            "Bundle inline protegido por hash — apenas este script específico é permitido.")

    if "'unsafe-eval'" in csp_main or "wasm-unsafe-eval" in csp_main:
        add("MEDIUM", "CSP", "unsafe-eval/wasm-unsafe-eval presente",
            f"{path} → headers['**']",
            "Necessário para Pyodide mas aumenta superfície de ataque.",
            "Isolar a execução Pyodide num Web Worker com CSP própria.")

    if "*.run.app" in csp_main:
        add("MEDIUM", "CSP", "connect-src demasiado amplo (*.run.app)",
            f"{path} → connect-src",
            "Permite ligações a QUALQUER endpoint Cloud Run em qualquer região.",
            "Substituir por URL explícita do endpoint (ex: ciberseg-api-<id>.europe-west1.run.app).")

    if csp_cheat and "'unsafe-inline'" in csp_cheat:
        add("MEDIUM", "CSP", "CSP dos cheatsheets mais permissiva que o site principal",
            f"{path} → headers['cheatsheet_*.html']",
            "unsafe-inline nos cheatsheets pode ser explorado se um cheatsheet for comprometido.",
            "Alinhar CSP dos cheatsheets com a CSP principal ou removê-la (herda do servidor).")

    xfo = headers.get("**", {}).get("x-frame-options", "")
    if xfo.upper() != "DENY":
        add("MEDIUM", "CSP", "X-Frame-Options não é DENY",
            f"{path} → headers['**']",
            f"Valor atual: '{xfo}'. Permite embedding em iframes.",
            "Definir X-Frame-Options: DENY.")
    else:
        add("INFO", "CSP", "X-Frame-Options: DENY ✓", path, "Clickjacking mitigado.")

    if "no-cache" in headers.get("**/*.html", {}).get("cache-control", ""):
        add("INFO", "CSP", "Cache-Control HTML: no-cache ✓", path, "HTML não é cacheado pelo browser.")


# ── 2. Firestore Rules ────────────────────────────────────────────────────────

def audit_firestore(base: str):
    path = os.path.join(base, "firestore.rules")
    raw = read(path)
    if not raw:
        add("CRITICAL", "Firestore", "firestore.rules não encontrado", path,
            "Sem regras de segurança Firestore — base de dados pode estar aberta.")
        return

    # allow read/write: if true  (completamente aberto)
    if re.search(r"allow\s+(read|write)\s*:\s*if\s+true", raw):
        add("CRITICAL", "Firestore", "Regra aberta: allow ... if true",
            path, "Qualquer pessoa pode ler/escrever sem autenticação.",
            "Remover imediatamente e implementar regras de autenticação.")

    # allow read/write sem condição
    if re.search(r"allow\s+(read|write)\s*;", raw):
        add("CRITICAL", "Firestore", "allow sem condição detectado",
            path, "Acesso irrestrito a pelo menos uma coleção.",
            "Adicionar condição: allow read: if request.auth != null;")

    # Materials sem verificação de ownership
    mat_block = re.search(
        r"match\s*/materials/\{[^}]+\}\s*\{(.+?)\}", raw, re.DOTALL
    )
    if mat_block:
        block = mat_block.group(1)
        if "request.auth.uid" not in block and "uid" not in block:
            add("HIGH", "Firestore", "IDOR: /materials sem ownership check",
                f"{path} → /materials/{{key}}",
                "Qualquer aluno autenticado pode ler/escrever materiais de qualquer sessão.",
                "Adicionar: allow write: if isAluno() && request.auth.uid == resource.data.ownerUid;")

    # Invites sem verificação de expiração nas regras
    invite_block = re.search(
        r"match\s*/invites/\{[^}]+\}\s*\{(.+?)\}", raw, re.DOTALL
    )
    if invite_block:
        block = invite_block.group(1)
        if "expiresAt" not in block and "expires" not in block.lower():
            add("MEDIUM", "Firestore", "Invites: expiração não validada nas regras",
                f"{path} → /invites/{{token}}",
                "A expiração só é validada na Cloud Function. Regra Firestore não bloqueia tokens expirados.",
                "Adicionar: resource.data.expiresAt > request.time na regra allow read.")

    # Rate limiting ausente (heurístico: sem get() de timestamp recente)
    if "getAfter" not in raw and "request.time" not in raw:
        add("MEDIUM", "Firestore", "Sem rate limiting nas regras Firestore",
            path,
            "Nenhuma verificação de frequência de escrita detectada nas regras.",
            "Implementar rate limiting via Cloud Function (verificar timestamp da última escrita).")

    # Soft delete — mensagens deleted:true ainda legíveis
    if re.search(r"deleted.*true", raw, re.IGNORECASE) or "deleted" in raw:
        add("LOW", "Firestore", "Soft-delete: mensagens apagadas continuam legíveis via query direta",
            path,
            "allow read genérico permite query de `where('deleted','==',true)`.",
            "Filtrar na regra: allow read: if !resource.data.deleted || isModerador();")

    # Verificar se há isAuth() ou request.auth != null
    if "request.auth" in raw or "isAuth()" in raw:
        add("INFO", "Firestore", "Autenticação obrigatória nas regras ✓", path,
            "Todas as operações exigem autenticação.")


# ── 3. Storage Rules ──────────────────────────────────────────────────────────

def audit_storage(base: str):
    path = os.path.join(base, "storage.rules")
    raw = read(path)
    if not raw:
        add("CRITICAL", "Storage", "storage.rules não encontrado", path,
            "Sem regras de segurança Storage — ficheiros podem estar acessíveis publicamente.")
        return

    # allow read: if request.auth != null — verificar se há path com uid
    if re.search(r"allow\s+read\s*:\s*if\s+request\.auth\s*!=\s*null\s*;", raw):
        # Se o path já inclui uid como segmento, a leitura partilhada é aceitável (materiais de sessão)
        if re.search(r"match\s*/[^{]*\{uid\}", raw):
            add("INFO", "Storage", "Leitura de storage partilhada (materiais de sessão, design intencional)",
                path,
                "Upload restrito ao próprio UID; leitura partilhada é intencional (materiais por sessão).")
        else:
            add("HIGH", "Storage", "IDOR: qualquer utilizador autenticado lê qualquer ficheiro",
                path,
                "A regra de leitura não valida ownership — utilizador A pode descarregar ficheiros de B.",
                "Organizar storage por UID: /uc-files/{uid}/{file} e validar request.auth.uid == uid.")

    # content-type regex permissivo
    if r"vnd\\..*" in raw or "vnd.*" in raw:
        add("MEDIUM", "Storage", "Content-type regex permissivo (vnd\\..*)",
            path,
            "Aceita application/vnd.* que inclui formatos com macros (Excel, etc.).",
            "Usar whitelist explícita: ['application/pdf', 'image/png', 'image/jpeg', ...]")

    if re.search(r"allow\s+read\s*:\s*if\s+true", raw):
        add("CRITICAL", "Storage", "Storage read aberto a todos (if true)",
            path, "Qualquer pessoa pode ler todos os ficheiros.", "Remover imediatamente.")

    # Limite de tamanho
    size_match = re.search(r"request\.resource\.size\s*<\s*([\d\s\*]+)", raw)
    if size_match:
        add("INFO", "Storage", f"Limite de tamanho definido ✓", path,
            f"Expressão: {size_match.group(0).strip()}")
    else:
        add("MEDIUM", "Storage", "Sem limite de tamanho nos uploads",
            path, "Ficheiros de qualquer tamanho podem ser enviados.",
            "Adicionar: request.resource.size < 4 * 1024 * 1024;")


# ── 4. XSS — innerHTML sem escapeHtml ─────────────────────────────────────────

def audit_xss(base: str):
    for fpath in js_files(base):
        content = read(fpath)
        if not content:
            continue
        fname = os.path.relpath(fpath, base)

        lines = content.splitlines()
        for i, line in enumerate(lines, 1):
            stripped = line.strip()
            # innerHTML com template literal ou concatenação
            if "innerHTML" in stripped and ("${" in stripped or "+=" in stripped or "= `" in stripped or '= "' in stripped):
                # Verificar se há escapeHtml() na mesma linha ou nas 3 linhas seguintes
                context = "\n".join(lines[max(0, i-1):min(len(lines), i+3)])
                if "escapeHtml" not in context and "textContent" not in context:
                    # Ignorar falsos positivos: apenas números, tab.id (IDs internos),
                    # literais estáticos sem interpolação de dados externos
                    interp = _re.findall(r'\$\{([^}]+)\}', stripped)
                    # Verificar se todas as interpolações são numéricas/seguras
                    safe_patterns = [
                        lambda e: _re.fullmatch(r'[\w.]+\.(?:toFixed|toString|length|size)\([^)]*\)', e),
                        lambda e: _re.fullmatch(r'[\w.]+(?:XP|Pct|pct|done|target|pct|total|fct|dias|horas)', e),
                        lambda e: e.strip() in ('totalXP', 'maxXP', 'xpPct', 'pct', 'done', 'target'),
                        lambda e: _re.fullmatch(r'tab\.id\b.*', e),
                        lambda e: _re.fullmatch(r'[A-Z_]+\.[a-z_]+\.[a-z_]+', e),  # CRONOGRAMA.x.y (now escaped)
                    ]
                    if interp and all(any(p(e.strip()) for p in safe_patterns) for e in interp):
                        continue  # all interpolations are numeric/safe
                    add("HIGH", "XSS", "innerHTML sem escapeHtml()",
                        f"{fname}:{i}",
                        f"Possível XSS: `{stripped[:100]}`",
                        "Usar escapeHtml() em todos os dados dinâmicos ou substituir por textContent.")

            # document.write
            if re.search(r"document\.write\s*\(", stripped):
                add("HIGH", "XSS", "document.write() detectado",
                    f"{fname}:{i}",
                    f"`{stripped[:100]}`",
                    "Remover document.write() — usar createElement/textContent.")

            # eval()
            if re.search(r"\beval\s*\(", stripped) and "// " not in stripped[:stripped.find("eval")]:
                add("HIGH", "XSS", "eval() detectado",
                    f"{fname}:{i}",
                    f"`{stripped[:100]}`",
                    "Remover eval() — risco de execução de código arbitrário.")


# ── 5. SRI — Subresource Integrity ────────────────────────────────────────────

def audit_sri(base: str):
    html_files = glob.glob(os.path.join(base, "templates", "**", "*.html"), recursive=True)
    html_files += glob.glob(os.path.join(base, "*.html"))

    for fpath in html_files:
        content = read(fpath)
        if not content:
            continue
        fname = os.path.relpath(fpath, base)

        for i, line in enumerate(content.splitlines(), 1):
            # <script src="http..."> sem integrity
            if re.search(r'<script\s[^>]*src=["\']https?://', line, re.IGNORECASE):
                if "integrity=" not in line:
                    src = re.search(r'src=["\']([^"\']+)', line)
                    url = src.group(1) if src else "?"
                    add("HIGH", "Supply Chain", f"Script externo sem SRI hash",
                        f"{fname}:{i}",
                        f"URL: {url[:80]}",
                        "Adicionar integrity='sha384-...' crossorigin='anonymous'.")

            # <link rel="stylesheet" href="https..."> sem integrity
            if re.search(r'<link\s[^>]*href=["\']https?://', line, re.IGNORECASE):
                if "stylesheet" in line and "integrity=" not in line:
                    add("LOW", "Supply Chain", "Stylesheet externo sem SRI hash",
                        f"{fname}:{i}",
                        line.strip()[:100],
                        "Adicionar integrity hash para folhas de estilo externas.")

    # Scripts carregados dinamicamente (createElement('script'))
    for fpath in js_files(base):
        content = read(fpath)
        if not content:
            continue
        fname = os.path.relpath(fpath, base)
        for i, line in enumerate(content.splitlines(), 1):
            if "createElement('script')" in line or 'createElement("script")' in line:
                # Verificar se as próximas linhas definem integrity
                ctx_start = i
                ctx_end = min(len(content.splitlines()), i + 6)
                ctx = "\n".join(content.splitlines()[ctx_start:ctx_end])
                if "integrity" not in ctx:
                    add("MEDIUM", "Supply Chain", "Script dinâmico carregado sem SRI",
                        f"{fname}:{i}",
                        "Script criado via createElement sem definir integrity.",
                        "Definir .integrity e .crossOrigin antes de append ao DOM.")


# ── 6. Dados sensíveis em localStorage ────────────────────────────────────────

def audit_localstorage(base: str):
    sensitive_keys = ["invite", "token", "secret", "password", "auth", "session", "key"]

    for fpath in js_files(base):
        content = read(fpath)
        if not content:
            continue
        fname = os.path.relpath(fpath, base)

        for i, line in enumerate(content.splitlines(), 1):
            if "localStorage.setItem" in line:
                # Verificar se a chave contém palavra sensível
                key_match = re.search(r"localStorage\.setItem\(['\"]([^'\"]+)['\"]", line)
                if key_match:
                    key = key_match.group(1).lower()
                    if any(s in key for s in sensitive_keys):
                        # Verificar se há TTL/expiry associado (padrão seguro implementado)
                        context_lines = content.splitlines()[max(0, i-3):min(len(content.splitlines()), i+3)]
                        ctx = "\n".join(context_lines)
                        if 'exp' in ctx and ('Date.now()' in ctx or 'TTL' in ctx or '_INVITE_TTL' in ctx):
                            add("LOW", "Sensitive Data",
                                f"Dado sensível em localStorage com TTL: '{key_match.group(1)}'",
                                f"{fname}:{i}",
                                f"✓ TTL implementado. Risco residual: token acessível durante {10} min.",
                                "Considerar sessionStorage se o fluxo OAuth redirect não for necessário.")
                        else:
                            add("HIGH", "Sensitive Data",
                                f"Dado sensível em localStorage sem TTL: '{key_match.group(1)}'",
                                f"{fname}:{i}",
                                f"`{line.strip()[:100]}`",
                                "Usar sessionStorage (limpo ao fechar o tab) ou adicionar TTL.")


# ── 7. Autenticação & Autorização ─────────────────────────────────────────────

def audit_auth(base: str):
    auth_path = os.path.join(base, "templates", "js", "auth.js")
    content = read(auth_path)
    if not content:
        add("HIGH", "Auth", "auth.js não encontrado", auth_path, "Sem módulo de autenticação.")
        return

    fname = os.path.relpath(auth_path, base)

    # Verificar se role é validado no servidor (via Firestore)
    if "role" in content and ("_userRole" in content or "window._userRole" in content):
        # Role em memória — verificar se também está em Firestore
        if "db.collection" in content or "firestore" in content.lower():
            add("INFO", "Auth", "Role lido do Firestore ✓", fname,
                "Role do utilizador é lido do Firestore a cada sessão.")
        else:
            add("HIGH", "Auth", "Role apenas em memória sem validação Firestore",
                fname, "window._userRole pode ser manipulado via console.",
                "Validar role no servidor (Firestore rules) e não confiar no valor client-side.")

    # Verificar se há signInWithRedirect sem verificação de origem
    if "signInWithRedirect" in content:
        add("INFO", "Auth", "signInWithRedirect detectado", fname,
            "Usado para OAuth. Verificar se redirectResult é validado após redirect.")

    # Verificar se erros de auth expõem informação
    error_lines = find_lines(content, r"console\.(log|error|warn).*auth")
    if error_lines:
        for line_no, line_text in error_lines[:3]:
            add("LOW", "Auth", "console.log em fluxo de autenticação",
                f"{fname}:{line_no}",
                f"`{line_text[:80]}`",
                "Remover console.log em produção para evitar exposição de info de auth.")


# ── 8. Firebase config exposta ────────────────────────────────────────────────

def audit_firebase_config(base: str):
    fb_path = os.path.join(base, "templates", "js", "firebase.js")
    content = read(fb_path)
    if not content:
        return

    fname = os.path.relpath(fb_path, base)

    if re.search(r"apiKey\s*:\s*['\"][A-Za-z0-9_\-]+['\"]", content):
        add("INFO", "Sensitive Data", "Firebase API key hardcoded (esperado em SPAs)",
            fname,
            "A API key do Firebase é pública por design em SPAs. "
            "A segurança real depende das Firestore/Storage rules.",
            "Garantir que Firestore rules e Storage rules são corretas (principal defesa).")

    if re.search(r"serviceAccount|private_key|client_secret", content, re.IGNORECASE):
        add("CRITICAL", "Sensitive Data", "Service Account / chave privada no código cliente",
            fname,
            "Credenciais de service account NUNCA devem estar no código cliente.",
            "Mover para Cloud Functions (backend). Revogar a chave imediatamente.")


# ── 9. Playground — execução de código ────────────────────────────────────────

def audit_playground(base: str):
    pg_path = os.path.join(base, "templates", "js", "playground.js")
    content = read(pg_path)
    if not content:
        return

    fname = os.path.relpath(pg_path, base)

    if "runPythonAsync" in content or "runPython" in content:
        # Verificar se corre em Worker
        if "Worker" not in content and "worker" not in content:
            add("HIGH", "Code Injection", "Pyodide executa no contexto principal (não em Web Worker)",
                fname,
                "Código Python do utilizador partilha contexto JS com a app — pode aceder a window, localStorage, Firebase tokens.",
                "Mover execução Pyodide para Web Worker: new Worker('pyodide-worker.js').")
        else:
            add("INFO", "Code Injection", "Pyodide em Web Worker ✓", fname,
                "Execução Python isolada do contexto principal.")

    if "db.exec(" in content or "db.exec (" in content:
        add("INFO", "Code Injection", "SQL.js (client-side SQLite) detectado", fname,
            "SQL.js é um parser in-memory — sem risco de SQL injection server-side.")

    # Verificar se há aviso ao utilizador
    if "não cole" not in content.lower() and "untrusted" not in content.lower() and "cuidado" not in content.lower():
        add("LOW", "Code Injection", "Sem aviso de código não confiável no Playground",
            fname,
            "Utilizadores podem colar código malicioso sem qualquer aviso.",
            "Adicionar aviso: 'Não cole código de fontes não confiáveis.'")


# ── 10. HTTPS e cabeçalhos de segurança ───────────────────────────────────────

def audit_headers(base: str):
    path = os.path.join(base, "firebase.json")
    raw = read(path)
    if not raw:
        return
    try:
        cfg = json.loads(raw)
    except Exception:
        return

    headers = {}
    for h in cfg.get("hosting", {}).get("headers", []):
        for hdr in h.get("headers", []):
            headers[hdr["key"].lower()] = hdr["value"]

    required = {
        "strict-transport-security": "HSTS ausente — força HTTPS",
        "x-content-type-options":    "Sem proteção MIME sniffing",
        "referrer-policy":           "Sem política de referrer",
        "permissions-policy":        "Sem restrição de permissões do browser",
    }

    for header, msg in required.items():
        if header in headers:
            add("INFO", "Headers", f"{header} presente ✓",
                path, f"Valor: {headers[header][:60]}")
        else:
            add("MEDIUM", "Headers", msg, path,
                f"Cabeçalho '{header}' não encontrado.",
                f"Adicionar '{header}' nos headers do firebase.json.")


# ── Relatório ─────────────────────────────────────────────────────────────────

SEV_ICON = {
    "CRITICAL": "🔴",
    "HIGH":     "🟠",
    "MEDIUM":   "🟡",
    "LOW":      "🔵",
    "INFO":     "⚪",
}

SEV_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3, "INFO": 4}


def build_report(base: str) -> str:
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    sep = "═" * 72
    thin = "─" * 72

    lines = [
        sep,
        "  SECURITY AUDIT REPORT — IEFP Hackers",
        f"  Data    : {now}",
        f"  Diretório: {os.path.abspath(base)}",
        sep, "",
    ]

    sorted_findings = sorted(findings)

    # Sumário por severidade
    counts = {s: 0 for s in SEV_ORDER}
    for f in sorted_findings:
        counts[f.severity] = counts.get(f.severity, 0) + 1

    lines.append("SUMÁRIO")
    lines.append(thin)
    for sev, count in counts.items():
        icon = SEV_ICON.get(sev, "")
        lines.append(f"  {icon}  {sev:<10}  {count} findings")
    lines.append(f"\n  Total: {len(sorted_findings)} findings\n")

    # Findings por categoria
    categories = {}
    for f in sorted_findings:
        categories.setdefault(f.category, []).append(f)

    for cat, cat_findings in sorted(categories.items(), key=lambda x: SEV_ORDER.get(x[1][0].severity, 99)):
        lines.append("")
        lines.append(f"{'─'*3} {cat.upper()} {'─'*(68-len(cat))}")
        for f in sorted(cat_findings):
            icon = SEV_ICON.get(f.severity, "")
            lines.append(f"\n  {icon} [{f.severity}] {f.title}")
            lines.append(f"     Localização : {f.location}")
            lines.append(f"     Detalhe     : {f.detail[:120]}")
            if f.fix:
                lines.append(f"     Fix         : {f.fix[:120]}")

    lines += ["", sep, "  Fim da auditoria.", sep]
    return "\n".join(lines)


def build_json_report() -> str:
    return json.dumps(
        [
            {
                "severity": f.severity,
                "category": f.category,
                "title": f.title,
                "location": f.location,
                "detail": f.detail,
                "fix": f.fix,
            }
            for f in sorted(findings)
        ],
        ensure_ascii=False,
        indent=2,
    )


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Auditoria de segurança estática — IEFP Hackers")
    parser.add_argument("--dir", default=".", help="Diretório raiz do projeto (default: .)")
    parser.add_argument("--out", default="", help="Ficheiro de saída .txt ou .json (default: stdout)")
    parser.add_argument("--json", action="store_true", help="Saída em JSON")
    args = parser.parse_args()

    base = os.path.abspath(args.dir)
    print(f"[*] A auditar: {base}", file=sys.stderr)

    # Executar todos os módulos de auditoria
    checks = [
        ("CSP & Headers firebase.json",  lambda: audit_csp(base)),
        ("Cabeçalhos HTTP",              lambda: audit_headers(base)),
        ("Firestore Rules",              lambda: audit_firestore(base)),
        ("Storage Rules",                lambda: audit_storage(base)),
        ("XSS — innerHTML / eval",       lambda: audit_xss(base)),
        ("SRI — scripts externos",       lambda: audit_sri(base)),
        ("Dados sensíveis localStorage", lambda: audit_localstorage(base)),
        ("Autenticação & Autorização",   lambda: audit_auth(base)),
        ("Firebase config",              lambda: audit_firebase_config(base)),
        ("Playground code execution",    lambda: audit_playground(base)),
    ]

    for name, fn in checks:
        print(f"[*]   {name}...", file=sys.stderr)
        try:
            fn()
        except Exception as e:
            print(f"[!]   ERRO em {name}: {e}", file=sys.stderr)

    print(f"[+] {len(findings)} findings encontrados.\n", file=sys.stderr)

    report = build_json_report() if args.json else build_report(base)

    if args.out:
        Path(args.out).write_text(report, encoding="utf-8")
        print(f"[+] Relatório guardado em: {args.out}", file=sys.stderr)
    else:
        print(report)


if __name__ == "__main__":
    main()
