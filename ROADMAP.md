# Roadmap — Performance & Segurança (dashboard.html)

Baseado na análise do relatório `web-check` e do Lighthouse (score atual: 68).
Ficheiro local de tracking — não é feito deploy (`*.md` está no `.gitignore` de hosting).

## ✅ Concluído

- [x] `X-XSS-Protection: 0` no `firebase.json` (commit `4a88398`)
- [x] Meta tags OpenGraph + Twitter Card em `dashboard.html` (commit `19ff2a9`)
- [x] `security.txt` assinado com PGP (RFC 9116) + chave publicada em `.well-known/pgp-key.txt` (commit `fb55f90`)
- [x] **Fase 1 completa** (commit `9178ffd`): `defer` nos 12 `<script>`, `preconnect` (cdnjs/gstatic/jsdelivr/fonts), `dashboard.css` minificado (131 KB → 83 KB), logo extraído de base64 duplicado 4x (~72 KB) para `logo-cet.png` (13.7 KB, cacheável). Validado visualmente (Playwright): auth gate renderiza e estiliza corretamente, sem erros novos.

## 🔴 Fase 1 — Quick wins de performance ✅ CONCLUÍDA

## 🟡 Fase 2 — Redução de JS não utilizado (esforço médio)

- [ ] Lazy-load `jspdf` + `jspdf-autotable` só quando o utilizador exporta PDF
- [ ] Lazy-load `qrcodejs` só quando necessário (ex: painel admin/perfil)
- [ ] Avaliar se `marked` + `KaTeX` podem ser adiados até ao primeiro conteúdo markdown renderizado

## 🟢 Fase 3 — Infraestrutura / opcional (não bloqueante)

- [ ] Avaliar WAF externo (Cloudflare proxy) — atualmente sem WAF dedicado, mitigado parcialmente pela borda Google/Fastly
- [ ] Renovar assinatura PGP do `security.txt` antes de **2027-09-25** (validade da chave) e do **2027-09-24** (campo `Expires`)
- [ ] DNSSEC — fora de controlo (domínio `*.web.app` gerido pela Google)
- [ ] OCSP stapling — fora de controlo (terminação TLS gerida pela Google/Fastly)

## 🐛 Bugs pré-existentes — ✅ CORRIGIDOS (commit `11f5101`)

- `cybermap-inline.js`: `animate(0)` fabricava um timestamp `t=0` na 1ª frame, muito menor que os `born` reais dos arcos já criados no init → `life`/`headT` negativos → `CatmullRomCurve3.getPoint()` indexava o array de pontos com índice negativo → `undefined` → crash em loop (`distanceToSquared`, dezenas de erros/seg). Fix: clamp de `headT` a `[0,1]` + `requestAnimationFrame(animate)` em vez de `animate(0)`.
- `CyberMap.html`: `logo_02.png` nunca existiu no repo (404 desde sempre) → aponta agora para `logo-cet.png`.
- Validado no browser: 0 erros de consola após 5s de animação (antes: dezenas/seg).

## Notas

- Score de performance sobe e desce entre scans (58 → 74 → 68) — normal, reflete throttling simulado de rede/CPU; o objetivo é tendência ascendente, não um número fixo.
- Chave privada PGP + frase-passe em `C:\Users\Fernando Nuno\pgp-backup\iefp-hackers-security-txt\` — mover para gestor de passwords quando possível.
