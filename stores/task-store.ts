import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import type { SubTask, SubTaskRequest, Task, TaskRequest } from "~/types";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref<Task[]>([]);
  const { $axios } = useNuxtApp(); // Pobierz axios z Nuxt Plugin

  // Akcja pobierająca taski z API
  const fetchTasks = async () => {
    try {
      const { data } = await $axios.get<TaskRequest[]>("/tasks");

      // Promise.all aby pobierać równolegle dla każdego taska
      // jak chcemy czystszy kod ale wolniejsze działanie to można użyć for
      tasks.value = await Promise.all(
        data.map(async (task) => {
          const subtasks = await Promise.all(
            task.subtasks.map(async (subtaskId) => {
              return await fetchSubTask(subtaskId);
            })
          );

          return {
            ...task,
            subtasks: subtasks
              .filter((subtask): subtask is SubTask => subtask !== null)
              .sort((a: SubTask, b: SubTask) => a.title.localeCompare(b.title)),
          };
        })
      );
    } catch (error) {
      throw new Error("Failed to fetch tasks: " + (error as Error).message);
    }
    console.log(tasks.value);
  };

  // Akcja pobierająca subtaska
  const fetchSubTask = async (taskId: string): Promise<SubTask | null> => {
    try {
      const { data } = await $axios.get<SubTaskRequest>(`/subtasks/${taskId}`);
      return data;
    } catch (error) {
      return null;
    }
  };

  // Akcja oznaczająca subtaska jako done
  const markSubTaskDone = (taskId: string, subTaskId: string) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      const subtask = task.subtasks.find((s) => s.id === subTaskId);
      if (subtask) {
        subtask.done = true;
        if (task.subtasks.every((s) => s.done)) {
          task.done = true;
        }
      } else {
        throw new Error(
          `Subtask with ID ${subTaskId} not found for task ${taskId}.`
        );
      }
    } else {
      throw new Error(`Task with ID ${taskId} not found.`);
    }
  };

  // Akcja próbująca oznaczyć taska jako done
  const markTaskDone = (taskId: string) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      if (task.subtasks.some((subtask) => !subtask.done)) {
        // Nie było info w dokumentacji co w przypadku jak task nie ma oznaczonych
        // subtasów jako done, więc przyjebałam, ze w tym momencie blokujemy oznaczanie
        throw new Error(
          "Cannot mark task as done while it has unfinished subtasks."
        );
      }
      task.done = true;
    } else {
      throw new Error(`Task with ID ${taskId} not found.`);
    }
  };

  const completedTasks = computed(() =>
    tasks.value.filter((task) => task.done)
  );

  return {
    tasks,
    fetchTasks,
    markSubTaskDone,
    markTaskDone,
    completedTasks,
  };
});
