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
    <div class="px-4 py-5 ">
        <DashboardFilters />
        <DashboardTable />
    </div>
</template>
