<script setup>
import { onMounted } from 'vue'
import { useWeather } from '@/composables/useWeather'

const cities = ['长沙', '北京', '拉萨']
const { city, loading, error, temp, windspeed, weatherText, advice, load } = useWeather('长沙')

onMounted(() => load())
</script>

<template>
  <section class="panel">
    <h2>外业天气</h2>
    <div class="weather-row">
      <label for="city-select" class="weather-meta" style="align-self: center">城市</label>
      <select id="city-select" :value="city" :disabled="loading" @change="load($event.target.value)">
        <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
      </select>
      <button class="btn-back" :disabled="loading" @click="load()">刷新</button>
    </div>

    <p v-if="loading" class="status" aria-live="polite">加载中…</p>
    <p v-else-if="error" class="status error" role="alert">{{ error }}</p>
    <template v-else-if="temp !== null">
      <div class="weather-temp">{{ temp }}°C</div>
      <div class="weather-meta">{{ city }} · {{ weatherText }} · 风速 {{ windspeed }} km/h</div>
      <p class="weather-advice">{{ advice }}</p>
    </template>
  </section>
</template>
