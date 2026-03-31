@echo off
echo ==============================================
echo   AUTOMATIZADOR DE DESPLIEGUE A VERCEL/GITHUB
echo ==============================================
echo.

set /p commitMsg="Escribe de que se trata tu cambio (corto, sin tildes): "
if "%commitMsg%"=="" set commitMsg="Actualizacion general"

echo.
echo [1/3] Preparando los archivos...
git add .

echo [2/3] Guardando el cambio localmente...
git commit -m "%commitMsg%"

echo [3/3] Subiendo codigo (fuerza master=main)...
git push origin master:main --force

echo.
echo ==============================================
echo ¡Listo! Los cambios ya van en camino a la web.
echo ==============================================
pause
