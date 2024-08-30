<script setup>
const store = useCounterStore();

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
const showModal = ref(false);

const handleConfirm = () => {
    // Handle confirmation action here
    console.log('Modal confirmed');
    showModal.value = false;
};

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 4000);
});
</script>

<template>
    <LoadingScreen v-if="isLoading" />
    <div v-else class="flex flex-col dark:bg-gray-900 min-h-screen">
        <button @click="store.fetchData">fetch</button>
        <DashboardHeader />
        <div class="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] dark:bg-[#1e293b] group/design-root overflow-x-hidden"
            style='font-family: "Work Sans", "Noto Sans", sans-serif;'>
            <div class="layout-container flex h-full grow flex-col">

                <div class="px-40 flex flex-1 justify-center py-5">
                    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
                        <DashboardFilters />
                        <DashboardTable />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
