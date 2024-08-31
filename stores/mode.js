import { defineStore } from "pinia";

export const useModeStore = defineStore('mode', () => {
  const mode = ref('light')

  function toggleMode() {
    mode.value = mode.value === 'light' ? 'dark' : 'light'
  }

  return {
    mode,
    toggleMode
  }
})