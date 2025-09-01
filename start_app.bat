@echo off
REM Cambia el directorio actual a la ubicación de este script
cd /d "%~dp0"

REM Inicia el navegador con la dirección de la aplicación
start "" http://localhost:8000

REM Inicia el servidor HTTP de Python
REM Esta ventana de comandos permanecerá abierta mientras el servidor esté activo.
REM Ciérrala para detener el servidor.
python -m http.server
