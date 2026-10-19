<script setup>
import WeatherCard from '@/components/WeatherCard.vue'
import TodoPanel from '@/components/TodoPanel.vue'
</script>

<template>
  <section class="section">
    <h1>外业小工具</h1>
    <p class="section-sub">实时天气（Open-Meteo）+ 本地保存的待办清单</p>
    <div class="tools-grid">
      <WeatherCard />
      <TodoPanel />
    </div>
  </section>
</template>
