<script setup>
import { ref, onMounted } from 'vue';

// Define a reactive state for loading
const isLoading = ref(true);

// Simulate loading time with a timeout (e.g., 2 seconds)
onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 10000); // Adjust the time as needed
});
</script>

<template>
    <LoadingScreen v-if="isLoading" />
    <div v-else class="flex items-center justify-center min-h-screen bg-green-100">
        <div>
            <!-- Main content to display after loading -->
            <h1 class="text-red-500 text-7xl">Hello world</h1>
        </div>
    </div>
</template>
