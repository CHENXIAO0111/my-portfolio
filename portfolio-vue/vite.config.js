import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  // 部署到子目录 /portfolio/ —— 与 nginx 的 location 前缀一致
  base: '/portfolio/',

  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },

  server: {
    port: 5173,
    open: true,
    // 开发代理：/api → Open-Meteo（生产环境由 nginx 反代承接同一路径）
    proxy: {
      '/api': {
        target: 'https://api.open-meteo.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 800
  }
})
