# Dashboard CET Cibersegurança — IEFP Faro

Dashboard interactivo para o Curso de Especialização Tecnológica (CET) em Cibersegurança do IEFP de Faro. Agrega horários, programa, materiais didácticos, apontamentos pessoais e um playground de código directamente no browser.

**URL de produção:** https://iefp-hackers.web.app

---

## Visão geral da arquitectura

```
┌─────────────────────────────────────────────────────────┐
│  gerador_dashboard.py   (Python, corre localmente)      │
│  Lê data/*.json  →  gera dashboard.html (self-contained) │
└─────────────────────────┬───────────────────────────────┘
                          │ firebase deploy
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Firebase Hosting  (iefp-hackers.web.app)               │
│  Serve dashboard.html  +  CSP headers                   │
└────────┬────────────────────────────────────────────────┘
         │ autenticação JWT (Firebase Auth)
         ▼
┌─────────────────────────────────────────────────────────┐
│  Firebase Auth  (Google OAuth)                          │
│  Firestore  (apontamentos por utilizador)               │
│  Firebase Storage  (ficheiros de apoio ≤ 4 MB)         │
└────────┬────────────────────────────────────────────────┘
         │ Bearer token
         ▼
┌─────────────────────────────────────────────────────────┐
│  API REST  (Cloud Run, europe-west1)                    │
│  FastAPI + asyncpg  →  Cloud SQL (PostgreSQL)           │
│  Rate limiting · RLS · queries parametrizadas           │
└─────────────────────────────────────────────────────────┘
```

O `dashboard.html` é completamente **auto-contido**: todos os dados (UCs, horários, cronograma) são embutidos como constantes JavaScript no momento da geração. Não há chamadas de rede para dados estáticos — a página funciona offline após o primeiro carregamento.

---

## Estrutura do projecto

```
CyberSec/
├── gerador_dashboard.py      # Gerador principal (único script a correr localmente)
├── dashboard.html            # Output gerado — NÃO editar à mão
├── firebase.json             # Configuração de Hosting (CSP, rewrites, headers)
├── firestore.rules           # Regras de segurança do Firestore
├── storage.rules             # Regras de segurança do Storage
├── .firebaserc               # Projecto Firebase (ligafaro-8000)
│
├── data/                     # Ficheiros de dados (fonte de verdade)
│   ├── ucs_ciberseguranca.json          # Catálogo de UCs (26 UCs)
│   ├── horario_abril_2026.json          # Horário mensal
│   └── cronograma_cet_ciberseguranca_2.json  # Cronograma geral do curso
│
├── docs/                     # Documentos de referência (PDFs, imagens)
│   ├── IEFP - TECibersegurança.pdf
│   ├── Cronograma.jpeg
│   └── ...
│
└── api/                      # Backend REST (deploy em Cloud Run)
    ├── main.py               # FastAPI app — todos os endpoints
    ├── auth.py               # Verificação de JWT Firebase
    ├── requirements.txt
    └── Dockerfile
```

---

## Como gerar e publicar

### Pré-requisitos

```bash
# Python 3.9+
pip install firebase-tools  # ou npm install -g firebase-tools
firebase login
```

### Gerar o dashboard

```bash
python3 gerador_dashboard.py
```

Abre `dashboard.html` no browser para pré-visualizar localmente.

### Publicar

```bash
python3 gerador_dashboard.py && firebase deploy --only hosting --project ligafaro-8000
```

### Adicionar um novo mês de horário

1. Criar `data/horario_<mes>_<ano>.json` seguindo o schema abaixo
2. Correr `python3 gerador_dashboard.py`
3. O novo mês aparece automaticamente no dropdown

---

## Schema dos ficheiros de dados

### `data/ucs_*.json`

```json
{
  "unidades_formacao_curta_duracao": [
    {
      "codigo": "UC01483",
      "descricao": "Descrição completa da UC",
      "formador": "Nome do Formador",
      "carga_horaria": 50
    }
  ]
}
```

| Campo | Tipo | Descrição |
|---|---|---|
| `codigo` | string | Código SIGO (ex: `UC01483`) ou `FPCT` |
| `descricao` | string | Nome completo mostrado no dashboard |
| `formador` | string | Nome do formador (vazio se não atribuído) |
| `carga_horaria` | int | Total de horas da UC |

### `data/horario_*.json`

