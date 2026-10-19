<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'

const featured = projects.slice(0, 3)
</script>

<template>
  <section class="hero">
    <h1>你好，我是 Exist</h1>
    <p>地理信息科学在读 · 专注 Web GIS 与数据可视化</p>
    <RouterLink to="/works" class="btn-primary">查看作品</RouterLink>
  </section>

  <section class="section">
    <h2 style="margin-bottom: 20px">精选作品</h2>
    <div class="works-grid">
      <ProjectCard v-for="p in featured" :key="p.id" :project="p" />
    </div>
  </section>
</template>
