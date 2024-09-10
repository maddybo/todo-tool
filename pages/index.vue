<template>
  <div>
    <h1>Task Manager</h1>
    <TaskList v-if="!loading" :tasks="tasks" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTaskStore } from "@/stores/task-store";

const loading = ref(false);

const store = useTaskStore();
const { tasks } = storeToRefs(store);

onMounted(async () => {
  loading.value = true;
  try {
    await store.fetchTasks();
  } catch (error) {
    console.log((error as Error).message);
  }
  loading.value = false;
});
</script>
