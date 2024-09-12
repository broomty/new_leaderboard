<script setup>
import { watch } from 'vue';

const store = useCounterStore();
const currentPage = ref(1);
const itemsPerPage = 10;

// Compute total items
const totalItems = computed(() => store.rankedParishes.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// Get logged-in user's parishes
const myParishes = computed(() => {
  return store.rankedParishes.filter(parish => parish.pcEmail === store.userData.email);
});

// Function to find the page where the logged-in user's parish is located
const findUserPage = () => {
  const index = store.rankedParishes.findIndex(parish => parish.pcEmail === store.userData.email);
  if (index !== -1) {
    return Math.ceil((index + 1) / itemsPerPage); // +1 because pages are 1-based, not 0-based
  }
  return 1;
};

// Paginate items
const getPaginatedItems = (pageNumber) => {
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return store.rankedParishes.slice(start, end);
};

const paginatedItems = computed(() => getPaginatedItems(currentPage.value));

// Methods for changing pages
const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

// Compute the pages to display in pagination with ellipses
const paginationRange = computed(() => {
  const range = [];
  const visiblePages = 2;

  if (totalPages.value <= 1) return range;

  if (currentPage.value > 1) {
    range.push(1);
  }

  if (currentPage.value > visiblePages + 2) {
    range.push('...');
  }

  for (let i = Math.max(2, currentPage.value - visiblePages); i <= Math.min(totalPages.value - 1, currentPage.value + visiblePages); i++) {
    range.push(i);
  }

  if (currentPage.value < totalPages.value - (visiblePages + 1)) {
    range.push('...');
  }

  if (currentPage.value < totalPages.value) {
    range.push(totalPages.value);
  }

  return range;
});

// Toggle between "My Performance" and all parishes
const toggleViewPerformance = () => {
  if (store.viewMe) {
    currentPage.value = findUserPage();  // Jump to the page where the logged-in user's parish is located
  } else {
    currentPage.value = 1;  // Reset to the first page when switching to all parishes
  }
};

// Watch store.viewMe and trigger toggleViewPerformance when it changes
watch(
  () => store.viewMe, // Watching store.viewMe for changes
  toggleViewPerformance // Passing the function reference
);

// State for modal
const isModalOpen = ref(false);
const selectedParish = ref(null);

const openModal = (parish) => {
  selectedParish.value = parish;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedParish.value = null;
};

</script>



<template>
  <div class="px-4 py-3">
    <div class="overflow-x-auto rounded-xl border border-[#d0e7d9] dark:border-[#475569] bg-[#f8fcfa] dark:bg-[#1e293b]">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-[#f8fcfa] dark:bg-[#1e293b]">
            <th class="px-4 py-2 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-xs md:text-sm font-medium leading-normal uppercase">
              Rank
            </th>
            <th class="px-4 py-2 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-xs md:text-sm font-medium leading-normal uppercase">
              Coordinator
            </th>
            <th class="px-4 py-2 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-xs md:text-sm font-medium leading-normal uppercase">
              Parish
            </th>
            <th class="px-4 py-2 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-xs md:text-sm font-medium leading-normal uppercase">
              Potted
            </th>
            <th class="px-4 py-2 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-xs md:text-sm font-medium leading-normal uppercase">
              Pricked
            </th>
            <th class="px-4 py-2 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-xs md:text-sm font-medium leading-normal uppercase">
              Sorted
            </th>
            <th class="px-4 py-2 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-xs md:text-sm font-medium leading-normal uppercase">
              Distributed
            </th>
            <th class="px-4 py-2 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-xs md:text-sm font-medium leading-normal uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="parish in paginatedItems" :key="parish.parish"
            class="border-t border-t-[#d0e7d9] dark:border-t-[#475569]"
            :class="{ 'bg-green-100': parish.pcEmail === store.userData.email }">
            <td class="px-2 py-2 text-xs md:text-sm text-[#4e976d] dark:text-white">
              {{ parish.rank }}
            </td>
            <td class="pl-2 py-2 text-xs md:text-sm text-[#4e976d] dark:text-[#4ade80]">
              {{ parish.coordinator }}
            </td>
            <td class="px-4 py-2 text-xs md:text-sm text-[#0e1b13] dark:text-[#cbd5e1]">
              {{ parish.parish }}
            </td>
            <td class="px-4 py-2 text-xs md:text-sm">
              <div class="flex items-center gap-3">
                <p class="text-[#0e1b13] dark:text-[#cbd5e1]">
                  {{ Object.values(parish.groups).reduce((acc, group) => acc + group.potted, 0).toLocaleString() }}
                </p>
              </div>
            </td>
            <td class="px-4 py-2 text-xs md:text-sm">
              <div class="flex items-center gap-3">
                <p class="text-[#0e1b13] dark:text-[#cbd5e1]">
                  {{ Object.values(parish.groups).reduce((acc, group) => acc + group.pricked, 0).toLocaleString() }}
                </p>
              </div>
            </td>
            <td class="px-4 py-2 text-xs md:text-sm">
              <div class="flex items-center gap-3">
                <p class="text-[#0e1b13] dark:text-[#cbd5e1]">
                  {{ Object.values(parish.groups).reduce((acc, group) => acc + group.sorted, 0).toLocaleString() }}
                </p>
              </div>
            </td>
            <td class="px-4 py-2 text-xs md:text-sm">
              <div class="flex items-center gap-3">
                <p class="text-[#0e1b13] dark:text-[#cbd5e1]">
                  {{ Object.values(parish.groups).reduce((acc, group) => acc + group.distributed, 0).toLocaleString() }}
                </p>
              </div>
            </td>
            <td class="px-4 py-4 text-xs md:text-sm">
              <button @click="openModal(parish)" class="text-[#265E3C] hover:underline">
                view <i class="fa fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="relative mt-4 flex items-center justify-center space-x-1">
      <!-- Previous Page Button -->
      <button @click="previousPage" :disabled="currentPage === 1"
        class="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
          <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z">
          </path>
        </svg>
      </button>

      <!-- Page Numbers -->
      <template v-for="page in paginationRange" :key="page">
        <span v-if="page === '...'" class="flex items-center justify-center w-8 h-8 text-sm font-medium text-gray-600">
          ...
        </span>
        <button v-else @click="goToPage(page)" :class="{
          'bg-[#265E3C] text-white': currentPage === page,
          'text-gray-600 bg-white hover:bg-green-100': currentPage !== page,
        }" class="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md">
          {{ page }}
        </button>
      </template>

      <!-- Next Page Button -->
      <button @click="nextPage" :disabled="currentPage === totalPages.value"
        class="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
          <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z">
          </path>
        </svg>
      </button>
    </div>

    <!-- Modal for parish details -->
    <ModalsGroup :isOpen="isModalOpen" @close="closeModal" :parish="selectedParish ? selectedParish : {}" />
  </div>
</template>

