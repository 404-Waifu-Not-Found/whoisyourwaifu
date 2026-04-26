param(
  [switch]$SkipInstall,
  [switch]$KeepLocalServers,
  [int]$PreviewPort = 4173
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Write-Step {
  param([string]$Message)
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Assert-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command '$Name' was not found in PATH."
  }
}

function Invoke-Native {
  param(
    [string]$FilePath,
    [string[]]$Arguments = @()
  )

  & $FilePath @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed with exit code $LASTEXITCODE`: $FilePath $($Arguments -join ' ')"
  }
}

function Stop-RepoNodeProcesses {
  param([string]$Path)

  $escapedPath = [regex]::Escape($Path)
  $processes = Get-CimInstance Win32_Process |
    Where-Object {
      $_.Name -in @("node.exe", "npm.exe", "npm.cmd") -and
      $_.CommandLine -match $escapedPath
    }

  foreach ($process in $processes) {
    Write-Host "Stopping local process $($process.ProcessId): $($process.Name)" -ForegroundColor Yellow
    Stop-Process -Id $process.ProcessId -Force
  }
}

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepoRoot

Assert-Command "node"

$NpmCommand = Get-Command "npm.cmd" -ErrorAction SilentlyContinue
if (-not $NpmCommand) {
  throw "Required command 'npm.cmd' was not found in PATH."
}
$Npm = $NpmCommand.Source

Write-Step "Checking Node and npm"
Invoke-Native "node" @("--version")
Invoke-Native $Npm @("--version")

if (-not $KeepLocalServers) {
  Write-Step "Stopping local Node/Vite processes for this repo"
  Stop-RepoNodeProcesses $RepoRoot
}

if (-not $SkipInstall) {
  if (Test-Path "package-lock.json") {
    Write-Step "Installing dependencies with npm ci"
    Invoke-Native $Npm @("ci")
  } else {
    Write-Step "Installing dependencies with npm install"
    Invoke-Native $Npm @("install")
  }
}

Write-Step "Building static site"
Invoke-Native $Npm @("run", "build")

if (-not (Test-Path "dist/index.html")) {
  throw "Build finished, but dist/index.html was not created."
}

Write-Step "Build ready"
Write-Host "Static files: $RepoRoot\dist" -ForegroundColor Green

Write-Step "Starting local static preview"
Write-Host "Open: http://127.0.0.1:$PreviewPort/" -ForegroundColor Green
Invoke-Native $Npm @("run", "preview", "--", "--host", "127.0.0.1", "--port", "$PreviewPort")
