
<script setup>

</script>

<template>
    <div class="bg-gray-100 flex items-center justify-center h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
            <form action="#" method="POST">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
                    <input type="email" id="email" name="email" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" required>
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
                    <input type="password" id="password" name="password" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" required>
                </div>
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <input type="checkbox" id="remember_me" name="remember_me" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="remember_me" class="ml-2 text-gray-700">Remember me</label>
                    </div>
                    <a href="#" class="text-sm text-blue-500 hover:underline">Forgot password?</a>
                </div>
                <button type="submit" class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">Login</button>
            </form>
            <p class="mt-6 text-center text-gray-600">Don't have an account? <a href="#" class="text-blue-500 hover:underline">Sign up</a></p>
        </div>
    </div>
</template>