```json
{
  "horario": {
    "mes_ano": "abril 2026",
    "dias": [
      {
        "data": "2026-04-09",
        "dia_semana": "quinta",
        "aulas": [
          { "hora": "09:00-10:00", "uc": "UC01483" },
          { "hora": "10:00-11:00", "uc": "UC01483" }
        ],
        "nota": "Feriado (opcional)"
      }
    ]
  }
}
```

- Slots consecutivos da mesma UC são fundidos automaticamente num card único
- `UC00602` recebe automaticamente o badge "Remoto"
- Campo `nota` é opcional — usado para feriados ou avisos

### `data/cronograma_*.json`

```json
{
  "cronograma": {
    "local": "Areal Gordo - Faro",
    "sala": "6.18",
    "data_inicio": "2026-04-09",
    "data_fim": "2027-04-06",
    "carga_horaria": {
      "base": 600,
      "tecnologica": 700,
      "fct": 210,
      "total": 1526
    },
    "resumo_mensal": [
      { "mes": "abril 2026", "dias": 17, "horas": 136 }
    ]
  }
}
```

---

## Funcionalidades do dashboard

### Horário
- Visualização mensal com cards por dia
- Slots de 1h fundidos automaticamente quando a mesma UC ocupa horas consecutivas
- Badge "Remoto" para UC00602
- Exportação PDF (jsPDF) e vista semanal

### Disciplinas
- Grelha de todas as 26 UCs com formador e carga horária
- Página de detalhe por UC com:
  - Materiais didácticos (links, PDFs, vídeos — via API)
  - Apontamentos pessoais (guardados no Firestore por utilizador)
  - Upload de ficheiros para Firebase Storage (≤ 4 MB)

### Playground
- **Python** — Pyodide v0.26.4 (CPython compilado para WASM)
  - Editor CodeMirror 5 com syntax highlighting (tema Dracula)
  - `input()` inline no output (sem `prompt()` do browser)
  - Multi-ficheiro por sessão (main.py + utils.py + ...)
  - Exemplos comentados linha-a-linha (Olá Mundo, Calculadora, Fibonacci, Caesar, Classes, etc.)
  - Auto-formatação com `autopep8` ao correr
  - Ctrl+Enter para correr
- **SQL** — sql.js (SQLite compilado para WASM)
  - Editor CodeMirror 5 com SQL syntax highlighting
  - BD em memória por sessão
  - Exemplo pré-carregado (CREATE TABLE, INSERT, SELECT, UPDATE, DELETE)
  - Resultados em tabela formatada
  - Ctrl+Enter para correr

### Cronograma
- Sidebar com metadata do curso (local, sala, datas, carga horária)
- Resumo mensal (dias e horas por mês)

---

## API REST (Cloud Run)

**Base URL:** `https://ciberseg-api-315653817267.europe-west1.run.app`

Todos os endpoints requerem `Authorization: Bearer <firebase_id_token>`.

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/health` | Health check (público) |
| `GET` | `/notes/{uc_code}` | Ler apontamento do utilizador para uma UC |
| `POST` | `/notes/{uc_code}` | Guardar apontamento (upsert; DELETE se vazio) |
| `GET` | `/materials/{uc_code}` | Listar materiais de uma UC |
| `POST` | `/materials/{uc_code}` | Adicionar material |
| `DELETE` | `/materials/{uc_code}/{material_id}` | Apagar material (autor ou formador/admin) |
| `GET` | `/admin/audit` | Log de auditoria (formador/admin) |

### Boas práticas de segurança implementadas
- **JWT verificado** em cada pedido via Firebase Admin SDK (`check_revoked=True`)
- **Queries parametrizadas** com `asyncpg` — zero interpolação de strings com input do utilizador
- **RLS no PostgreSQL** via `SET LOCAL app.current_user_id` antes de cada query
- **Validação de input** com Pydantic (tipos, tamanhos, URLs, enumerações)
- **Rate limiting** por IP com `slowapi` (60/min leitura, 30/min escrita, 10/min admin)
- **CORS** restrito a `https://iefp-hackers.web.app` e `http://localhost:8000`
- **Docs desactivados** em produção (`ENV=production`)

---

## Segurança do frontend

### Content Security Policy

O `firebase.json` define headers CSP restritivos para todas as respostas:

