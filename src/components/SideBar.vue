<template>
  <section
    :class="
      isSidebarOpen
        ? 'wow animate__fadeInLeft left-0 '
        : 'wow animate__fadeOutLeft left-[-100%]'
    "
    class="side-bar-wrapper fixed top-0 w-full max-w-[220px] h-screen bg-background z-[9999] shadow-primary shadow-md transition-all duration-1000 ease-in-out"
  >
    <div class="flex items-center justify-between p-2">
      <div class="flex justify-between items-center gap-2">
        <img src="../assets/ready-stock.png" width="35" alt="logo" />
        <span class="logo-text text-primary">Easy Stock Admin</span>
      </div>
      <button type="button" @click="toggleMenu">
        <span class="material-icons"> menu </span>
      </button>
    </div>
    <hr class="my-5" />
    <div class="menu-wrapper p-2 text-sm">
      <h5>Main Menu</h5>
      <div class="menus">
        <router-link
          to="/"
          :class="['menu', route.path === '/' ? 'menu-active' : '']"
        >
          <div class="indicator"></div>
          <span class="material-icons">warehouse</span>
          <span>Inventory</span>
        </router-link>

        <router-link
          to="/category"
          :class="['menu', route.path === '/category' ? 'menu-active' : '']"
        >
          <div class="indicator"></div>
          <span class="material-icons">category</span>
          <span>Categroy</span>
        </router-link>

        <router-link
          to="/unit"
          :class="['menu', route.path === '/unit' ? 'menu-active' : '']"
        >
          <div class="indicator"></div>
          <span class="material-icons">view_in_ar</span>
          <span>Unit</span>
        </router-link>
        <div class="menu cursor-pointer" @click="logoutModalHandler">
          <div class="indicator"></div>
          <span class="material-icons">settings_power</span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Logout Modal -->
  <Dialog
    v-model:visible="visible"
    modal
    header="Logout"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Are you sure to logout ?</span
    >
    <div class="flex justify-end gap-2">
      <button type="button" class="btn btn-secondary" @click="visible = false">
        Cancel
      </button>
      <button type="button" class="btn btn-primary" @click="logout">
        Logout
      </button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { useRoute } from "vue-router";
const route = useRoute();

const visible = ref(false);
const authStore = useAuthStore();
const router = useRouter();

defineProps(["isSidebarOpen"]);
const emit = defineEmits(["toggleMenu"]);

const toggleMenu = () => {
  emit("toggleMenu");
};

const logoutModalHandler = () => {
  visible.value = true;
  toggleMenu();
}

// LOGOUT FUNC
const logout = () => {
  authStore.logout();
  router.push("/auth");
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  .menus {
    margin: 10px 0;
    .menu {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      transition: ease-in-out 0.5s;
      margin: 10px 0;
      border-radius: 10px;
    }
    .menu:hover {
      background-color: var(--tw-color-accent);
    }
  }
}
</style>
