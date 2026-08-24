<#
.SYNOPSIS
    Deploy rápido e seguro: backup de data/, gera dashboard, commit, push e deploy Firebase.

.DESCRIPTION
    Fluxo protegido para evitar o que já aconteceu antes (apagar/sobrescrever
    data/*.json sem querer):
      1. Faz backup de data/*.json para data/.backups/<timestamp>/ (nunca apaga nada)
      2. Corre o gerador (gerador_dashboard.py)
      3. Faz "git add" APENAS aos ficheiros gerados conhecidos (nunca "git add -A" / "git add .")
      4. Aborta se, por algum motivo, algo dentro de data/ tiver ficado staged
      5. Mostra o diff resumido antes de comitar
      6. Commit -> push -> firebase deploy (qualquer um destes passos pode ser saltado com switches)

.PARAMETER Message
    Mensagem de commit (obrigatória).

.PARAMETER SkipPush
    Não faz git push (só commit local).

.PARAMETER SkipDeploy
    Não faz firebase deploy (só commit/push).

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
    Write-Host "`n[ABORTADO] $msg" -ForegroundColor Red
    exit 1
}

# ── 0. Tem de correr na raiz do projeto ──────────────────────────
if (-not (Test-Path "gerador_dashboard.py")) {
    Fail "Corre este script a partir da raiz do projeto (onde está gerador_dashboard.py)."
}

# ── 1. Backup de data/ ANTES de tocar em seja o que for ──────────
if (Test-Path "data") {
    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupDir = "data\.backups\$ts"
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
    $jsonFiles = Get-ChildItem "data\*.json" -ErrorAction SilentlyContinue
    if ($jsonFiles) {
        Copy-Item "data\*.json" -Destination $backupDir
        Write-Host "[OK] Backup de $($jsonFiles.Count) ficheiro(s) de data/ em $backupDir" -ForegroundColor Green
    } else {
        Write-Host "[AVISO] Pasta data/ existe mas está vazia — nada para backup." -ForegroundColor Yellow
    }
} else {
    Write-Host "[AVISO] Pasta data/ não encontrada. Confirma com o utilizador antes de continuar se achavas que existia." -ForegroundColor Yellow
}

# ── 2. Gerar dashboard.html / admin.html ─────────────────────────
Write-Host "`nA gerar dashboard..." -ForegroundColor Cyan
py gerador_dashboard.py
if ($LASTEXITCODE -ne 0) { Fail "gerador_dashboard.py falhou — nada foi comitado." }

# ── 3. Staging: SÓ ficheiros gerados conhecidos, nunca -A / . ────
$knownFiles = @("dashboard.html", "admin.html", "firebase.json") | Where-Object { Test-Path $_ }
if (-not $knownFiles) { Fail "Nenhum dos ficheiros esperados (dashboard.html/admin.html/firebase.json) existe." }

git add $knownFiles

# ── 4. Rede de segurança: aborta se algo em data/ ficou staged ───
$staged = git diff --cached --name-only
$dataStaged = $staged | Where-Object { $_ -like "data/*" }
if ($dataStaged) {
    git reset $knownFiles | Out-Null
    Fail "Ficheiros dentro de data/ ficaram staged ($($dataStaged -join ', ')) — isto não deveria acontecer, pois data/ é git-ignored. Abortado sem alterar nada."
}

# ── 5. Nada para comitar? ─────────────────────────────────────────
if (-not $staged) {
    Write-Host "`nNada mudou em dashboard.html/admin.html/firebase.json — não há nada para comitar." -ForegroundColor Yellow
    exit 0
}

Write-Host "`nFicheiros a comitar:" -ForegroundColor Cyan
git diff --cached --stat

# ── 6. Commit ─────────────────────────────────────────────────────
git commit -m $Message
if ($LASTEXITCODE -ne 0) { Fail "git commit falhou." }
Write-Host "[OK] Commit criado." -ForegroundColor Green

# ── 7. Push ────────────────────────────────────────────────────────
if (-not $SkipPush) {
    Write-Host "`nA fazer push..." -ForegroundColor Cyan
    git push
    if ($LASTEXITCODE -ne 0) { Fail "git push falhou (commit local mantém-se)." }
    Write-Host "[OK] Push concluído." -ForegroundColor Green
} else {
    Write-Host "`n[SkipPush] Push saltado." -ForegroundColor Yellow
}

# ── 8. Deploy Firebase ────────────────────────────────────────────
if (-not $SkipDeploy) {
    Write-Host "`nA fazer deploy para Firebase Hosting..." -ForegroundColor Cyan
    firebase deploy --only hosting --project ligafaro-8000
    if ($LASTEXITCODE -ne 0) { Fail "firebase deploy falhou." }
    Write-Host "[OK] Deploy concluído -> https://iefp-hackers.web.app" -ForegroundColor Green
} else {
    Write-Host "`n[SkipDeploy] Deploy saltado." -ForegroundColor Yellow
}

Write-Host "`nConcluído." -ForegroundColor Green
