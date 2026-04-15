# 🛡️ CET Cibersegurança Dashboard — IEFP Faro

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Firebase-Hosting%20|%20Auth%20|%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/FastAPI-Cloud%20Run-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <br>
  <em>Um portal centralizado de acompanhamento, estudo e produtividade desenvolvido especificamente para o CET em Cibersegurança.</em>
</div>

<br>

**URL de Produção:** [https://iefp-hackers.web.app](https://iefp-hackers.web.app)

---

## 📖 Visão Geral

Este projeto oferece um dashboard interativo para o Curso de Especialização Tecnológica (CET) em Cibersegurança do IEFP de Faro. O objetivo principal é agregar todos os horários mensais, programa didático das UCs, conteúdos partilhados pela turma, notas e apontamentos pessoais, juntamente com laboratórios de código executados diretamente no browser.

O core do frontend reside no script `gerador_dashboard.py` que lê os manifestos e dados estáticos num formato agnóstico e gera estaticamente os artefactos finais HTML (zero chamadas de rede externas no arranque do dashboard para carregar as UCs ou horários, funcionando quase instantaneamente!).

---

## 🏛️ Visão Geral da Arquitetura

O ecossistema divide-se em 3 pilares principais:

```mermaid
graph TD;
    subgraph Local Development
    G[gerador_dashboard.py] -->|Compila estaticamente estáticos| D[dashboard.html / admin.html]
    G -->|Lê dados| JSON[(data/*.json)]
    end
    
    subgraph Frontend Ecosystem
    D -->|Deploy via Firebase CLI| H[Firebase Hosting]
    H -->|Autenticação JWT| FA[Firebase Auth]
    H -->|Dados de Utilizador| FS[Firestore]
    H -->|Uploads de Turma| ST[Firebase Storage]
    end

    subgraph Backend API GCP
    H -->|Bearer Tokens (API requests)| CR[Cloud Run REST API]
    CR -->|Queries Seguras| CSQL[(Cloud SQL - PostgreSQL)]
    end
    
    classDef comp fill:#2d3436,stroke:#74b9ff,stroke-width:2px,color:#fff;
    class G,D,JSON,H,FA,FS,ST,CR,CSQL comp;
```

---

## 🚀 Funcionalidades

### 📅 Gestão de Horários e Disciplinas
- **Horário:** Vista mensal e semanal, cartões dinâmicos fundidos (slots de 1h unidos automaticamente), e badges explícitos para FPCT/UCs remotas. Exportação direta para listagem e vista semanal em formato `.pdf` utilizando `jsPDF`.
- **Disciplinas (26 UCs):** Catálogo integral das UCs, organizados numa grelha pesquisável que revela formadores e carga horária.
- **Área da UC:** Agrega materiais partilhados em aulas (documentos PDFs, links de YouTube/Video, ZIPs), comentários de turma e apontamentos pessoais confidenciais (com *auto-save* integrado da *session* e sincronização para Firestore).

### 💻 Playground Integrado (Locais Seguros no Browser)
Ambientes "sandbox" criados dinamicamente com suporte `tabbed` usando CodeMirror 5 (tema Dracula):
- **Python (Pyodide):** Interpretador CPython portado em WASM, com `micropip` ativado e formatação por norma nativa (*autopep8*). Inputs do tipo de linha integrada com suporte múltiplo de ficheiros (ex: `main.py` + `utils.py`). Inclui dezenas de exemplos embutidos para estudo de algoritmia.
- **SQL (SQLite):** Construído sobre `sql-asm.js` da JS Delivr, garantindo funcionamento ininterrupto independentemente de *flags* do Safari em *desktop*. Dispõe da versão funcional da linguagem para exercitação contínua, com pré-população de *DML/DDLs*.

### 🔒 Painel de Administração e Auditoria
- Acesso à aba restrita `/admin.html` mediante *Claims* customizadas na conta, provisionadas e geridas pelo script `seed_admin.py`.
- Permite validações de atividade da plataforma em tempo curado. Log de auditoria integral.

---

## 🛠Estrutura e Scripts Locais

```bash
CyberSec/
├── gerador_dashboard.py      # Core de CI estática (script Python que compila as SPAs HTML)
├── seed_admin.py             # CLI de setup/bootstrap de utilizadores para roles (ex: formador)
├── dashboard.html            # ⚠️ Output Auto-gerado - NÃO EDITAR MANUALMENTE
├── admin.html                # ⚠️ Output Auto-gerado do Backoffice
├── firebase.json             # Regras rígidas de CSP, cache headers e infraestrutura CDN
├── firestore.rules           # Scopes lógicos de db access
├── storage.rules             # Limites de upload por utilizador
│
├── data/                     # Source of Truth base estruturado
│   ├── ucs_ciberseguranca.json 
│   ├── horario_abril_2026.json 
│   └── cronograma_cet_ciberseguranca_2.json 
│
└── api/                      # Backend FastAPI + AsyncPG
```

---

## 🔧 Como Gerar, Testar e Fazer Deploy

### Pré-Requisitos e Setup Local
1. Recomenda-se instalação do **Python 3.9+** no seu ambiente.
2. É obrigatória a submissão de componentes através do Firebase Tools CLI.
```bash
npm install -g firebase-tools
firebase login
```

### Flow Operacional (Build + Deploy)
Sempre que o `horário` novo for expedido, ou quando alterar os *JSON* base, execute o comando raiz:
```bash
# Compilar views de forma rigorosa
python3 gerador_dashboard.py

# Efetuar validação com um runtime leve ou upload para firebase
firebase deploy --only hosting --project ligafaro-8000
```
Para conceder permissão de Administrador no painel `/admin.html` via Cloud Auth de Firestore a alguém da moderação:
```bash
python3 seed_admin.py --email nuno.exemplo@gmail.com --role formador
```

---

## 🔐 Segurança

Esta ferramenta obedece a regras restritas de CSP e proteção de injeção concebidas a rigor:

1. **Autenticação Firebase via Google OAuth** e acesso condicionado sem fallback de POP-UP.
2. **CSP (Content-Security-Policy):** O ambiente tem restrições estritas a execução arbitrária (`style-src`, `connect-src` e origens exclusivas como WebAssembly para o `Pyodide`). A execução da infraestrutura só extraí scripts permitidos do `unpkg`, `cdnjs` e `jsdelivr`. Sem execuções iframed (*Frame Ancestors DENY*).
3. **Database RLS + Storage Types:** Firestore previne fugas de apontamentos através dum sistema de _Resource Rules_ enjaulado apenas ao UID real da query atual gerada. Firebase Storage restringe os uploads a limites de quota (4 MB) e MIME types conhecidos (`pdf`, `png`, `jpg`, `doc`, `zip`).
4. **Backend FastAPI Security Rate Limiter:** Cloud Run utiliza tokens JWT na assinatura dos cabeçalhos. Os parâmetros contra o PostgreSQL são formatados via `asyncpg`, impossibilitando injeção. 

---

## 📝 Notas de Desenvolvimento Adicionais

- **Nunca edite os ficheiros `dashboard.html` ou `admin.html` manualmente**. Em todos os desdobramentos, deve ser atualizado o esqueleto embutido no contexto formatado dentro do script Python originador (`gerador_dashboard.py`).
- Devido à interpolação de varíaveis globais da framework `.format()` no contexto Python em cima dos esqueletos de JavaScript nativo, qualquer uso de chaves ` { ` exclusivas ao CSS / ECMAScript no script master precisaram de ser unidas duas vezes em string escape: ` {{  }} `.
- O módulo Playground migrável das sessões de **SQL** não tem requisição extra, operando via `sql-asm.js` pelo *jsdelivr*. O script pesa aproximadamente 1 MB, no entanto, é gerida uma resposta *promise* integral até 15s antes de erro. Outros bundles usam *CodeMirror v5.65*.
- A configuração da API remota requer a documentação referida no `Dockerfile` com chaves de Base de Dados encriptadas enviadas via `gcloud secrets`.

---
*Financiamento e Acreditação Institucional: Algarve 2030 · Portugal 2030 · União Europeia*
*Projeto integrado com licença restritiva da turma de Formação em contexto modular de Faro.*
