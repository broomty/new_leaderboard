<script setup>
const store = useCounterStore();
const currentPage = ref(1);
const itemsPerPage = 10;

const totalItems = computed(() => store.rankedParishes.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

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
    const visiblePages = 2; // Number of pages to show on each side of the current page

    if (totalPages.value <= 1) return range;

    if (currentPage.value > 1) {
        range.push(1); // Always show the first page
    }

    if (currentPage.value > visiblePages + 2) {
        range.push('...'); // Show ellipsis if there are hidden pages before the current page
    }

    for (let i = Math.max(2, currentPage.value - visiblePages); i <= Math.min(totalPages.value - 1, currentPage.value + visiblePages); i++) {
        range.push(i);
    }

    if (currentPage.value < totalPages.value - (visiblePages + 1)) {
        range.push('...'); // Show ellipsis if there are hidden pages after the current page
    }

    if (currentPage.value < totalPages.value) {
        range.push(totalPages.value); // Always show the last page
    }

    return range;
});

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
  <div class="px-4 py-3 @container">
    <div class="overflow-hidden rounded-xl border border-[#d0e7d9] dark:border-[#475569] bg-[#f8fcfa] dark:bg-[#1e293b]">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-[#f8fcfa] dark:bg-[#1e293b]">
            <th class="px-4 py-3 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-medium leading-normal uppercase">
              Rank
            </th>
            <th class="pl-2 pr-6 py-3 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-medium leading-normal uppercase">
              Coordinator
            </th>
            <th class="px-4 py-3 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-medium leading-normal uppercase">
              Parish
            </th>
            <th class="px-4 py-3 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-medium leading-normal uppercase">
              {{ store.activity }}
            </th>
            <th class="px-4 py-3 text-left text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-medium leading-normal uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="parish in paginatedItems"
            :key="parish.parish"
            class="border-t border-t-[#d0e7d9] dark:border-t-[#475569]"
          >
            <td class="h-[72px] px-2 py-2 text-[#4e976d] dark:text-white text-sm font-normal leading-normal">
              {{ parish.rank }}
            </td>
            <td class="h-[72px] pl-2 py-2 text-sm text-[#4e976d] dark:text-[#4ade80] text-sm font-normal leading-normal">
              {{ parish.coordinator }}
            </td>
            <td class="h-[72px] px-4 py-2 text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-normal leading-normal">
              {{ parish.parish }}
            </td>
            <td class="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
              <div class="flex items-center gap-3">
                <p class="text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-normal leading-normal">
                  {{ parish.total }}
                </p>
              </div>
            </td>
            <td class="h-[72px] px-4 py-2 text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-normal leading-normal">
              <!-- Button to open modal with parish details -->
              <button @click="openModal(parish)" class="text-blue-500 hover:underline">
                view <i class="fa fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Pagination -->
  <div class="relative mt-4 flex items-center justify-center space-x-1">
    <!-- Previous Page Button -->
    <button
      @click="previousPage"
      :disabled="currentPage === 1"
      class="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"
        ></path>
      </svg>
    </button>

    <!-- Page Numbers -->
    <template v-for="page in paginationRange" :key="page">
      <span v-if="page === '...'" class="flex items-center justify-center w-8 h-8 text-sm font-medium text-gray-600">
        ...
      </span>
      <button
        v-else
        @click="goToPage(page)"
        :class="{
          'bg-blue-500 text-white': currentPage === page,
          'text-gray-600 bg-white hover:bg-blue-100': currentPage !== page,
        }"
        class="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next Page Button -->
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages.value"
      class="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
        ></path>
      </svg>
    </button>
  </div>

  <!-- Modal for parish details -->
  <ModalsGroup :isOpen="isModalOpen" @close="closeModal" :parish="selectedParish ? selectedParish : {}" />
</template>
