import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'portfolio-todos'

export const useTodoStore = defineStore('todos', () => {
  const items = ref(load())

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const arr = raw ? JSON.parse(raw) : []
      return Array.isArray(arr) ? arr : []
    } catch (e) {
      console.warn('待办数据损坏，已重置：', e)
      return []
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  const total = computed(() => items.value.length)
  const remaining = computed(() => items.value.filter(t => !t.done).length)

  function add(text) {
    const t = text.trim()
    if (!t) return
    items.value.push({ id: Date.now(), text: t, done: false, createdAt: new Date().toLocaleDateString('zh-CN') })
    persist()
  }
  function toggle(id) {
    const t = items.value.find(t => t.id === id)
    if (t) { t.done = !t.done; persist() }
  }
  function remove(id) {
    items.value = items.value.filter(t => t.id !== id)
    persist()
  }
  function clearDone() {
    items.value = items.value.filter(t => !t.done)
    persist()
  }

  return { items, total, remaining, add, toggle, remove, clearDone }
})
