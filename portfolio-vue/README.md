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

## 说明

- `vite.config.js` 的 `base` 是 `/portfolio/`，必须和 nginx 的 location 前缀一致。
- 作品图片放在 `public/images/`，由 `src/data/projects.js` 用 `BASE_URL` 拼接路径。
- `/api/` 反代没有限流，仅适合本机实验；对外发布前应加访问频率限制。
