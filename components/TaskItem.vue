<template>
  <li class="task">
    <div class="task-data" :class="{ done: item.done }">
      <div class="tick" @click="markItemDone">
        <template v-if="item.done">✔️</template>
      </div>
      <div @click="toggleExpand" class="name">
        {{ item.title }}
      </div>
    </div>

    <ul
      v-if="isExpanded && isTask(item) && item.subtasks.length"
      class="subtasks"
    >
      <TaskItem
        v-for="subtask in item.subtasks"
        :key="subtask.id"
        :item="subtask"
        :parentId="item.id"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "@/stores/task-store";
import type { SubTask, Task } from "~/types";

const props = defineProps<{
  item: Task | SubTask;
  parentId?: string;
}>();

const store = useTaskStore();
const isExpanded = ref(false);

// Funkcja do rozwijania/zamykania listy subtasków
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// Funkcja do oznaczania elementu jako done
const markItemDone = () => {
  try {
    if (isTask(props.item)) {
      store.markTaskDone(props.item.id);
    } else if (props.parentId) {
      store.markSubTaskDone(props.parentId, props.item.id);
    }
  } catch (error) {
    alert((error as Error).message);
  }
};

// Funkcja do sprawdzania czy używamy taska czy subtaska
// Lepiej jakby to był computer, ale typescript ma problem ze skumaniem
// item is Task w computed
const isTask = (item: Task | SubTask): item is Task => {
  return "subtasks" in item;
};
</script>

<style scoped lang="scss">
.task {
  display: flex;
  flex-direction: column;
  gap: 12px;
  .task-data {
    display: flex;
    align-items: center;
    gap: 12px;
    .tick {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border: 2px solid #eeca72;
      border-radius: 100%;
      cursor: pointer;
    }
    .name {
      cursor: pointer;
      font-weight: 600;
    }
    &.done {
      .name {
        text-decoration: line-through;
        color: grey;
      }
    }
  }
  .subtasks {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
