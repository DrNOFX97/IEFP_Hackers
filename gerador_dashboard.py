import json
import os
import glob
import base64
import io
import hashlib
import re as _re


def get_latest_file(pattern):
    files = glob.glob(pattern)
    return files[0] if files else None


def build_pg_examples():
    """Playground Python examples — basic Python + cybersecurity libs."""
    def ex(label, lines):
        return {'label': label, 'code': '\n'.join(lines)}

    return [
        # ── Python básico ─────────────────────────────────────────────────
        ex('👋 Olá Mundo', [
            '# ── Olá Mundo ─────────────────────────────────────────',
            'print("Olá, Mundo!")',
            'print("Python", 3.12, "a correr")',
            '',
            'nome = "Cibersegurança"',
            'print(f"Bem-vindo ao curso de {nome}!")',
        ]),
        ex('🧮 Calculadora', [
            '# ── Calculadora ────────────────────────────────────────',
            '# (input() não funciona no cloud; usa valores directos)',
            'a = 7.5',
            'b = 3.2',
            '',
            'print(f"a = {a}, b = {b}")',
            'print(f"Soma:      {a + b}")',
            'print(f"Diferença: {a - b}")',
            'print(f"Produto:   {a * b}")',
            'if b != 0:',
            '    print(f"Divisão:   {a / b:.4f}")',
        ]),
        ex('🔄 FizzBuzz', [
            '# ── FizzBuzz ────────────────────────────────────────────',
            'for i in range(1, 21):',
            '    if i % 15 == 0:   print("FizzBuzz")',
            '    elif i % 3 == 0:  print("Fizz")',
            '    elif i % 5 == 0:  print("Buzz")',
            '    else:             print(i)',
        ]),
        ex('🔢 Fibonacci', [
            '# ── Sequência de Fibonacci ─────────────────────────────',
            'def fibonacci(n):',
            '    a, b = 0, 1',
            '    for _ in range(n):',
            '        print(a, end=" ")',
            '        a, b = b, a + b',
            '    print()',
            '',
            'fibonacci(15)',
        ]),
        ex('📋 Listas & Dicts', [
            '# ── Listas e Dicionários ───────────────────────────────',
            'alunos = {"Ana": 18, "Rui": 16, "Sofia": 19}',
            '',
            'for nome, nota in alunos.items():',
            '    status = "Aprovado" if nota >= 10 else "Reprovado"',
            '    print(f"{nome}: {nota} — {status}")',
            '',
            'media = sum(alunos.values()) / len(alunos)',
            'print(f"Média: {media:.1f}")',
        ]),
        ex('🔁 Recursividade', [
            '# ── Factorial com Recursividade ────────────────────────',
            'def fatorial(n):',
            '    if n <= 1: return 1',
            '    return n * fatorial(n - 1)',
            '',
            'for i in range(1, 11):',
            '    print(f"{i}! = {fatorial(i)}")',
        ]),
        ex('🏗️ Classes (OOP)', [
            '# ── Classes e OOP ───────────────────────────────────────',
            'class Pessoa:',
            '    def __init__(self, nome, idade):',
            '        self.nome  = nome',
            '        self.idade = idade',
            '',
            '    def saudacao(self):',
            '        return f"Olá! Sou {self.nome}, {self.idade} anos."',
            '',
            '    def aniversario(self):',
            '        self.idade += 1',
            '        print(f"Feliz aniversário {self.nome}! Agora tens {self.idade}.")',
            '',
            'p = Pessoa("Alice", 25)',
            'print(p.saudacao())',
            'p.aniversario()',
        ]),

        # ── Criptografia & Hashing ─────────────────────────────────────
        ex('🔐 Caesar & ROT13', [
            '# ── Cifra de César / ROT13 ──────────────────────────────',
            '# ROT13 é César com chave=13 (simétrica: cifrar = decifrar)',
            '',
            'def caesar(texto, chave):',
            '    resultado = ""',
            '    for c in texto:',
            '        if c.isalpha():',
            '            base = ord("A") if c.isupper() else ord("a")',
            '            resultado += chr((ord(c) - base + chave) % 26 + base)',
            '        else:',
            '            resultado += c',
            '    return resultado',
            '',
            'msg = "Olá Ciberseguranca"',
            'enc = caesar(msg, 13)         # ROT13',
            'dec = caesar(enc, 13)         # ROT13 aplicado duas vezes = original',
            'print(f"Original:  {msg}")',
            'print(f"Cifrado:   {enc}")',
            'print(f"Decifrado: {dec}")',
            '',
            '# Testar várias chaves (força bruta)',
            'print("\\nForça bruta:")',
            'alvo = "Uryyb Jbeyq"',
            'for k in range(26):',
            '    tentativa = caesar(alvo, k)',
            '    if tentativa.lower().startswith("hello"):',
            '        print(f"  chave={k}: {tentativa}  ← encontrado!")',
        ]),
        ex('#️⃣ Hashing (MD5/SHA)', [
            '# ── Funções de Hash ─────────────────────────────────────',
            '# Hash: impressão digital de dados. Irreversível.',
            '# Qualquer alteração → hash completamente diferente.',
            '',
            'import hashlib',
            '',
            'textos = ["password", "password1", "Password", "P@ssw0rd"]',
            '',
            'print(f"{"Texto":<15}  {"MD5":<34}  SHA-256")',
            'print("-" * 90)',
            'for t in textos:',
            '    md5    = hashlib.md5(t.encode()).hexdigest()',
            '    sha256 = hashlib.sha256(t.encode()).hexdigest()',
            '    print(f"{t:<15}  {md5}  {sha256[:16]}...")',
            '',
            '# Demonstrar efeito avalanche',
            'print("\\nEfeito avalanche:")',
            'h1 = hashlib.sha256(b"abc").hexdigest()',
            'h2 = hashlib.sha256(b"abd").hexdigest()',
            'diff = sum(c1 != c2 for c1, c2 in zip(h1, h2))',
            'print(f"  sha256(abc): {h1[:20]}...")',
            'print(f"  sha256(abd): {h2[:20]}...")',
            'print(f"  Caracteres diferentes: {diff}/64 ({diff/64*100:.0f}%)")',
        ]),
        ex('🔑 Base64 & Encoding', [
            '# ── Base64 e Encodings ──────────────────────────────────',
            '# Base64 não é criptografia — é apenas encoding!',
            '# Usado em: JWTs, HTTP Basic Auth, MIME, certificados.',
            '',
            'import base64',
            '',
            '# Simular credenciais Base64 como em HTTP Basic Auth',
            'credenciais = "admin:password123"',
            'enc = base64.b64encode(credenciais.encode()).decode()',
            'print(f"Authorization: Basic {enc}")',
            '',
            '# Decodificar — qualquer um consegue!',
            'dec = base64.b64decode(enc).decode()',
            'print(f"Decodificado: {dec}")',
            '',
            '# JWT: estrutura header.payload.signature (base64url)',
            'import json',
            'header  = {"alg": "HS256", "typ": "JWT"}',
            'payload = {"sub": "user123", "role": "admin", "iat": 1705276800}',
            '',
            'def b64url(obj):',
            '    return base64.urlsafe_b64encode(',
            '        json.dumps(obj, separators=(",",":")).encode()',
            '    ).rstrip(b"=").decode()',
            '',
            'jwt_fake = f"{b64url(header)}.{b64url(payload)}.ASSINATURA_AQUI"',
            'print(f"\\nJWT (sem assinar):\\n  {jwt_fake}")',
            'print("\\n⚠️  Nunca confies no payload sem verificar a assinatura!")',
        ]),
        ex('🔒 AES-GCM (cryptography)', [
            '# ── Cifra Simétrica AES-GCM ─────────────────────────────',
            '# AES-GCM: autenticado + cifrado. O mais usado em TLS 1.3.',
            '# GCM garante: confidencialidade + integridade + autenticidade.',
            '',
            'import os',
            'from cryptography.hazmat.primitives.ciphers.aead import AESGCM',
            '',
            '# Gerar chave e nonce aleatórios',
            'chave = AESGCM.generate_key(bit_length=256)  # 32 bytes = AES-256',
            'nonce = os.urandom(12)                        # 96 bits é o ideal para GCM',
            '',
            'aesgcm = AESGCM(chave)',
            '',
            '# Cifrar mensagem com dados adicionais autenticados (AAD)',
            'mensagem = b"Segredo: credenciais do servidor de producao"',
            'aad      = b"contexto=producao"  # não cifrado, mas autenticado',
            '',
            'cifrado = aesgcm.encrypt(nonce, mensagem, aad)',
            '',
            'print(f"Chave (256-bit): {chave.hex()}")',
            'print(f"Nonce (96-bit):  {nonce.hex()}")',
            'print(f"Cifrado ({len(cifrado)}B):   {cifrado.hex()[:40]}...")',
            'print(f"  (+16B auth tag = GCM garante integridade)")',
            '',
            '# Decifrar — falha se o ciphertext ou AAD forem alterados',
            'decifrado = aesgcm.decrypt(nonce, cifrado, aad)',
            'print(f"\\nDecifrado: {decifrado.decode()}")',
            '',
            '# Demonstrar que alteração é detectada',
            'try:',
            '    cifrado_adulterado = bytes([cifrado[0] ^ 0xFF]) + cifrado[1:]',
            '    aesgcm.decrypt(nonce, cifrado_adulterado, aad)',
            'except Exception as e:',
            '    print(f"\\n✅ Adulteração detectada: {type(e).__name__}")',
        ]),

        # ── Análise de logs e dados ────────────────────────────────────
        ex('📊 Logs SSH — Brute Force', [
            '# ── Análise de auth.log ─────────────────────────────────',
            '# Detecta tentativas de brute force SSH.',
            '# Ficheiro disponível: auth.log',
            '',
            'import re',
            'from collections import Counter',
            '',
            'with open("auth.log") as f:',
            '    linhas = f.readlines()',
            '',
            '# Contar falhas por IP',
            'pat_fail = re.compile(r"Failed password.*from ([\\d.]+)")',
            'pat_ok   = re.compile(r"Accepted \\w+ for (\\w+) from ([\\d.]+)")',
            '',
            'falhas   = Counter()',
            'logins   = []',
            '',
            'for linha in linhas:',
            '    m = pat_fail.search(linha)',
            '    if m: falhas[m.group(1)] += 1',
            '    m = pat_ok.search(linha)',
            '    if m: logins.append((m.group(2), m.group(1)))',
            '',
            'print("=== Falhas de autenticação por IP ===")',
            'for ip, n in falhas.most_common():',
            '    flag = " ⚠️  BRUTE FORCE" if n >= 5 else ""',
            '    print(f"  {ip:<20}  {n:3d} falhas{flag}")',
            '',
            'print(f"\\n=== Logins bem-sucedidos ({len(logins)}) ===")',
            'for ip, user in logins:',
            '    print(f"  {ip:<20} → {user}")',
            '',
            '# Detectar IPs que falharam E depois conseguiram entrar',
            'print("\\n=== Brute force bem-sucedido? ===")',
            'ips_login = {ip for _, ip in logins}',
            'for ip in ips_login:',
            '    if ip in falhas:',
            '        print(f"  ⚠️  {ip} falhou {falhas[ip]}x e depois entrou!")',
        ]),
        ex('🔑 Hash Cracking (wordlist)', [
            '# ── Dictionary Attack ───────────────────────────────────',
            '# Tenta descobrir passwords a partir de hashes MD5/SHA1.',
            '# Ficheiros: hashes.txt  wordlist.txt',
            '',
            'import hashlib',
            '',
            '# Carregar wordlist',
            'with open("wordlist.txt") as f:',
            '    wordlist = [linha.strip() for linha in f if linha.strip()]',
            'print(f"Wordlist: {len(wordlist)} palavras")',
            '',
            '# Carregar hashes alvo (ignorar comentários)',
            'hashes_alvo = []',
            'with open("hashes.txt") as f:',
            '    for linha in f:',
            '        linha = linha.strip()',
            '        if linha and not linha.startswith("#"):',
            '            partes = linha.split(":")',
            '            hashes_alvo.append((partes[0], partes[1]))',
            '',
            '# Tentar crack',
            'print(f"\\nA tentar crack em {len(hashes_alvo)} hashes...\\n")',
            'for hash_val, algo in hashes_alvo:',
            '    encontrado = False',
            '    for palavra in wordlist:',
            '        if algo == "md5":',
            '            tentativa = hashlib.md5(palavra.encode()).hexdigest()',
            '        else:',
            '            tentativa = hashlib.sha1(palavra.encode()).hexdigest()',
            '        if tentativa == hash_val:',
            '            print(f"✅ {hash_val[:16]}...  → \'{palavra}\'")',
            '            encontrado = True',
            '            break',
            '    if not encontrado:',
            '        print(f"❌ {hash_val[:16]}...  → não encontrado")',
        ]),
        ex('📡 Análise de Tráfego', [
            '# ── Análise de network_events.json ─────────────────────',
            '# Detecta port scans e beaconing C2.',
            '# Ficheiro: network_events.json',
            '',
            'import json',
            'from collections import Counter, defaultdict',
            '',
            'with open("network_events.json") as f:',
            '    eventos = json.load(f)',
            '',
            'print(f"Total eventos: {len(eventos)}")',
            '',
            '# Top portas destino',
            'portas = Counter(e["dst_port"] for e in eventos)',
            'print("\\n=== Top Portas Destino ===")',
            'for porta, n in portas.most_common(5):',
            '    print(f"  {porta:5d}/tcp  {n}x")',
            '',
            '# Detectar port scan (mesmo IP, muitas portas)',
            'by_src = defaultdict(set)',
            'for e in eventos:',
            '    by_src[e["src_ip"]].add(e["dst_port"])',
            '',
            'print("\\n=== Possível Port Scan (>5 portas distintas) ===")',
            'for ip, portas_ip in by_src.items():',
            '    if len(portas_ip) > 5:',
            '        print(f"  {ip}  → {sorted(portas_ip)}")',
            '',
            '# Detectar beaconing C2 (>4 ligações mesmo destino)',
            'by_flow = defaultdict(list)',
            'for e in eventos:',
            '    by_flow[(e["src_ip"], e["dst_ip"], e["dst_port"])].append(e)',
            '',
            'print("\\n=== Possível Beaconing C2 (>4 conexões) ===")',
            'for (src, dst, porta), evts in by_flow.items():',
            '    if len(evts) > 4:',
            '        total_bytes = sum(e["bytes"] for e in evts)',
            '        print(f"  {src} → {dst}:{porta}")',
            '        print(f"    {len(evts)}x conexões, {total_bytes:,} bytes total")',
        ]),
        ex('🕵️ IoC Lookup', [
            '# ── Consulta de Indicadores de Compromisso ──────────────',
            '# Verifica se IPs/hashes estão numa blacklist.',
            '# Ficheiro: malware_iocs.csv',
            '',
            'import csv',
            'from collections import Counter',
            '',
            'iocs = []',
            'with open("malware_iocs.csv") as f:',
            '    for row in csv.DictReader(f):',
            '        iocs.append(row)',
            '',
            '# Distribuição por tipo e criticidade',
            'tipos       = Counter(i["type"] for i in iocs)',
            'criticidade = Counter(i["confidence"] for i in iocs)',
            '',
            'print("=== IoCs por tipo ===")',
            'for t, n in tipos.most_common():',
            '    print(f"  {t:<10}  {n}")',
            '',
            'print("\\n=== IoCs Críticos e de Alta Severidade ===")',
            'for ioc in iocs:',
            '    if ioc["confidence"] in ("CRITICAL", "HIGH"):',
            '        print(f"  [{ioc[\'confidence\']:<8}] {ioc[\'type\']:6s} {ioc[\'value\'][:40]:<40}  {ioc[\'threat\']}")',
            '',
            '# Lookup de IPs suspeitos',
            'print("\\n=== Lookup de IPs ===")',
            'ips_para_verificar = ["203.0.113.5", "10.0.0.1", "45.33.32.156"]',
            'ioc_ips = {i["value"]: i for i in iocs if i["type"] == "ip"}',
            'for ip in ips_para_verificar:',
            '    if ip in ioc_ips:',
            '        info = ioc_ips[ip]',
            '        print(f"  🚨 {ip}  → {info[\'threat\']} ({info[\'confidence\']})")',
            '    else:',
            '        print(f"  ✅ {ip}  → não encontrado na blacklist")',
        ]),
        ex('🔍 Nmap — Parse Output', [
            '# ── Parsear output do Nmap ──────────────────────────────',
            '# Extrai hosts, portas abertas e serviços.',
            '# Ficheiro: nmap_scan.txt',
            '',
            'import re',
            '',
            'with open("nmap_scan.txt") as f:',
            '    conteudo = f.read()',
            '',
            '# Encontrar todos os hosts',
            'hosts = re.findall(r"Nmap scan report for ([\\d.]+)", conteudo)',
            '',
            '# Encontrar portas abertas',
            'portas = re.findall(',
            '    r"(\\d+)/tcp\\s+open\\s+([\\w/]+)\\s+(.*)",',
            '    conteudo',
            ')',
            '',
            'print(f"Hosts descobertos: {len(hosts)}")',
            'for h in hosts:',
            '    print(f"  {h}")',
            '',
            'print(f"\\nPortas abertas ({len(portas)}):")',
            'for porta, servico, versao in portas:',
            '    versao_curta = versao.strip()[:40]',
            '    print(f"  {porta:>5}/tcp  {servico:<15}  {versao_curta}")',
            '',
            '# Alertas de segurança',
            'print("\\n=== Alertas de Segurança ===")',
            'if re.search(r"Jenkins", conteudo):',
            '    print("  ⚠️  Jenkins exposto (porta 8080) — CVE check recomendado")',
            'if re.search(r"backdoor", conteudo, re.IGNORECASE):',
            '    print("  🚨 Possível backdoor detectado pelo Nmap!")',
            'telnet = [p for p, s, _ in portas if "telnet" in s.lower() or p == "23"]',
            'if telnet:',
            '    print("  ⚠️  Telnet aberto — protocolo não cifrado!")',
        ]),
    ]


