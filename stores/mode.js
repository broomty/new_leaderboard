import { defineStore } from "pinia";
import { useColorMode } from '@nuxtjs/color-mode';

export const useModeStore = defineStore('mode', () => {
  const { colorMode } = useColorMode();
  
  const mode = ref(colorMode.preference);

  const setMode = (value) => {
    mode.value = value;
    colorMode.preference = value;
  }

  return {
    mode,
    setMode
  }
})