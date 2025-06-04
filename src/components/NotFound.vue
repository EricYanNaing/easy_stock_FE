<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl font-bold mb-4 text-primary">404 - Page Not Found</h1>
        <img :src="notFound" alt="notFound">
    </div>
</template>

<script setup>
import notFound from '../assets/images/not_found.svg'

</script>