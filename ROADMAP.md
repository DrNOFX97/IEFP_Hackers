# Roadmap — Performance & Segurança (dashboard.html)

Baseado na análise do relatório `web-check` e do Lighthouse (score atual: 68).
Ficheiro local de tracking — não é feito deploy (`*.md` está no `.gitignore` de hosting).

## ✅ Concluído

- [x] `X-XSS-Protection: 0` no `firebase.json` (commit `4a88398`)
- [x] Meta tags OpenGraph + Twitter Card em `dashboard.html` (commit `19ff2a9`)
- [x] `security.txt` assinado com PGP (RFC 9116) + chave publicada em `.well-known/pgp-key.txt` (commit `fb55f90`)
- [x] **Fase 1 completa** (commit `9178ffd`): `defer` nos 12 `<script>`, `preconnect` (cdnjs/gstatic/jsdelivr/fonts), `dashboard.css` minificado (131 KB → 83 KB), logo extraído de base64 duplicado 4x (~72 KB) para `logo-cet.png` (13.7 KB, cacheável). Validado visualmente (Playwright): auth gate renderiza e estiliza corretamente, sem erros novos.

## 🔴 Fase 1 — Quick wins de performance ✅ CONCLUÍDA

## 🟡 Fase 2 — Redução de JS não utilizado ✅ CONCLUÍDA (commit `0b79440`)

- [x] Lazy-load `jspdf` + `jspdf-autotable` só quando o utilizador exporta PDF (`ensurePdfLibs()`, 3 call sites: UC/lista/semanal)
- [x] Lazy-load `qrcodejs` só quando necessário (`ensureQrLib()`, `toggleQR`)
- [x] Avaliado `marked`/`KaTeX`: mantidos como `defer` normal (não lazy on-demand) — são usados no fluxo principal de conteúdo (cheatsheets), já não bloqueiam o render (Fase 1), e adicionar lazy-load aqui só complicaria o caminho mais comum sem ganho relevante.

Validado no browser (Playwright): `window.jspdf`/`window.QRCode` ficam `undefined` no load inicial e carregam sob demanda sem erros novos.

## 🔵 Fase 4 — Push para 90+ no Lighthouse ✅ CONCLUÍDA (commit `cd9908d`)

Performance real após Fase 1+2: **58 → 68 → 84**. Para tentar passar os 90:
- [x] Minificar `dashboard-inline.js` (377 KB → 244 KB, -35%), `admin-inline.js` (32 KB → 21 KB, -34%) e `cybermap-inline.js` (41 KB → 27 KB, -34%) com `terser -c -m` — reduz tempo de parse/compile de JS no cliente (o que mais pesa no score sob CPU throttling do Lighthouse)
- [ ] Re-medir o Lighthouse para confirmar se chegou aos 90 — pendente (depende do próximo scan do utilizador)
- Se não chegar aos 90: próximos candidatos seriam otimizar imagens (nenhuma grande atualmente) e auditar CSS não usado por página com coverage do DevTools, mas sem dados reais de um novo scan não vale a pena adivinhar

## 🟢 Fase 3 — Infraestrutura / opcional ✅ FECHADA (sem ação)

- [x] **WAF externo — decisão: não avançar.** Investigado: nenhum site do projeto (`iefp-hackers`, `flepo`, `gestor-eventos`, `ligafaro-8000`, `sebenta-ai`) tem domínio próprio — todos em `*.web.app`, DNS gerido pela Google, sem zona delegável. Um WAF (Cloudflare) exigiria comprar um domínio próprio + reconfigurar DNS + custom domain no Firebase Hosting. Decisão: site de formação sem dados sensíveis de produção, a proteção de borda Google/Fastly já é suficiente. Retomar se o site ganhar domínio próprio no futuro.
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
