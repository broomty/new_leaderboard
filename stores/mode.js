import { defineStore } from "pinia";
import { useColorMode } from '#imports';

export const useModeStore = defineStore('mode', () => {
  const { colorMode } = useColorMode();

  const toggleMode = () => {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light';
  };

  return {
    colorMode,
    toggleMode,
  };
})