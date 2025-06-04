<template>
  <div
    v-if="isLoading"
    class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen"
  >
    <div class="flex space-x-2 wow animate-pulse">
      <div class="w-3 h-3 bg-primary rounded-full"></div>
      <div class="w-3 h-3 bg-primary rounded-full"></div>
      <div class="w-3 h-3 bg-primary rounded-full"></div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
const isLoading = inject("isLoading");
</script>
