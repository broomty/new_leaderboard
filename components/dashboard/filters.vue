<script setup>
const activity = ref('potted');
</script>

<template>
    <div class="px-4 py-3">
        <label class="flex flex-col min-w-40 h-12 w-full">
            <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div class="text-[#4e976d] dark:text-[#4ade80] flex border-none bg-[#e7f3ec] dark:bg-[#334155] items-center justify-center pl-4 rounded-l-xl border-r-0"
                    data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor"
                        viewBox="0 0 256 256">
                        <path
                            d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                        </path>
                    </svg>
                </div>
                <input placeholder="Search Parish Cordinator"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b13] dark:text-[#cbd5e1] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ec] dark:bg-[#334155] focus:border-none h-full placeholder:text-[#4e976d] dark:placeholder:text-[#94a3b8] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value="" />
            </div>
        </label>
    </div>
    <div class="flex gap-4">
        <div class="px-4 py-3">
            <label for="activity" class="block text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-medium mb-1">Select
                Activity:</label>
            <select id="activity" v-model="activity"
                class="form-select mt-1 block w-full pl-3 pr-10 py-2 text-base dark:bg-[#334155] bg-[#e7f3ec] dark:text-[#cbd5e1] text-[#0e1b13] border-none focus:outline-none sm:text-sm rounded-xl">
                <option value="potted">Potting</option>
                <option value="pricked">Pricking</option>
                <option value="sorted">Sorting</option>
                <option value="distributed">Distribution</option>
            </select>
        </div>
        <div class="px-4 py-3">
            <label for="activity" class="block text-[#0e1b13] dark:text-[#cbd5e1] text-sm font-medium mb-1">Select
                Duration:</label>
            <select id="activity"
                class="form-select mt-1 block w-full pl-3 pr-10 py-2 text-base dark:bg-[#334155] bg-[#e7f3ec] dark:text-[#cbd5e1] text-[#0e1b13] border-none focus:outline-none sm:text-sm rounded-xl">
                <option>All Time</option>
                <option>This Week</option>
            </select>
        </div>
        <ModalsGroup />
    </div>
</template>
