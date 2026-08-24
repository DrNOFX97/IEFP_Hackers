<#
.SYNOPSIS
    Deploy rapido e seguro: backup de data/, gera dashboard, commit, push e deploy Firebase.

.DESCRIPTION
    Fluxo protegido para evitar apagar/sobrescrever data/*.json sem querer:
      1. Faz backup de data/*.json para data/.backups/<timestamp>/ (nunca apaga nada)
      2. Corre o gerador (gerador_dashboard.py)
      3. Faz "git add" APENAS aos ficheiros gerados conhecidos (nunca "git add -A" / "git add .")
      4. Aborta se, por algum motivo, algo dentro de data/ tiver ficado staged
      5. Mostra o resumo do que vai ser comitado
      6. Commit -> push -> firebase deploy (cada passo pode ser saltado com switches)

.PARAMETER Message
    Mensagem de commit (obrigatoria).

.PARAMETER SkipPush
    Nao faz git push (so commit local).

.PARAMETER SkipDeploy
    Nao faz firebase deploy (so commit/push).

.EXAMPLE
    .\deploy.ps1 -Message "feat: adicionar horario de setembro"

.EXAMPLE
    .\deploy.ps1 -Message "fix: corrigir formador UC00616" -SkipPush
#>
param(
    [Parameter(Mandatory=$true)]
    [string]$Message,

    [switch]$SkipPush,
    [switch]$SkipDeploy
)

$ErrorActionPreference = "Stop"

function Fail($msg) {
    Write-Host ""
    Write-Host "[ABORTADO] $msg" -ForegroundColor Red
    exit 1
}

# -- 0. Tem de correr na raiz do projeto --------------------------
if (-not (Test-Path "gerador_dashboard.py")) {
    Fail "Corre este script a partir da raiz do projeto (onde esta gerador_dashboard.py)."
}

# -- 1. Backup de data/ ANTES de tocar em seja o que for ----------
if (Test-Path "data") {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupDir = "data\.backups\$ts"
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
    $jsonFiles = Get-ChildItem "data\*.json" -ErrorAction SilentlyContinue
    if ($jsonFiles) {
        Copy-Item "data\*.json" -Destination $backupDir
        Write-Host "[OK] Backup de $($jsonFiles.Count) ficheiro(s) de data/ em $backupDir" -ForegroundColor Green
    } else {
        Write-Host "[AVISO] Pasta data/ existe mas esta vazia - nada para backup." -ForegroundColor Yellow
    }
} else {
    Write-Host "[AVISO] Pasta data/ nao encontrada. Confirma com o utilizador se achavas que existia." -ForegroundColor Yellow
}

# -- 2. Gerar dashboard.html / admin.html --------------------------
Write-Host ""
Write-Host "A gerar dashboard..." -ForegroundColor Cyan
py gerador_dashboard.py
if ($LASTEXITCODE -ne 0) { Fail "gerador_dashboard.py falhou - nada foi comitado." }

# -- 3. Staging: SO ficheiros gerados conhecidos, nunca -A / . ----
$knownFiles = @("dashboard.html", "admin.html", "firebase.json") | Where-Object { Test-Path $_ }
if (-not $knownFiles) { Fail "Nenhum dos ficheiros esperados (dashboard.html/admin.html/firebase.json) existe." }

git add $knownFiles

# -- 4. Rede de seguranca: aborta se algo em data/ ficou staged ---
$staged = git diff --cached --name-only
$dataStaged = $staged | Where-Object { $_ -like "data/*" }
if ($dataStaged) {
    git reset $knownFiles | Out-Null
    Fail "Ficheiros dentro de data/ ficaram staged ($($dataStaged -join ', ')) - isto nao deveria acontecer, pois data/ e git-ignored. Abortado sem alterar nada."
}

# -- 5. Nada para comitar? -----------------------------------------
if (-not $staged) {
    Write-Host ""
    Write-Host "Nada mudou em dashboard.html/admin.html/firebase.json - nao ha nada para comitar." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Ficheiros a comitar:" -ForegroundColor Cyan
git diff --cached --stat

# -- 6. Commit -------------------------------------------------------
git commit -m $Message
if ($LASTEXITCODE -ne 0) { Fail "git commit falhou." }
Write-Host "[OK] Commit criado." -ForegroundColor Green

# -- 7. Push -----------------------------------------------------------
if (-not $SkipPush) {
    Write-Host ""
    Write-Host "A fazer push..." -ForegroundColor Cyan
    git push
    if ($LASTEXITCODE -ne 0) { Fail "git push falhou (commit local mantem-se)." }
    Write-Host "[OK] Push concluido." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "[SkipPush] Push saltado." -ForegroundColor Yellow
}

# -- 8. Deploy Firebase --------------------------------------------------
if (-not $SkipDeploy) {
    Write-Host ""
    Write-Host "A fazer deploy para Firebase Hosting..." -ForegroundColor Cyan
    firebase deploy --only hosting --project ligafaro-8000
    if ($LASTEXITCODE -ne 0) { Fail "firebase deploy falhou." }
    Write-Host "[OK] Deploy concluido -> https://iefp-hackers.web.app" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "[SkipDeploy] Deploy saltado." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Concluido." -ForegroundColor Green
