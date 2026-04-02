@echo off
title KasirGO Server

echo.
echo  ========================
echo   KasirGO Server Launcher
echo  ========================
echo.
echo  Pilih cara menjalankan server:
echo.
echo  [1] Node.js   (node server.js)
echo  [2] Python    (python server.py)
echo.

set /p choice="  Ketik 1 atau 2 lalu tekan Enter: "

if "%choice%"=="1" (
    echo.
    echo  Menjalankan KasirGO dengan Node.js...
    echo  Buka browser: http://localhost:3000
    echo.
    node server.js
) else if "%choice%"=="2" (
    echo.
    echo  Menjalankan KasirGO dengan Python...
    echo  Buka browser: http://localhost:3000
    echo.
    python server.py
) else (
    echo.
    echo  Pilihan tidak valid. Coba lagi.
    pause
    start.bat
)

pause
