<script setup>
import { ref, provide, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import Loading from './components/Loading.vue';
import { useAuthStore } from "./store/auth";
import { storeToRefs } from "pinia";
const userStore = useAuthStore();
const { user } = storeToRefs(userStore);
const isAdmin = user.value?.roles?.includes('admin')
const isModerator = user.value?.roles?.includes('moderator')
const isUser = user.value?.roles?.includes('user')

if(isAdmin){
    localStorage.setItem('role','ADMIN')
}else if(isModerator){
    localStorage.setItem('role','MODERATOR')
}else{
if(isUser) localStorage.setItem('role','USER')
}

const router = useRouter();
const isLoading = ref(true);
provide('isLoading', isLoading);

router.beforeEach((to, from, next) => {
    isLoading.value = true;
    next();
});

router.afterEach(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 300);
});
console.log("VITE_BASE_URL from env:", import.meta.env.VITE_BASE_URL);
</script>

<template>
    <loading />
    <router-view />
</template>

<style scoped>

</style>
