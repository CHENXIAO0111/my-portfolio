<script setup>
import { ref } from 'vue'

// 主题切换：写 <html data-theme>，并持久化到 localStorage
const root = document.documentElement
const isDark = ref(root.dataset.theme === 'dark')

function toggleTheme() {
  isDark.value = !isDark.value
  if (isDark.value) root.dataset.theme = 'dark'
  else delete root.dataset.theme
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="logo" style="text-decoration: none">Exist · GIS 学习中</RouterLink>
    <div class="header-actions">
      <nav class="site-nav">
        <RouterLink to="/" exact-active-class="router-link-active" active-class="">首页</RouterLink>
        <RouterLink to="/works">作品</RouterLink>
        <RouterLink to="/tools">工具</RouterLink>
      </nav>
      <button class="theme-toggle" @click="toggleTheme">
        {{ isDark ? '浅色模式' : '深色模式' }}
      </button>
    </div>
  </header>
</template>
