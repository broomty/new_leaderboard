<script setup>
const store = useCounterStore();
const colors = useModeStore()
const colorMode = useColorMode();
colorMode.preference = 'system';

useSeoMeta({
  title: 'Login - Kijani leaderboard',
  description: 'Login with your email to view parish Performance',
  ogTitle: 'Login - Kijani leaderboard',
  ogDescription: 'Login with your email to view parish Performance',
})

const serverUrl = 'https://leaderboard-auth.vercel.app';
//const serverUrl =  process.env.API_SERVER_URL ||'http://localhost:5000';

const verifying = ref(false);

const errMsg = ref('');
const email = ref('');

const login = async () => {
  console.log(colors.colorMode);
  
  // Validate email
  const validEmail = validateEmail(email.value);
  if (email.value === '' || !validEmail) {
    errMsg.value = 'Please enter a valid email address';
    return;
  }

  verifying.value = true;
  try {
    const response = await fetch(`${serverUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const tokenCookie = useCookie('token');
      tokenCookie.value = data.token;
      //simulate a delay to show the loading spinner
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Wait for the cookie to be set and then fetch data
      await store.fetchData();

      // Navigate to dashboard
      navigateTo('/');
    } else {
      errMsg.value = 'Invalid Credentials';
    }
  } catch (error) {
    console.log(error);
    errMsg.value = 'An error occurred during login';
  } finally {
    verifying.value = false;
  }
};


//function to validate email with regex
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//function to toggle colorMode
const toggleColorMode = () => {
  if (colorMode.preference === 'system') {
    if(colorMode.value === 'dark') {
      colorMode.preference = 'light';
    } else {
      colorMode.preference = 'dark';
    }
  } else {
    colorMode.preference = 'system'
  }
}


</script>

<template>
  <div class="flex justify-end p-8 px-12 absolute right-0 top-0 w-full">
    <button @click="toggleColorMode"
      class="text-white font-bold dark:bg-gray-800 p-3 px-6 rounded-2xl hover:bg-gray-200 dark-hover:bg-gray-100 transition-colors duration-300 ease-in-out">
      <span v-if="colorMode.value === 'dark'" class="flex items-center gap-4">
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
    <div v-if="errMsg != ''" class="border border-red-500 p-4 m-2 w-96 rounded-lg bg-white dark:bg-gray-800">
      <p class="text-red-500">{{ errMsg }}</p>
    </div>
    <div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
      <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white text-center">Login</h2>
      <form action="#" method="POST" @submit.prevent>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" v-model="email"
            class="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Enter your email" required />
        </div>
        <button type="button" @click="login"
          class="w-full bg-green-500 dark:bg-green-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-600 dark:hover:bg-green-700 transition duration-200">
          {{ verifying ? 'verifying..... ':'Login' }} <i class="fa fa-gear animate-spin" v-if="verifying"></i>
        </button>
      </form>
    </div>
  </div>
</template>
