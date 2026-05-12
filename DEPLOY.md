# DEPLOY.md — Git Push & Firebase Deploy

## 1. Gerar o dashboard antes de qualquer deploy

```bash
python gerador_dashboard.py
```

> `dashboard.html` e `admin.html` são ficheiros gerados — só fazer deploy após correr o gerador.

---

## 2. Git Push

```bash
# Ver o estado atual
git status

# Adicionar todas as alterações
git add .

# Commit com mensagem descritiva
git commit -m "descrição da alteração"

# Push para o repositório remoto
git push
```

### Push pela primeira vez (novo branch)

```bash
git push -u origin main
```

---

## 3. Firebase Deploy

Carregar as credenciais do `.env` antes de fazer deploy:

```powershell
Get-Content .env | ForEach-Object { $k,$v = $_ -split '=',2; [System.Environment]::SetEnvironmentVariable($k,$v) }
```

### Hosting apenas (mais comum)

```powershell
firebase deploy --only hosting --project ligafaro-8000
```

### Cloud Functions apenas

```powershell
firebase deploy --only functions --project ligafaro-8000
```

### Regras Firestore e Storage

```powershell
firebase deploy --only firestore,storage --project ligafaro-8000
```

### Deploy completo (hosting + functions + regras)

```powershell
firebase deploy --project ligafaro-8000
```

---

## 4. Fluxo completo típico

```powershell
python gerador_dashboard.py
git add .
git commit -m "descrição"
git push
Get-Content .env | ForEach-Object { $k,$v = $_ -split '=',2; [System.Environment]::SetEnvironmentVariable($k,$v) }
firebase deploy --only hosting --project ligafaro-8000
```

---

## 5. gcloud CLI

### Verificar estado

```powershell
gcloud config list
gcloud auth list
```

### Login (se sessão expirar)

```powershell
gcloud auth login --project ligafaro-8000
```

### Application Default Credentials (para SDKs e bibliotecas)

```powershell
gcloud auth application-default login
```

### Operações úteis

```powershell
# Ver logs das Cloud Functions
gcloud functions logs read --project ligafaro-8000 --region europe-west1

# Listar Cloud Functions deployadas
gcloud functions list --project ligafaro-8000

# Ver o projeto ativo
gcloud config get-value project
```

---

## Pré-requisitos

- Python 3.9+
- Firebase CLI: `npm install -g firebase-tools`
- Google Cloud SDK instalado (`gcloud version` para verificar)
- Service account key em `C:\Users\FERNANDOVIEIRA\firebase-keys\ligafaro-8000-adminsdk.json`
- `.env` com `GOOGLE_APPLICATION_CREDENTIALS`, `GOOGLE_CLOUD_PROJECT` e `CLOUDSDK_CORE_ACCOUNT`
- Ficheiros `data/*.json` presentes localmente (estão no `.gitignore`)
