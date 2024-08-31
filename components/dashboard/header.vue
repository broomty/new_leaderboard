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

//function to logout
const logout = () => {
  tokenCookie.value = null;
  navigateTo('/auth/login');
}
//function to toggle colorMode
// const toggleColorMode = () => {
//   if (colorMode.preference === 'system') {
//     if (colorMode.value === 'dark') {
//       colorMode.preference = 'light';
//     } else {
//       colorMode.preference = 'dark';
//     }
//   } else {
//     colorMode.preference = 'system'
//   }
// }
</script>

<template>
  <div class="w-full bg-[#265E3C]">
    <div class=" p-3 2xl:p-4 px-8 flex justify-between items-center mx-auto max-w-7xl">
      <!-- Logo or Title -->
      <h1 class="text-white text-lg md:text-2xl  font-bold">Kf-LeaderBoard</h1>

      <!-- kijani logo (hidden on small screens) -->
      <img src="/kijaniforestry-white.png" class="h-8 2xl:h-12 hidden md:block" alt="">

      <!-- Hamburger Menu (visible on small screens) -->
      <button @click="toggleMenu" class="text-white md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5" />
        </svg>
      </button>

      <!-- Desktop Menu (hidden on small screens) -->
      <div class="hidden md:flex items-center space-x-6">
        <!-- <button @click="toggleColorMode" class="text-white font-bold text-lg 2xl:text-2xl">
          <span v-if="colorMode.value == 'dark'" class="flex items-center gap-4">
            <i class="fa fa-sun-o"></i>
          </span>
          <span v-else class="flex items-center gap-4 ">
            <i class="fa fa-moon-o"></i>
          </span>
        </button> -->

        <!-- User Info Dropdown -->
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
            class="absolute hidden group-hover:block right-0 mt-0 2xl:mt-1 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-20 text-sm 2xl:text-md dark:border">

            <!-- User details section -->
            <div class="px-4 py-2 text-gray-700 dark:text-gray-300">
              <p class="font-semibold text-lg 2xl:text-xl">{{ userData.firstName }} {{ userData.lastName}}</p>
              <p class="text-gray-700 dark:text-gray-400">{{ userData.email }}</p>
              <p class="text-green-500 text-lg dark:text-green-400">{{ userData.role }}</p>
            </div>
            <hr>
            <!-- Logout button -->
            <button @click="logout"
              class="block px-4 py-2 text-red-700 w-full dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700"><i class="fa fa-sign-out"></i> Logout</button>
          </div>

        </div>
      </div>
    </div>

    <!-- Mobile Menu (visible on small screens when open) -->
    <div v-if="isMenuOpen" class="md:hidden px-8 py-4 space-y-4 bg-green-600">
      <!-- <button @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'"
        class="text-white font-bold text-xl">
        <span v-if="colorMode.preference === 'dark'" class="flex items-center gap-4">
          <i class="fa fa-sun-o"></i> Light Mode
        </span>
        <span v-else class="flex items-center gap-4 text-black">
          <i class="fa fa-moon-o"></i> Dark Mode
        </span>
      </button> -->

      <!-- User Info and Menu Links -->
      <div>
        <div class="flex items-center space-x-2 text-white">
          <i class="w-8 h-8 rounded-full fa fa-user bg-gray-800 p-2 text-center"></i>
          <span>John Doe</span>
        </div>
        <div class="mt-4 space-y-2">
          <button href="#" class="block text-gray-200 hover:bg-green-500 px-4 py-2 rounded">Parish Coordinator</button>
          <button @click="logout" class="block text-gray-200 hover:bg-green-500 px-4 py-2 rounded">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>