```
default-src 'self'
script-src  'self' 'unsafe-inline' 'wasm-unsafe-eval'
            https://cdnjs.cloudflare.com https://cdn.jsdelivr.net
            https://www.gstatic.com https://apis.google.com
style-src   'self' 'unsafe-inline' https://fonts.googleapis.com
            https://fonts.gstatic.com https://cdnjs.cloudflare.com
connect-src 'self' https://*.googleapis.com https://*.firebaseio.com
            wss://*.firebaseio.com https://cdn.jsdelivr.net
            https://pypi.org https://files.pythonhosted.org
            [+ Cloud Run API URL]
frame-src   https://ligafaro-8000.firebaseapp.com blob:
worker-src  blob: 'self'
frame-ancestors 'none'
```

- `'wasm-unsafe-eval'` — necessário para Pyodide (WebAssembly)
- `https://pypi.org` + `https://files.pythonhosted.org` — necessário para `micropip` instalar `autopep8`
- `X-Frame-Options: DENY` em todas as respostas
- `Strict-Transport-Security` com preload (2 anos)

### Firestore Rules
- Apontamentos: cada utilizador só lê/escreve documentos com o seu próprio `uid`
- Materiais: qualquer utilizador autenticado pode ler e escrever

### Storage Rules
- Leitura: qualquer utilizador autenticado
- Escrita: autenticado, ficheiro ≤ 4 MB, tipos permitidos: PDF, Word, texto, imagem, ZIP

---

## Autenticação

Login via **Google OAuth** (Firebase Auth). O fluxo usa `signInWithRedirect` com fallback automático para o caso de popup bloqueado pelo browser. Após login, o token Firebase é:
- Guardado automaticamente pelo SDK (persistência `LOCAL`)
- Enviado como `Bearer token` em cada chamada à API REST
- Verificado e validado no servidor com `firebase-admin`

Domínio autorizado: `iefp-hackers.web.app` (configurar em Firebase Console → Authentication → Authorized Domains).

---

## Deploy da API

```bash
# A partir do directório api/
gcloud run deploy ciberseg-api \
  --source . \
  --region europe-west1 \
  --project ligafaro-8000 \
  --set-env-vars DB_HOST=...,DB_NAME=ciberseg,DB_USER=app_api,DB_PASS=...
```

Variáveis de ambiente necessárias:

| Variável | Descrição |
|---|---|
| `DB_HOST` | Host do Cloud SQL (via Cloud SQL Proxy ou IP) |
| `DB_PORT` | Porta PostgreSQL (default: `5432`) |
| `DB_NAME` | Nome da base de dados (default: `ciberseg`) |
| `DB_USER` | Utilizador PostgreSQL |
| `DB_PASS` | Password PostgreSQL |
| `ALLOWED_ORIGINS` | Lista de origens separada por vírgulas |
| `ENV` | `production` para desactivar `/docs` |

---

## Curso

**Técnico/a Especialista em Cibersegurança**
- **Modalidade:** Curso de Especialização Tecnológica (CET)
- **Instituição:** Centro de Emprego e Formação Profissional de Faro
- **Local:** Areal Gordo — Faro, Sala 6.18
- **Horário:** 09h às 17h
- **Início:** 9 de abril de 2026
- **Fim:** 6 de abril de 2027
- **Responsável de Ação:** Célia Palma
- **Técnica de Serviço Social:** Cristina Soares
- **Carga horária total:** 1526 horas
  - Base: 175h · Tecnológica: 850h · FCT: 504h
- **UCs:** 26 unidades (incluindo FPCT — Formação em Contexto de Trabalho)
- **Financiamento:** Algarve 2030 · Portugal 2030 · União Europeia

---

## Notas de desenvolvimento

- **Nunca editar `dashboard.html` directamente** — é gerado pelo script e sobrescrito a cada deploy
- **Escaped em f-strings Python:** `{{` → `{`, `}}` → `}` no JS; `\\n` → `\n` (literal `\n` geraria newline no output quebrando strings JS)
- **Pyodide** carrega ~10 MB na primeira visita (cached pelo browser depois)
- **sql.js** carrega ~1.5 MB na primeira sessão SQL
- **CodeMirror 5** carrega ~150 KB da cdnjs na primeira sessão de código
- O gerador adiciona `node --check` implicitamente — verificar sempre se o JS gerado é válido antes do deploy
