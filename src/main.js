import { createApp } from 'vue'
import './style.scss'
import 'animate.css';
import "primeicons/primeicons.css";
import router from './router'
import App from './App.vue'
import WOW from 'wow.js';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useAuthStore } from './store/auth';

new WOW({
  boxClass: 'wow', // default
  animateClass: 'animate__animated', // default
  offset: 0, // distance to start animation (px)
  mobile: true, // trigger animations on mobile devices
  live: true, // act on asynchronously loaded content
}).init();

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
        darkModeSelector: false || 'none',
    }
    }
});
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.component('VueDatePicker', VueDatePicker);
app.use(router);
app.mount('#app')
const authStore = useAuthStore();
authStore.checkIsAuth();