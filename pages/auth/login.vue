<script setup>
const colorMode = useColorMode();
colorMode.preference = 'system';

console.log(colorMode.value);
</script>

<template>
  <div class="flex justify-end p-8 px-12 absolute right-0 top-0 w-full">
    <button @click="colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'"
      class="text-white font-bold">
      <span v-if="colorMode.preference === 'dark'" class="flex items-center gap-4">
        <i class="fa fa-sun-o text-xl"></i>
        <span>Light Mode</span>
        
      </span>
      <span v-else class="flex items-center gap-4 text-black">
        <i class="fa fa-moon-o text-xl"></i>
        <span>Dark Mode</span>
      </span>
    </button>
  </div>


  <div class="bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
    <!-- logo -->
    <div class="flex flex-col items-center justify-center mb-12">
      <img v-if="colorMode.value === 'dark'" src="/kijaniforestry-white.png" class="h-12 mb-6" alt="">
      <img v-else src="/kijani-logo-name.png" alt="Logo" class="h-12 mb-6" />
      <h1 class="text-xl text-green-500 mt-2 dark:text-green-400">Performance LeaderBoard</h1>
    </div>
    <div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
      <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white text-center">Login</h2>
      <form action="#" method="POST">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
          <input type="email" id="email" name="email"
            class="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Enter your email" required />
        </div>
        <button type="submit"
          class="w-full bg-green-500 dark:bg-green-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-600 dark:hover:bg-green-700 transition duration-200">
          Login
        </button>
      </form>
    </div>
  </div>
</template>
