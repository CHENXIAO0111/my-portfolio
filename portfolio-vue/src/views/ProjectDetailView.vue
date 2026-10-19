<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findProject } from '@/data/projects'

const route = useRoute()
// 用 computed 跟随路由参数变化（同一组件内切换 id 也能更新）
const project = computed(() => findProject(route.params.id))
</script>

<template>
  <section v-if="project" class="work-detail">
    <img :src="project.cover" :alt="`${project.title}大图`">
    <div class="meta">
      <span class="tag">{{ project.tag }}</span>
      <h1>{{ project.title }}</h1>
      <p class="desc">{{ project.desc }}</p>
      <RouterLink to="/works" class="btn-back">← 返回作品列表</RouterLink>
    </div>
  </section>

  <section v-else class="section" style="text-align: center">
    <h1>作品不存在</h1>
    <p class="section-sub">编号 {{ route.params.id }} 没有对应的作品。</p>
    <RouterLink to="/works" class="btn-back">← 返回作品列表</RouterLink>
  </section>
</template>
