import { defineStore } from 'pinia'

export const useDemoStore = defineStore('demo', () => {
  const counter = ref(0)

  function increment(): void {
    counter.value += 1
  }

  return {
    counter,
    increment,
  }
})
