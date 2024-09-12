<script setup>
const store = useCounterStore();
const activity = ref(store.activity);

// Function to run when activity changes
const onActivityChange = async (newValue, oldValue) => {
    store.switchActivity(newValue);
};

// Watch for changes in the `activity` ref
watch(activity, (newValue, oldValue) => {
    onActivityChange(newValue, oldValue);
});

// Computed property to check if the logged-in user's parish exists
const isUserParishPresent = computed(() => {
    return store.rankedParishes.some(parish => parish.pcEmail === store.userData.email);
});
</script>

<template>
  <div class="flex flex-col gap-6 items-center w-full">
    <!-- Search Box -->
    <div class="w-full max-w-2xl px-4 md:px-0">
      <label class="flex flex-col min-w-40 h-12">
        <div class="flex w-full items-stretch rounded-xl h-full">
          <div class="text-[#4e976d] dark:text-[#4ade80] flex border-none bg-[#e7f3ec] dark:bg-[#334155] items-center justify-center pl-4 rounded-l-xl border-r-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </div>
          <input placeholder="Search Parish Coordinator" class="form-input w-full flex-1 rounded-xl text-[#0e1b13] dark:text-[#cbd5e1] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ec] dark:bg-[#334155] placeholder:text-[#4e976d] dark:placeholder:text-[#94a3b8] px-4 pl-2 text-base leading-normal">
        </div>
      </label>
    </div>

    <!-- Filters Section -->
    <div class="flex flex-col md:flex-row md:gap-6 w-full max-w-2xl items-center justify-between">
      <!-- Activity Dropdown -->
      <div class="w-full md:w-1/2 px-4 md:px-0">
        <label for="activity" class="block text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-medium mb-1">Select Activity:</label>
        <select id="activity" v-model="activity"
          class="form-select mt-1 w-full pl-3 pr-10 py-2 text-base dark:bg-[#334155] bg-[#e7f3ec] dark:text-[#cbd5e1] text-[#0e1b13] border-none focus:outline-none sm:text-sm rounded-xl">
          <option value="Potted">Potting</option>
          <option value="Pricked">Pricking</option>
          <option value="Sorted">Sorting</option>
          <option value="Distributed">Distribution</option>
        </select>
      </div>

      <!-- Duration Dropdown -->
      <div class="w-full md:w-1/2 px-4 md:px-0">
        <label for="duration" class="block text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-medium mb-1">Select Duration:</label>
        <select id="duration"
          class="form-select mt-1 w-full pl-3 pr-10 py-2 text-base dark:bg-[#334155] bg-[#e7f3ec] dark:text-[#cbd5e1] text-[#0e1b13] border-none focus:outline-none sm:text-sm rounded-xl">
          <option>All Time</option>
          <option>This Week</option>
        </select>
      </div>
    </div>

    <!-- Conditionally Render Button -->
    <div v-if="isUserParishPresent" class="w-full max-w-2xl px-4 md:px-0">
      <button @click="store.updateViewMe()" type="button"
        class="text-white bg-[#265E3C] w-full md:w-auto h-12 mt-4 rounded-lg p-1 px-4 text-sm">
        {{ store.viewMe ? 'Back to All' : 'View My Position' }}
      </button>
    </div>

    <!-- Modal -->
    <ModalsGroup />
  </div>
</template>
