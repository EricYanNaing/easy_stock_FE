<template>
  <section class="auth-wrapper">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">{{ isSignUp ? 'Sign Up' : 'Sign In' }}</h2>
    
    <form class="space-y-4" @submit.prevent="submitForm">
      <div v-if="isSignUp">
        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input 
          id="name"
          v-model="name"
          type="text" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          placeholder="your name"
        />
        <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          id="email"
          v-model="email"
          type="email" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          placeholder="your@email.com"
        />
        <p v-if="errors.email" class="text-sm text-red-600 mt-1">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          id="password"
          v-model="password"
          type="password" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          placeholder="••••••••"
        />
        <p v-if="errors.password" class="text-sm text-red-600 mt-1">{{ errors.password }}</p>
      </div>

      <div v-if="isSignUp">
        <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input 
          id="confirmPassword"
          v-model="confirmPassword"
          type="password" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          placeholder="••••••••"
        />
        <p v-if="errors.confirmPassword" class="text-sm text-red-600 mt-1">{{ errors.confirmPassword }}</p>
      </div>

      <div class="flex items-center justify-between" v-if="!isSignUp">
        <label class="flex items-center">
          <input type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary"/>
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <a href="#" class="text-sm text-primary hover:text-primary">Forgot password?</a>
      </div>

      <button type="submit" class="w-full bg-primary hover:bg-primary text-white font-medium py-2.5 rounded-lg transition-colors">
        {{ isSignUp ? 'Sign Up' : 'Sign In' }}
      </button>
    </form>

    <div class="mt-6 text-center text-sm text-gray-600">
      {{ isSignUp ? `Already have an account?` : `Don't have an account?` }}
      <span @click="toggleForm" class="text-primary hover:text-primary font-medium cursor-pointer">{{ !isSignUp ? 'Sign Up' : 'Sign In' }}</span>
    </div>
  </div>
  </section>

  <Toast />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import { authFormRules, authFormValidator } from '../../utils/authFormValidator';
import { showToast } from '../../utils/toast';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

import { login } from '../../api/auth';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const visible = ref(false);
const isSignUp = ref(false);

const userData = ref({
  email: '',
  password: '',
  name: '',
  confirmPassword: ''
});

const onClose = () => {
  visible.value = false;
};

const { email, password, name, confirmPassword, errors, validate, reset } = authFormValidator({
  email: '',
  password: '',
  name: '',
  confirmPassword: ''
},authFormRules);


const toggleForm = () => {
  reset();

  isSignUp.value = !isSignUp.value;
}

// Form submission handler
const submitForm = async () => {

  if(isSignUp.value && validate(isSignUp.value)){
    
  }else if(!isSignUp.value && validate(isSignUp.value)){
    userData.value.email = email.value;
    userData.value.password = password.value;
    // userData.value.token = 'asdf1234'
    const response = await login(userData.value);

    if(response){
      console.log(response)
      userData.value.token = response.token;
      let user = response.data.user
      user.token = response.token
      console.log(user)

      authStore.login(user);
      showToast(toast, 'success', 'Success', `Welcome back ${user.username}`);


    }

    
    router.push({ path: '/' });

  }else {
    // Handle validation errors
    console.log(isSignUp.value);
    console.log(errors);
  }
};

</script>


<style lang="scss" scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
}
</style>
