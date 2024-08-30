<script setup>
const store = useCounterStore();

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    parish: {
        type: Object,
        default: 'Modal Title',
    },
});

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};
</script>
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center" :class="isOpen ? 'block' : 'hidden'">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80 transition-opacity" @click="closeModal">
        </div>

        <!-- Modal Content -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 transition-transform transform"
            :class="isOpen ? 'scale-100' : 'scale-95'">
            <!-- Modal Header -->
            <div class="flex justify-between items-center border-b pb-3 dark:border-gray-700">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Parish: {{ parish.parish }}</h3>
                <h3>Ranked:{{ parish.rank }} / {{ store.rankedParishes.length }} in {{ store.activity ==
                    'Potted' ? 'Potting' : store.activity == 'Pricked' ? 'pricking' : store.activity ==
                    'Sorted'?'sorting':'Distribution'}}</h3>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    &times;
                </button>
            </div>

            <!-- Modal Body -->
            <div class="mt-4 text-gray-600 dark:text-gray-300">
                <p class="font-bold">Parish Coordinator: <span class="font-normal">{{ parish.coordinator }}</span></p>

                <p class="mt-2 font-bold">Branch: <span class="font-normal">{{ parish.branch ?
                    parish.branch.split('|')[0] : 'No Branch' }}</span></p>

                <!-- Scrollable container for groups -->
                <div class="grid grid-cols-3 overflow-auto h-64">
                    <div v-for="(group, groupKey) in parish.groups" :key="groupKey"
                        class="p-4 border border-green-400 rounded-lg m-2">
                        <p class="font-bold">{{ groupKey }}</p>
                        <hr>
                        <p>Potted: {{ group.potted }}</p>
                        <p>Pricked: {{ group.pricked }}</p>
                        <p>Sorted: {{ group.sorted }}</p>
                        <p>Distributed: {{ group.distributed }}</p>
                    </div>
                </div>
            </div>



            <!-- Modal Footer -->
            <div class="mt-6 flex justify-end">
                <button @click="closeModal"
                    class="bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 font-semibold py-2 px-4 rounded-md">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>