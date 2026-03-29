# install.ps1 — Automated JobOS-CC Installation (Windows)
# Run: .install.ps1

Write-Host "=== JobOS-CC Automated Installation ===" -ForegroundColor Green
Write-Host ""

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$PluginSource = Join-Path $ScriptDir ".claude\plugins\jobos"
$PluginDest = Join-Path $env:USERPROFILE ".claude\plugins\jobos"

# Check prerequisites
Write-Host "Checking prerequisites..."

# Check for Claude Code
$claude = Get-Command claude -ErrorAction SilentlyContinue
if (-not $claude) {
    Write-Host "❌ Claude Code not found" -ForegroundColor Red
    Write-Host "Please install Claude Code first: https://www.anthropic.com/claude-code"
    exit 1
}
Write-Host "✓ Claude Code found" -ForegroundColor Green

# Check for Bun or Node
$bun = Get-Command bun -ErrorAction SilentlyContinue
$node = Get-Command node -ErrorAction SilentlyContinue

if ($bun) {
    $runtime = "bun"
    Write-Host "✓ Bun found" -ForegroundColor Green
} elseif ($node) {
    $runtime = "node"
    Write-Host "✓ Node.js found" -ForegroundColor Green
} else {
    Write-Host "❌ Neither Bun nor Node.js found" -ForegroundColor Red
    Write-Host "Please install Bun: https://bun.sh"
    Write-Host "Or install Node.js: https://nodejs.org"
    exit 1
}

# Check if plugin source exists
if (-not (Test-Path $PluginSource)) {
    Write-Host "❌ Plugin not found at $PluginSource" -ForegroundColor Red
    Write-Host "Make sure you're running this script from the jobos-cc directory"
    exit 1
}

# Create plugins directory
$PluginsDir = Join-Path $env:USERPROFILE ".claude\plugins"
New-Item -ItemType Directory -Force -Path $PluginsDir | Out-Null

# Remove old symlink if exists
if (Test-Path $PluginDest) {
    Write-Host "Removing old plugin link..."
    Remove-Item $PluginDest -Recurse -Force -ErrorAction SilentlyContinue
}

# Create symlink
Write-Host "Linking plugin to Claude Code..."
New-Item -ItemType SymbolicLink -Path $PluginDest -Target $PluginSource -Force | Out-Null
Write-Host "✓ Plugin linked" -ForegroundColor Green

# Update Claude Code settings
Write-Host "Updating Claude Code settings..."
$SettingsFile = Join-Path $env:USERPROFILE ".claude\settings.json"

if (-not (Test-Path $SettingsFile)) {
    '{}' | Out-File -FilePath $SettingsFile -Encoding utf8
}

$settings = Get-Content $SettingsFile | ConvertFrom-Json
if (-not $settings.enabledPlugins) {
    $settings | Add-Member -NotePropertyName enabledPlugins -NotePropertyValue @{} -Force
}
$settings.enabledPlugins | Add-Member -NotePropertyName "jobos@local" -NotePropertyValue $true -Force
$settings | ConvertTo-Json -Depth 10 | Out-File -FilePath $SettingsFile -Encoding utf8

Write-Host "✓ Settings updated" -ForegroundColor Green

# Initialize the system
Write-Host ""
Write-Host "Initializing JobOS-CC..."
Set-Location $PluginDest

if ($runtime -eq "bun") {
    if (-not (Test-Path "node_modules")) {
        Write-Host "Installing dependencies with Bun..."
        bun install
    }
    bun run scripts/init-jobos.ts
} else {
    if (-not (Test-Path "node_modules")) {
        Write-Host "Installing dependencies with npm..."
        npm install
    }
    npm run init
}

Write-Host "✓ System initialized" -ForegroundColor Green

# Success message
Write-Host ""
Write-Host "=== Installation Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Open Claude Code: claude"
Write-Host "2. Run: /jobos-setup"
Write-Host "3. Follow the interview to build your profile"
Write-Host ""
Write-Host "Quick commands:"
Write-Host "  /jobos-setup      — Build your profile"
Write-Host "  /jobos-find       — Search for jobs"
Write-Host "  /jobos-score      — Score job fit"
Write-Host "  /jobos-prepare    — Create materials"
Write-Host "  /jobos-submit     — Submit applications"
Write-Host ""
Write-Host "Happy job hunting!" -ForegroundColor Green
