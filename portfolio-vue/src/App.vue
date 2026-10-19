<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'

// 回到顶部按钮：滚动超过 400px 显示
const showTop = ref(false)
const onScroll = () => { showTop.value = window.scrollY > 400 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <footer class="site-footer">
    <p>&copy; 2026 Exist · 《网络GIS与移动GIS》 · 个人展示</p>
  </footer>
  <Transition name="fade">
    <button v-show="showTop" class="back-to-top" title="回到顶部" aria-label="回到顶部" @click="toTop">↑</button>
  </Transition>
</template>
