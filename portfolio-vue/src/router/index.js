import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // BASE_URL 自动等于 vite.config.js 的 base（'/portfolio/'）
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/works', name: 'works', component: () => import('@/views/PortfolioView.vue') },
    { path: '/works/:id', name: 'work-detail', component: () => import('@/views/ProjectDetailView.vue') },
    { path: '/tools', name: 'tools', component: () => import('@/views/ToolsView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') }
  ],
  scrollBehavior: () => ({ top: 0 })
})

export default router
