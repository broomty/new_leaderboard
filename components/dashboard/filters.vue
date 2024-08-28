<script setup>
const store = useCounterStore()
</script>
<template>
<h1 class="text-red-500 text-7xl">{{ store.count }}</h1>
</template>