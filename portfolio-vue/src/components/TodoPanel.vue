<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todos'
import TodoItem from './TodoItem.vue'

const store = useTodoStore()
const draft = ref('')

function submit() {
  store.add(draft.value)
  draft.value = ''
}
</script>

<template>
  <section class="panel">
    <h2>外业待办</h2>
    <form class="todo-form" @submit.prevent="submit">
      <input v-model="draft" type="text" placeholder="例如：去岳麓山采集控制点" aria-label="新待办" maxlength="60">
      <button class="btn-primary" type="submit" :disabled="!draft.trim()">添加</button>
    </form>

    <ul v-if="store.total" class="todo-list">
      <TodoItem
        v-for="t in store.items"
        :key="t.id"
        :todo="t"
        @toggle="store.toggle"
        @remove="store.remove"
      />
    </ul>
    <p v-else class="status">暂无待办，先加一条吧。</p>

    <div class="todo-footer">
      <span>剩余 {{ store.remaining }} / 共 {{ store.total }}</span>
      <button class="link-btn" :disabled="store.remaining === store.total" @click="store.clearDone">清除已完成</button>
    </div>
  </section>
</template>
