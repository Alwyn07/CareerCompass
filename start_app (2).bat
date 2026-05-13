@echo off
title CareerCompass Launcher
echo ==========================================
echo      CareerCompass - Starting App...
echo ==========================================
echo.

REM Use the folder this .bat file lives in as the root
set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"

REM Verify folders exist
if not exist "%ROOT%\backend\server.js" (
    echo [ERROR] backend\server.js not found.
    echo Make sure this .bat file is inside the careercompass2 folder.
    pause
    exit /b 1
)

if not exist "%ROOT%\frontend\package.json" (
    echo [ERROR] frontend\package.json not found.
    echo Make sure this .bat file is inside the careercompass2 folder.
    pause
    exit /b 1
)

REM Auto-copy .env if missing
if not exist "%ROOT%\backend\.env" (
    if exist "%ROOT%\backend\.env.example" (
        echo [INFO] Creating .env from .env.example...
        copy "%ROOT%\backend\.env.example" "%ROOT%\backend\.env" >nul
        echo [INFO] .env created successfully.
        echo.
    )
)

REM Kill any old processes on ports 3000 and 5000
echo [INFO] Clearing ports 3000 and 5000 if in use...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING" 2^>nul') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING" 2^>nul') do taskkill /PID %%a /F >nul 2>&1
timeout /t 1 /nobreak >nul

echo.
echo [1/2] Starting Backend on http://localhost:5000 ...
start "CareerCompass Backend" cmd /k "cd /d "%ROOT%\backend" && npm start"

echo [2/2] Starting Frontend on http://localhost:3000 ...
start "CareerCompass Frontend" cmd /k "cd /d "%ROOT%\frontend" && npm run dev"

REM Wait for frontend to be ready then open browser
echo.
echo [INFO] Waiting for servers to be ready...
timeout /t 6 /nobreak >nul

echo [INFO] Opening app in browser...
start "" "http://localhost:3000"

echo.
echo ==========================================
echo   CareerCompass is now running!
echo   Backend  : http://localhost:5000
echo   Frontend : http://localhost:3000
echo ==========================================
echo.
echo   Close the Backend and Frontend windows to stop the app.
pause