def main():
    print("A gerar o dashboard...")

    # 1. Load UCs
    uc_file = get_latest_file('data/ucs_*.json')
    uc_map = {}
    uc_list = []
    if uc_file:
        with open(uc_file, 'r', encoding='utf-8') as f:
            ucs_data = json.load(f)
            if 'unidades_formacao_curta_duracao' in ucs_data:
                uc_list = ucs_data['unidades_formacao_curta_duracao']
                uc_map = {
                    item['codigo']: {
                        'descricao':      item['descricao'],
                        'formador':       item.get('formador', ''),
                        'carga_horaria':  item.get('carga_horaria'),
                        'modalidade':     item.get('modalidade', ''),
                    }
                    for item in uc_list
                }
    else:
        print("Aviso: Ficheiro de UCs não encontrado.")

    # 2. Load Horários
    horarios = []
    for hf in sorted(glob.glob('data/horario_*.json')):
        try:
            with open(hf, 'r', encoding='utf-8') as f:
                h_data = json.load(f)
                if 'horario' in h_data:
                    horarios.append(h_data['horario'])
        except Exception as e:
            print(f"Erro ao ler {hf}: {e}")
    horarios.sort(key=lambda h: h['dias'][0]['data'] if h.get('dias') else '')

    # 3. Load Cronograma
    cronograma = {}
    crono_file = get_latest_file('data/cronograma_*.json')
    if crono_file:
        with open(crono_file, 'r', encoding='utf-8') as f:
            cronograma = json.load(f).get('cronograma', {})

    # 4. Assemble CSS and JS from source files
    tpl_dir = os.path.join(os.path.dirname(__file__), 'templates')

    css_files = [
        'css/variables.css',
        'css/layout.css',
        'css/components.css',
        'css/theme.css',
        'css/playground.css',
        'css/nav-sidebar.css',
        'css/views.css',
        'css/lab.css',
    ]
    js_files = [
        'js/data.js',
        'js/firebase.js',
        'js/utils.js',
        'js/state.js',
        'js/views.js',
        'js/horario.js',
        'js/disciplinas.js',
        'js/materials.js',
        'js/turma.js',
        'js/chat.js',
        'js/auth.js',
        'js/dashboard.js',
        'js/playground.js',
        'js/pdf.js',
        'js/convites.js',
        'js/definicoes.js',
        'js/lab.js',
        'js/cheatsheets.js',
        'js/links.js',
        'js/init.js',
    ]

    def read_parts(file_list):
        parts = []
        for rel in file_list:
            path = os.path.join(tpl_dir, rel)
            with open(path, 'r', encoding='utf-8') as f:
                parts.append(f.read())
        return '\n'.join(parts)

    css = read_parts(css_files)
    js  = read_parts(js_files)

    # 5. Read HTML skeleton and inject everything
    with open(os.path.join(tpl_dir, 'dashboard.html'), 'r', encoding='utf-8') as f:
        html = f.read()

    import time as _time
    build_ts = str(int(_time.time()))

    html = html.replace('__INJECT_CSS__', css)
    html = html.replace('__INJECT_JS__',  js)
    html = html.replace('__INJECT_BUILD_TS__', build_ts)

    # Inject data into JS constants (markers live in js/data.js)
    html = html.replace('__INJECT_UC_MAP__',      json.dumps(uc_map,              ensure_ascii=False))
    html = html.replace('__INJECT_UC_LIST__',     json.dumps(uc_list,             ensure_ascii=False))
    html = html.replace('__INJECT_HORARIOS__',    json.dumps(horarios,            ensure_ascii=False))
    html = html.replace('__INJECT_CRONOGRAMA__',  json.dumps(cronograma,          ensure_ascii=False))
    def _safe_json(obj):
        """JSON safe for embedding in <script> blocks — escapes </  to prevent premature tag close."""
        return json.dumps(obj, ensure_ascii=False).replace('</', '<\\/')
    html = html.replace('__INJECT_PG_EXAMPLES__', _safe_json(build_pg_examples()))

    # Cloud Run execution URL — env var overrides the hardcoded default
    _cloudrun_url = os.environ.get(
        'CLOUDRUN_URL',
        'https://cybersec-playground-6cqyexq2pq-ew.a.run.app'
    )
    html = html.replace('__INJECT_CLOUDRUN_URL__', json.dumps(_cloudrun_url if _cloudrun_url else None))

    # 6. Inject logo (resize to sidebar width, keep transparency)
    logo_b64 = ''
    logo_path = os.path.join(os.path.dirname(__file__), 'logo_02.png')
    if os.path.exists(logo_path):
        try:
            from PIL import Image
            img = Image.open(logo_path).convert('RGBA')
            bbox = img.getbbox()
            if bbox:
                img = img.crop(bbox)
            max_w = 192
            ratio = max_w / img.width
            img = img.resize((max_w, int(img.height * ratio)), Image.LANCZOS)
            buf = io.BytesIO()
            img.save(buf, 'PNG', optimize=True)
            logo_b64 = base64.b64encode(buf.getvalue()).decode()
        except ImportError:
            # PIL not available — embed original as-is
            with open(logo_path, 'rb') as f:
                logo_b64 = base64.b64encode(f.read()).decode()
    else:
        # logo_02.png está em .gitignore — tentar recuperar do dashboard.html existente
        existing_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dashboard.html')
        if os.path.exists(existing_path):
            with open(existing_path, 'r', encoding='utf-8') as _f:
                _existing = _f.read()
            _m = _re.search(r'data:image/png;base64,([A-Za-z0-9+/=]{100,})', _existing)
            if _m:
                logo_b64 = _m.group(1)
                print("Aviso: logo_02.png não encontrado — logo recuperado do dashboard.html anterior.")
            else:
                print("Aviso: logo_02.png não encontrado e dashboard.html anterior não tem logo. O logo ficará vazio.")
        else:
            print("Aviso: logo_02.png não encontrado. O logo ficará vazio.")
    html = html.replace('__INJECT_LOGO_B64__', logo_b64)

    # 7. Compute SHA-384 of inline script block → update CSP in firebase.json
    #    This removes 'unsafe-inline' from script-src and replaces with the exact hash,
    #    so only this specific bundle is allowed to execute inline.
    # Find the main inline <script> block (the one that starts with JS comments //)
    # NOT the last one, which may be inside PG_EXAMPLES string data.
    _m = _re.search(r'<script>\s*//', html)
    script_start = _m.start() if _m else html.rfind('<script>')
    script_end   = html.rfind('</script>')
    if script_start != -1 and script_end != -1:
        inline_js_content = html[script_start + len('<script>'):script_end]
        raw_hash  = hashlib.sha384(inline_js_content.encode('utf-8')).digest()
        b64_hash  = base64.b64encode(raw_hash).decode('ascii')
        new_token = f"'sha384-{b64_hash}'"

        fb_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'firebase.json')
        with open(fb_path, 'r', encoding='utf-8') as f_fb:
            fb_data = json.load(f_fb)

        def _patch_csp(csp_val):
            parts = csp_val.split(';')
            patched = []
            for part in parts:
                stripped = part.strip()
                if stripped.startswith('script-src'):
                    # Update sha384 hash; keep 'unsafe-inline' (required for onclick/oninput event handlers)
                    part = _re.sub(r"'sha384-[A-Za-z0-9+/=]+'", '', part)
                    # Ensure 'unsafe-inline' is present (needed for inline event handlers in HTML)
                    if "'unsafe-inline'" not in part:
                        part = _re.sub(r"('self')", r"\1 'unsafe-inline'", part)
                    # Insert new hash after 'self'
                    part = _re.sub(r"('self')", r"\1 " + new_token, part)
                    # Collapse multiple spaces
                    part = _re.sub(r' {2,}', ' ', part)
                patched.append(part)
            return ';'.join(patched)

        for hdr_block in fb_data.get('hosting', {}).get('headers', []):
            if hdr_block.get('source') == '**':
                for hdr in hdr_block.get('headers', []):
                    if hdr.get('key') == 'Content-Security-Policy':
                        hdr['value'] = _patch_csp(hdr['value'])

        with open(fb_path, 'w', encoding='utf-8') as f_fb:
            json.dump(fb_data, f_fb, indent=2, ensure_ascii=False)

    # 8. Write output
    with open('dashboard.html', 'w', encoding='utf-8') as f:
        f.write(html)

    # 8. Inject logo into admin.html (in-place)
    admin_path = os.path.join(os.path.dirname(__file__), 'admin.html')
    if os.path.exists(admin_path) and logo_b64:
        with open(admin_path, 'r', encoding='utf-8') as f:
            admin_html = f.read()
        if '__INJECT_LOGO_B64__' in admin_html:
            admin_html = admin_html.replace('__INJECT_LOGO_B64__', logo_b64)
            with open(admin_path, 'w', encoding='utf-8') as f:
                f.write(admin_html)
            print("Logo injetado em 'admin.html'.")

    print(f"Dashboard gerado em 'dashboard.html' com {len(horarios)} meses e {len(uc_list)} UCs!")
    print("Para ver o resultado, abre o 'dashboard.html' num navegador.")

    update_csp_hash('dashboard.html', 'firebase.json')


def update_csp_hash(html_path='dashboard.html', firebase_path='firebase.json'):
    if not os.path.exists(html_path) or not os.path.exists(firebase_path):
        return

    content = open(html_path, encoding='utf-8').read()

    # Encontrar scripts inline (sem atributo src)
    scripts = _re.findall(r'<script(?![^>]*\bsrc\b)[^>]*>(.*?)</script>', content, _re.DOTALL)
    if not scripts:
        print("Aviso: nenhum script inline encontrado em dashboard.html.")
        return

    # O dashboard tem um único script inline grande — usar o maior
    script_text = max(scripts, key=len)
    raw = script_text.encode('utf-8')
    digest = hashlib.sha384(raw).digest()
    new_hash = 'sha384-' + base64.b64encode(digest).decode()

    firebase_text = open(firebase_path, encoding='utf-8').read()
    updated = _re.sub(r'sha384-[A-Za-z0-9+/=]+', new_hash, firebase_text, count=1)

    if updated == firebase_text:
        print("CSP hash já está atualizado.")
        return

    open(firebase_path, 'w', encoding='utf-8').write(updated)
    print(f"CSP hash atualizado em firebase.json: {new_hash[:40]}...")


if __name__ == '__main__':
    main()
