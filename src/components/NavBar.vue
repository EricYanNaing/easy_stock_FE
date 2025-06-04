<template>
  <section class="p-4 flex justify-between items-center bg-white shadow-md">
    <router-link to="/" class="flex items-center gap-2">
      <img :src="logo" alt="logo" width="30" class="cursor-pointer" />
      <h1 class="cursor-pointer logo-text text-xl text-primary">Easy Stock Admin</h1>
    </router-link>
    <button type="button" @click="toggleMenu"><span class="material-icons">
menu
</span></button>
  </section>
</template>

<script setup>
import logo from "../../src/assets/images/ready-stock.png";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

defineProps(['isSidebarOpen']);
const emit = defineEmits(['toggleMenu']);

const toggleMenu = () => {
  emit('toggleMenu');
};

// watch(() => isOpen.value, (newValue) => {
//   if (newValue) {
//     document.body.style.overflow = "hidden";
//   } else {
//     document.body.style.overflow = "auto";
//   }
// });

// watch(() => route.path, () => {
//   isOpen.value = false;
// })

</script>

<style lang="scss" scoped>

.toggleBtn{
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  line-height: 1 !important;
}


</style>
