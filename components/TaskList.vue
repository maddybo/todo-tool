<template>
  <ul class="task-list">
    <TaskItem v-for="task in tasks" :key="task.id" :item="task" />
    <div v-if="!tasks.length">Brak zadań...</div>
  </ul>
</template>

<style scoped lang="scss">
.task-list {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 24px;
  background-color: #eeeded;
  padding: 18px;
  margin: 12px;
  border-radius: 6px;
  box-shadow: 0 0 0 1px hsla(0, 0%, 6%, 0.1), 0 2px 4px hsla(0, 0%, 6%, 0.1);
  width: 400px;
  max-width: 100%;
}

@media only screen and (max-width: 600px) {
  .task-list {
    margin: 0;
    padding: 12px;
    width: 100%;
    border-radius: 0;
  }
}
</style>

<script setup lang="ts">
import type { Task } from "~/types";

const props = defineProps<{
  tasks: Task[];
}>();
</script>
