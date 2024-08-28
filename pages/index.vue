<script setup>
definePageMeta({
    middleware: 'auth'
})
useSeoMeta({
  title: 'Home - Kijani leaderboard',
  description: 'Use filters to view ranking based on activities',
  ogTitle: 'Home - Kijani leaderboard',
  ogDescription: 'Use filters to view ranking based on activities',
})

const isLoading = ref(true);

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 10000);
});
</script>

<template>
    <LoadingScreen v-if="isLoading" />
    <div v-else class="flex flex-col dark:bg-gray-900 min-h-screen">
        <DashboardHeader />
        <div class="flex items-center justify-center">
            
            <div>
                <!-- Main content to display after loading -->
                <h1 class="text-red-500 text-7xl">Hello world</h1>
            </div>
        </div>
    </div>

</template>
