<script setup>
const userData = useCounterStore().userData;
const colorMode = useColorMode();
colorMode.preference = 'system';
const tokenCookie = useCookie('token');

// State to control the visibility of the mobile menu
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// function to logout
const logout = () => {
  tokenCookie.value = null;
  navigateTo('/auth/login');
};
</script>

<template>
  <div class="flex flex-col dark:bg-gray-900 min-h-screen">
    <div class="w-full bg-[#265E3C]">
      <div class="p-3 2xl:p-4 px-8 flex flex-row-reverse md:flex-row justify-between items-center mx-auto max-w-7xl">
        <!-- Kijani logo (hidden on small screens) -->
        <img src="/kijaniforestry-white.png" class="h-8 2xl:h-12 md:block" alt="">

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-4 text-white">
          <NuxtLink to="/" exact class="hover:text-orange-300">Nursery Actions</NuxtLink>
          <NuxtLink to="/gardens" class="hover:text-orange-300">Garden Actions</NuxtLink>
        </div>

        <!-- Hamburger Menu for Mobile -->
        <button @click="toggleMenu" class="text-white text-xl md:hidden">
          <i v-if="!isMenuOpen" class="fa fa-bars"></i>
          <i v-else class="fa fa-times"></i>
        </button>

        <!-- User Info Dropdown for Desktop -->
        <div class="hidden md:flex items-center space-x-6">
          <div class="relative group">
            <button class="flex items-center space-x-2 text-white focus:outline-none">
              <i class="w-6 h-6 2xl:w-10 2xl:h-10 rounded-full fa fa-user bg-gray-800 p-1 2xl:p-3 text-center"></i>
              <span class="hidden md:inline text-sm 2xl:text-md">{{ userData.firstName }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown content -->
            <div
              class="absolute hidden group-hover:block right-0 mt-0 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20 text-sm 2xl:text-md dark:border">
              <!-- User details section -->
              <div class="px-4 py-2 text-gray-700 dark:text-gray-300">
                <p class="font-semibold text-lg 2xl:text-xl">{{ userData.firstName }} {{ userData.lastName }}</p>
                <p class="text-gray-700 dark:text-gray-400">{{ userData.email }}</p>
                <p class="text-green-500 text-lg dark:text-green-400">{{ userData.role }}</p>
              </div>
              <hr>
              <!-- Logout button -->
              <button @click="logout"
                class="block px-4 py-2 text-red-700 w-full dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <i class="fa fa-sign-out"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu (visible on small screens when open) -->
      <div v-if="isMenuOpen" class="md:hidden px-8 py-4 space-y-4 bg-white">
        <!-- User Info and Menu Links -->
        <div class="text-center shadow-lg w-full">
          <div class="flex flex-col items-center space-x-2">
            <i class="w-8 h-8 rounded-full fa fa-user bg-gray-800 p-2 text-center"></i>
            <span>{{ userData.firstName }} {{ userData.lastName }}</span>
          </div>
          <div class="mt-4 space-y-2">
            <p class="block text-gray-900 hover:bg-green-500 px-4 py-2 rounded">{{ userData.email }}</p>
            <p class="text-green-500 text-lg dark:text-green-400">{{ userData.role }}</p>
            <button @click="logout"
              class="block px-4 py-2 text-red-700 w-full dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <i class="fa fa-sign-out"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] dark:bg-[#1e293b] group/design-root overflow-x-hidden"
      style='font-family: "Work Sans", "Noto Sans", sans-serif;'>
      <div class="layout-container flex h-full grow flex-col">
        <div class="px-4 sm:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div class="flex flex-col max-w-[960px] flex-1">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.router-link-active {
  font-weight: bold;
  color: orange;
}
</style>
