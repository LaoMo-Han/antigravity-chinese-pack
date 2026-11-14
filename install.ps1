# Antigravity 简体中文语言包一键安装脚本 (Windows PowerShell)

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   Antigravity 简体中文深度语言包一键安装程序             " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$targetDir = "$env:USERPROFILE\.gemini\config\plugins\chinese-pack"

if (!(Test-Path $targetDir)) {
    Write-Host "[1/3] 正在创建插件目录: $targetDir ..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

Write-Host "[2/3] 正在同步插件文件与本地化资源 ..." -ForegroundColor Yellow
Copy-Item -Recurse -Force "$PSScriptRoot\assets" "$targetDir\"
Copy-Item -Recurse -Force "$PSScriptRoot\rules" "$targetDir\"
Copy-Item -Recurse -Force "$PSScriptRoot\skills" "$targetDir\"
Copy-Item -Recurse -Force "$PSScriptRoot\scripts" "$targetDir\"
Copy-Item -Force "$PSScriptRoot\plugin.json" "$targetDir\"
Copy-Item -Force "$PSScriptRoot\hooks.json" "$targetDir\"
Copy-Item -Force "$PSScriptRoot\package.json" "$targetDir\"
Copy-Item -Force "$PSScriptRoot\README.md" "$targetDir\"

Write-Host "[3/3] 正在执行全方位汉化引擎（热更新当前窗口 + 写入持久常驻）..." -ForegroundColor Yellow
Set-Location $targetDir

if (!(Test-Path "$targetDir\node_modules\@electron\asar")) {
    Write-Host "正在安装必要的解包组件 (@electron/asar) ..." -ForegroundColor Gray
    npm install @electron/asar --no-audit --no-fund --silent
}

node "$targetDir\scripts\apply_full_localization.js"

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "🎉 恭喜！Antigravity 简体中文语言包安装完成！" -ForegroundColor Green
Write-Host "系统设置、顶部菜单栏、会话画布与快捷键已全面中文化。" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
