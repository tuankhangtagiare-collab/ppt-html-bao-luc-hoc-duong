@echo off
setlocal
cd /d "%~dp0"
title School Violence - HTML Web Presentation

echo ========================================
echo  SCHOOL VIOLENCE PRESENTATION
echo ========================================
echo.
echo [1/3] Checking Node.js environment...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please download and install Node.js from: https://nodejs.org/
    echo After installing Node.js, run start.bat again.
    echo.
    pause
    exit /b 1
)

node -v >nul 2>nul
echo       -^> Node.js is ready.

echo [2/3] Checking dependencies (node_modules)...
if not exist "node_modules" (
    echo       -^> Installing dependencies via npm install...
    echo       -^> Please wait a moment...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed. Please check your network connection.
        pause
        exit /b 1
    )
    echo       -^> Dependencies installed successfully!
) else (
    echo       -^> Dependencies are ready.
)

echo.
echo ========================================
echo  SCHOOL VIOLENCE PRESENTATION
echo ========================================
echo.
echo Starting presentation...
echo.
echo Local URL:
echo http://localhost:5173
echo.
echo Opening Chrome...
echo.

call npm run start

if %errorlevel% neq 0 (
    echo.
    echo [Notice] Presentation server stopped.
    pause
)
