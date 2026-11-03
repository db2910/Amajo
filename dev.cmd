@echo off
setlocal
cd /d "%~dp0"

rem Existing IDE terminals may not have inherited the updated user PATH.
set "AMAJO_NODE_DIR=%LOCALAPPDATA%\Amajo\tools\node-v24.22.2-win-x64"
if exist "%AMAJO_NODE_DIR%\node.exe" set "PATH=%AMAJO_NODE_DIR%;%PATH%"

where.exe node.exe >nul 2>&1
if errorlevel 1 (
  echo Node.js 24 LTS was not found. See README.md for toolchain setup.
  exit /b 1
)
where.exe npm.cmd >nul 2>&1
if errorlevel 1 (
  echo npm was not found. See README.md for toolchain setup.
  exit /b 1
)

call npm.cmd run dev -- %*
exit /b %errorlevel%
