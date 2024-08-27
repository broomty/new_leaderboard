<script setup>
import { ref, watch } from 'vue';

// Reactive property to manage the theme state
const isDarkMode = ref(false);

// Watch for changes in dark mode and update the `class` attribute on the `html` element

</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="flex flex-col items-center">
      <div
        class="w-12 h-12 cursor-not-allowed rounded-full border-2 border-gray-700 shadow-[10px_-10px_10px_#6359f8,0px_-10px_10px_0px_#9c32e2,10px_-10px_10px_#f36896,10px_0px_10px_#ff0b0b,10px_10px_10px_#ff5500,0px_10px_10px_#ff9500,-10px_10px_10px_#ffb700] animate-spin">
        <div
          class="absolute w-6 h-6 border-2 border-gray-700 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        </div>
      </div>
      <!-- Loading text -->
      <p class="text-gray-600 dark:text-gray-300 text-lg mt-8">Loading data...</p>
    </div>
  </div>
</template>
