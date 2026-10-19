# Exist 的作品集（Vue 3 + Vite 版）

## 开发模式

```bat
cd /d E:\网络gis\portfolio-vue
xcopy ..\portfolio\images public\images\ /E /I /Y
npm install
npm run dev
```

打开 http://localhost:5173/portfolio/ ，天气接口走 Vite 代理。

## 部署到 nginx

双击 `deploy.bat`，它会依次完成：复制图片 → 安装依赖 → `npm run build` →
把 `dist` 复制到 `..\nginx-1.30.5\html\portfolio\` → 校验配置并启动/重载 nginx。

完成后打开 http://localhost/portfolio/ ，天气接口走 nginx 的 `/api/` 反向代理。

停止 nginx：

```bat
cd /d E:\网络gis\nginx-1.30.5
nginx.exe -s stop
```

## 部署到 GitHub Pages（线上）

仓库：https://github.com/CHENXIAO0111/my-portfolio
线上地址：https://chenxiao0111.github.io/my-portfolio/

源码位于该仓库的 `portfolio-vue/` 目录，推送 `main` 后由
`.github/workflows/deploy.yml` 自动构建并发布：

```bat
npx vite build --mode ghpages --base=/my-portfolio/ --outDir dist-ghpages
```

GitHub Pages 没有服务端，无法反代 `/api`，因此 `--mode ghpages` 会加载
`.env.ghpages`，把天气请求指向 `https://api.open-meteo.com`（该接口允许跨域）。
子路由刷新依赖构建时复制的 `404.html` 回退。

## 说明

- `vite.config.js` 的 `base` 是 `/portfolio/`，必须和 nginx 的 location 前缀一致；
  GitHub Pages 构建时用命令行 `--base=/my-portfolio/` 覆盖，不改配置文件。
- 作品图片放在 `public/images/`，由 `src/data/projects.js` 用 `BASE_URL` 拼接路径。
- 天气请求前缀由 `VITE_WEATHER_BASE` 控制：默认 `/api`（Vite 代理 / nginx 反代），
  GitHub Pages 用 `.env.ghpages` 直连接口。
- `/api/` 反代没有限流，仅适合本机实验；对外发布前应加访问频率限制。
