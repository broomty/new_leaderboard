<script setup>
const store = useCounterStore();

definePageMeta({
    middleware: 'auth',
    layout: 'custom',
    colorMode: 'light',
});
useSeoMeta({
    title: 'Home - Kijani leaderboard',
    description: 'Use filters to view ranking based on activities',
    ogTitle: 'Home - Kijani leaderboard',
    ogDescription: 'Use filters to view ranking based on activities',
});

const isLoading = computed(() => store.loadingData); // Make isLoading a computed property
const showModal = ref(false);

const handleConfirm = () => {
    // Handle confirmation action here
    console.log('Modal confirmed');
    showModal.value = false;
};
</script>

<template>
    <LoadingScreen v-if="isLoading" />
    <div class="flex flex-col items-center justify-center h-[65%]">
        <div class="bg-white text-gray-800 flex items-center justify-center p-12 shadow-lg rounded-xl">
            <div class="text-center space-y-8">
                <!-- Company Logo -->
                <div>
                    <img src="https://www.forestmatic.com/assets/img/bcoa/kijani-logo-name.png" alt="Company Logo"
                        class="mx-auto  w-64">
                </div>

                <!-- Main Heading -->
                <h1 class="text-5xl font-bold animate-pulse">Coming Soon</h1>

                <!-- Subtext -->
                <p class="text-lg">The IT team is working hard to bring you something amazing. Stay tuned!</p>
            </div>
        </div>
    </div>
</template>
