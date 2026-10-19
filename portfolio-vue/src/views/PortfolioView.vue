<script setup>
import { ref, computed } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'

const tags = ['全部', ...new Set(projects.map(p => p.tag))]
const current = ref('全部')
const list = computed(() =>
  current.value === '全部' ? projects : projects.filter(p => p.tag === current.value)
)
</script>

<template>
  <section class="section">
    <h1>全部作品</h1>
    <p class="section-sub">课程学习与实践成果汇总（{{ list.length }} 项）</p>

    <div class="filters" role="group" aria-label="按类别筛选">
      <button
        v-for="t in tags"
        :key="t"
        :class="{ active: current === t }"
        :aria-pressed="current === t"
        @click="current = t"
      >{{ t }}</button>
    </div>

    <div class="works-grid">
      <ProjectCard v-for="p in list" :key="p.id" :project="p" />
    </div>
  </section>
</template>
