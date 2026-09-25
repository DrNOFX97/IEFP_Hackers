# Roadmap — Performance & Segurança (dashboard.html)

Baseado na análise do relatório `web-check` e do Lighthouse (score atual: 68).
Ficheiro local de tracking — não é feito deploy (`*.md` está no `.gitignore` de hosting).

## ✅ Concluído

- [x] `X-XSS-Protection: 0` no `firebase.json` (commit `4a88398`)
- [x] Meta tags OpenGraph + Twitter Card em `dashboard.html` (commit `19ff2a9`)
- [x] `security.txt` assinado com PGP (RFC 9116) + chave publicada em `.well-known/pgp-key.txt` (commit `fb55f90`)

## 🔴 Fase 1 — Quick wins de performance (baixo esforço, alto impacto)

- [ ] Adicionar `defer` aos 11 `<script src>` no `<head>` de `dashboard.html` (linhas 21-31)
- [ ] Adicionar `<link rel="preconnect">` para `cdnjs.cloudflare.com`, `www.gstatic.com`, `cdn.jsdelivr.net`, `fonts.googleapis.com`
- [ ] Minificar `dashboard.css` (131 KB → esperado ~80-90 KB)
- [ ] Extrair o logo base64 (~36 KB) de `dashboard.html` para `logo.png` + `<img src="logo.png">`

**Critério de sucesso:** re-correr Lighthouse, confirmar subida de score e validar visualmente que nada quebrou (auth gate, KaTeX, exportação PDF).

## 🟡 Fase 2 — Redução de JS não utilizado (esforço médio)

- [ ] Lazy-load `jspdf` + `jspdf-autotable` só quando o utilizador exporta PDF
- [ ] Lazy-load `qrcodejs` só quando necessário (ex: painel admin/perfil)
- [ ] Avaliar se `marked` + `KaTeX` podem ser adiados até ao primeiro conteúdo markdown renderizado

## 🟢 Fase 3 — Infraestrutura / opcional (não bloqueante)

- [ ] Avaliar WAF externo (Cloudflare proxy) — atualmente sem WAF dedicado, mitigado parcialmente pela borda Google/Fastly
- [ ] Renovar assinatura PGP do `security.txt` antes de **2027-09-25** (validade da chave) e do **2027-09-24** (campo `Expires`)
- [ ] DNSSEC — fora de controlo (domínio `*.web.app` gerido pela Google)
- [ ] OCSP stapling — fora de controlo (terminação TLS gerida pela Google/Fastly)

## Notas

- Score de performance sobe e desce entre scans (58 → 74 → 68) — normal, reflete throttling simulado de rede/CPU; o objetivo é tendência ascendente, não um número fixo.
- Chave privada PGP + frase-passe em `C:\Users\Fernando Nuno\pgp-backup\iefp-hackers-security-txt\` — mover para gestor de passwords quando possível.
