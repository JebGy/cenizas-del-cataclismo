@echo off
title Instalador Automatico de Mods Forge 1.20.1
color 0B
echo ============================================================
echo   Iniciando Descargador de Mods Forge 1.20.1
echo ============================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0descargar_mods_1.20.1.ps1"
echo.
pause
