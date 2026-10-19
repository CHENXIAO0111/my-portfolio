<script setup>
defineProps({
  todo: { type: Object, required: true }
})
defineEmits(['toggle', 'remove'])
</script>

<template>
  <li class="todo-item" :class="{ done: todo.done }">
    <label>
      <input type="checkbox" :checked="todo.done" @change="$emit('toggle', todo.id)">
      <span class="todo-text">{{ todo.text }}</span>
    </label>
    <span class="todo-date">{{ todo.createdAt }}</span>
    <button class="todo-del" :aria-label="`删除：${todo.text}`" @click="$emit('remove', todo.id)">×</button>
  </li>
</template>
