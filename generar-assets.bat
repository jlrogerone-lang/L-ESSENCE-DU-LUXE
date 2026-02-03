@echo off
REM GENERAR-ASSETS.BAT
REM Script para generar assets en Windows
REM Ejecutar: generar-assets.bat

echo.
echo ========================================
echo   GENERANDO ASSETS PLACEHOLDER
echo ========================================
echo.

REM Ejecutar el script Node.js
node generar-assets.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   ASSETS GENERADOS CORRECTAMENTE
    echo ========================================
    echo.
    echo Siguiente paso:
    echo   npm install
    echo.
) else (
    echo.
    echo ERROR: No se pudieron generar los assets
    echo Asegurate de tener Node.js instalado
    echo.
)

pause
