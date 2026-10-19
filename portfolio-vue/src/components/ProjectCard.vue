<script setup>
defineProps({
  project: { type: Object, required: true }
})
</script>

<template>
  <RouterLink class="card" :to="{ name: 'work-detail', params: { id: project.id } }">
    <div class="card-media">
      <img :src="project.cover" :alt="project.title" loading="lazy">
    </div>
    <div class="card-body">
      <span class="tag">{{ project.tag }}</span>
      <h3>{{ project.title }}</h3>
      <p>{{ project.summary }}</p>
    </div>
  </RouterLink>
</template>
