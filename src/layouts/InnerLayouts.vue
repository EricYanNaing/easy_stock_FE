<template>
    <div class="app-wrapper">
      <NavBar :isSidebarOpen="isSidebarOpen" @toggleMenu="toggleMenu" />
      <SideBar :isSidebarOpen="isSidebarOpen" @toggleMenu="toggleMenu" />
      <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';

const isSidebarOpen = ref(false);
const toggleMenu = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>