@echo off
chcp 65001 >nul
rem 一键：打包 Vue 项目 → 复制到 nginx\html\portfolio → 启动/重载 nginx
cd /d "%~dp0"
set "NGINX_DIR=%~dp0..\nginx-1.30.5"

if not exist public\images (
  echo [1/4] 复制作品图片...
  xcopy ..\portfolio\images public\images\ /E /I /Y >nul
)

if not exist node_modules (
  echo [2/4] 安装依赖...
  call npm install || goto :fail
)

echo [3/4] 打包...
call npm run build || goto :fail

echo [4/4] 部署到 nginx...
if exist "%NGINX_DIR%\html\portfolio" rmdir /s /q "%NGINX_DIR%\html\portfolio"
xcopy dist "%NGINX_DIR%\html\portfolio\" /E /I /Y >nul

pushd "%NGINX_DIR%"
nginx.exe -t || (popd & goto :fail)
tasklist /fi "imagename eq nginx.exe" | find /i "nginx.exe" >nul
if errorlevel 1 (
  start "" nginx.exe
) else (
  nginx.exe -s reload
)
popd

echo.
echo 完成：http://localhost/portfolio/
pause
exit /b 0

:fail
echo.
echo 出错了，请把上面的报错发给我。
pause
exit /b 1
