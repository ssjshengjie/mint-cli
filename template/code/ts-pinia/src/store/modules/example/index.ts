import { store } from "@/store";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
// write setup method of pinia
export const example = defineStore("example", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export function useExample() {
  return example(store);
}
