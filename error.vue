<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-green-50 p-4">
    <div class="text-center">
      <img src="/kijani-logo-name.png" alt="Kijani Logo" class="mx-auto mb-6  h-14" />
      <h1 class="text-6xl font-bold text-green-600 mb-4">{{ error?.statusCode }}</h1>
      <p class="text-2xl text-gray-700 mb-2">{{ error?.statusMessage }}</p>
      <p class="text-gray-600 mb-8">
        Please check the URL or return to the homepage.
      </p>
      <NuxtLink to="/"
        class="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition duration-300">
        Go Back Home
      </NuxtLink>
    </div>
  </div>
</template>