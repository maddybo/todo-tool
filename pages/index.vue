<template>
  <div class="wrapper">
    <h1>Task Manager</h1>
    <TaskList v-if="!loading" :tasks="tasks" />
    <div v-else>Loading...</div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: fit-content;
}

@media only screen and (max-width: 600px) {
  .wrapper {
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTaskStore } from "@/stores";

const loading = ref(true);

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
