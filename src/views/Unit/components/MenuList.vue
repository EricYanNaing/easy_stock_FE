<template>
  <h2 class="text-2xl font-bold mb-4">
    Menu List -
    {{
      (tab === "0" && "Main Dish") ||
      (tab === "1" && "Starter") ||
      (tab === "2" && "Dessert") ||
      (tab === "3" && "Drinks")
    }}
  </h2>
  <div class="m-0" v-if="tab === '0'">
    <div class="card" v-if="fetchMenulist[0]?.menu.length !== 0">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div
          class="p-3 card-item"
          v-for="(menu, index) in fetchMenulist[0]?.menu"
          :key="index"
        >
          <div class="flex items-center justify-between">
            <p class="font-bold">{{ menu.name }}</p>
            <div class="flex justify-between items-center gap-2" v-if="role === 'ADMIN'">
              <Button
                type="button"
                severity="info"
                variant="text"
                raised
                rounded
                icon="pi pi-pen-to-square"
                @click="editModalHandler(menu,'0')"
              />
              <Button
                type="button"
                variant="text"
                raised
                rounded
                severity="danger"
                icon="pi pi-trash"
                @click="deleteModalHandler(menu)"
              />
            </div>
          </div>
          <p class="text-primary font-bold text-lg">$ {{ menu.price - 0.01 }}</p>
          <p class="text-sm my-3">{{ menu.description }}</p>
          <img
            :src="menu.image"
            :lt="menu.name"
            width="120"
            class="rounded-full mb-3"
          />
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <EmptyPage />
    </div>
  </div>
  <div class="m-0" v-else-if="tab === '1'">
    <div class="card" v-if="fetchMenulist[1]?.menu.length !== 0">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div
          class="p-3 card-item"
          v-for="(menu, index) in fetchMenulist[1]?.menu"
          :key="index"
        >
          <div class="flex items-center justify-between">
            <p class="font-bold">{{ menu.name }}</p>
            <div class="flex justify-between items-center gap-2" v-if="role === 'ADMIN'">
              <Button
                type="button"
                severity="info"
                variant="text"
                raised
                rounded
                icon="pi pi-pen-to-square"
                @click="editModalHandler(menu,'1')"
              />
              <Button
                type="button"
                variant="text"
                raised
                rounded
                severity="danger"
                icon="pi pi-trash"
                @click="deleteModalHandler(menu)"
              />
            </div>
          </div>
          <p class="text-primary font-bold text-lg">$ {{ menu.price - 0.01 }}</p>
          <p class="text-sm my-3">{{ menu.description }}</p>
          <img
            :src="menu.image"
            :lt="menu.name"
            width="120"
            class="rounded-full mb-3"
          />
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <EmptyPage />
    </div>
  </div>
  <div class="m-0" v-else-if="tab === '2'">
    <div class="card" v-if="fetchMenulist[2]?.menu.length !== 0">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div
          class="p-3 card-item"
          v-for="(menu, index) in fetchMenulist[2]?.menu"
          :key="index"
        >
          <div class="flex items-center justify-between" v-if="role === 'ADMIN'">
            <p class="font-bold">{{ menu.name }}</p>
            <div class="flex justify-between items-center gap-2">
              <Button
                type="button"
                severity="info"
                variant="text"
                raised
                rounded
                icon="pi pi-pen-to-square"
                @click="editModalHandler(menu,'2')"
              />
              <Button
                type="button"
                variant="text"
                raised
                rounded
                severity="danger"
                icon="pi pi-trash"
                @click="deleteModalHandler(menu)"
              />
            </div>
          </div>
          <p class="text-primary font-bold text-lg">$ {{ menu.price - 0.01 }}</p>
          <p class="text-sm my-3">{{ menu.description }}</p>
          <img
            :src="menu.image"
            :lt="menu.name"
            width="120"
            class="rounded-full mb-3"
          />
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <EmptyPage />
    </div>
  </div>
  <div class="m-0" v-else-if="tab === '3'">
    <div class="card" v-if="fetchMenulist[3]?.menu.length !== 0">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div
          class="p-3 card-item"
          v-for="(menu, index) in fetchMenulist[3]?.menu"
          :key="index"
        >
          <div class="flex items-center justify-between">
            <p class="font-bold">{{ menu.name }}</p>
            <div class="flex justify-between items-center gap-2" v-if="role === 'ADMIN'">
              <Button
                type="button"
                severity="info"
                variant="text"
                raised
                rounded
                icon="pi pi-pen-to-square"
                @click="editModalHandler(menu,'3')"
              />
              <Button
                type="button"
                variant="text"
                raised
                rounded
                severity="danger"
                icon="pi pi-trash"
                @click="deleteModalHandler(menu)"
              />
            </div>
          </div>
          <p class="text-primary font-bold text-lg">$ {{ menu.price - 0.01 }}</p>
          <p class="text-sm my-3">{{ menu.description }}</p>
          <img
            :src="menu.image"
            :lt="menu.name"
            width="120"
            class="rounded-full mb-3"
          />
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <EmptyPage />
    </div>
  </div>

  <!-- Edit Modal -->
  <Dialog
    v-model:visible="showEditModal"
    modal
    header="Edit"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Update Menu information.</span
    >
    <div class="flex items-center gap-4 mb-8">
      <label for="phoneNumber" class="font-semibold w-24">Category</label>
      <div class="flex flex-col flex-auto">
      <Select
        v-model="category"
        :options="categories"
        optionLabel="name"
        placeholder="Select Category"
        class="w-full"
      />
      <span class="text-red-500 text-sm" v-if="category === ''">Select a categoroy</span>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name</label>
      <div class="flex flex-col flex-auto">
      <InputText
        id="name"
        class="flex-auto"
        v-model="menuData.name"
        autocomplete="off"
      />
      <span class="text-red-500 text-sm" v-if="errors.name">{{
          errors.name
        }}</span>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24">Description</label>
      <div class="flex flex-col flex-auto">
      <InputText
        id="email"
        class="flex-auto"
        v-model="menuData.description"
        autocomplete="off"
      />
      <span class="text-red-500 text-sm" v-if="errors.description">{{
          errors.description
        }}</span>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="phoneNumber" class="font-semibold w-24">Price</label>
      <div class="flex flex-col flex-auto">
      <InputText
        id="phoneNumber"
        class="flex-auto"
        v-model="menuData.price"
        autocomplete="off"
      />
      <span class="text-red-500 text-sm" v-if="errors.price">{{
          errors.price
        }}</span>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="quantity" class="font-semibold w-24">Image</label>
      <div class="flex flex-col flex-auto">
        <div class="flex items-center justify-between">
          <FileUpload
            mode="basic"
            name="image"
            :customUpload="true"
            :auto="true"
            accept="image/jpeg,image/jpg,image/png"
            :maxFileSize="1000000"
            @uploader="onUpload"
            chooseLabel="Upload Menu Image"
            class="w-full"
          />
          <Button
            :disabled="!menuData.image"
            type="button"
            variant="text"
            raised
            severity="danger"
            icon="pi pi-trash"
            @click="menuData.image = ''"
          />
        </div>
        <img
          v-if="menuData.image"
          :src="menuData.image"
          alt="enuData.image"
          class="shadow-md rounded-xl w-full sm:w-64 my-3"
        />
        <span class="text-red-500 text-sm" v-if="errors.image">{{
          errors.image
        }}</span>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary text-primary"
        @click="showEditModal = false"
        :disabled="isLoading"
      >
        Cancel
      </button>
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary bg-primary text-white"
        @click="updateBooking"
        :disabled="isLoading"
      >
        Save
      </button>
    </div>
  </Dialog>

  <!-- Delete Modal -->
  <Dialog
    v-model:visible="showDeleteModal"
    modal
    header="Delete"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Are you sure to delete menu information ?</span
    >

    <div class="flex justify-end gap-2">
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary text-primary"
        @click="showDeleteModal = false"
        :disabled="isLoading"
      >
        Cancel
      </button>
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-red-400 bg-red-500 text-white"
        @click="deleteBooking"
        :disabled="isLoading"
      >
        Delete
      </button>
    </div>
  </Dialog>
  <Toast />
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import Button from "primevue/button";
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import { Dialog } from "primevue";
import { useToast } from "primevue";
import Toast from "primevue/toast";
import { showToast } from "../../../utils/toast";
import FileUpload from "primevue/fileupload";
import EmptyPage from "../../../components/EmptyPage.vue";

import {
  uploadMenuImage,
  getMenus,
  createMenu,
  updateMenuInfo,
  deleteMenuInfo,
} from "../../../api/menu";
import {
  menuFormRules,
  menuFormValidator,
} from "../../../utils/menuFormValidator";

const menuData = ref({
  name: "",
  description: "",
  price: "",
  image: "",
});

const { errors, validate, reset } = menuFormValidator(menuData, menuFormRules);
const role =ref()

const toast = useToast();
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const isLoading = ref(false);
const category = ref()

const categories = ref([
  { name: "Main Dish", value: "main-dish" },
  { name: "Starter", value: "starter" },
  { name: "Desserts", value: "dessert" },
  { name: "Drinks", value: "drink" },
]);

onMounted(() => {
role.value = localStorage.getItem('role')
  console.log(role.value)
});

const props = defineProps({
  tab: {
    type: String,
    required: true,
  },
  isUpdated: {
    type: Boolean,
  },
  menuList: {
    type: Array,
  }
});

const emit = defineEmits(['updateMenuList'])

const updateMenuListData = () => {
  console.log("Hello updated")
  emit('updateMenuList')
}

const onUpload = async (event) => {
  isLoading.value = true;
  try {
    const file = event.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadMenuImage(formData);
      if (response) {
        menuData.value.image = response.data.imageUrl;
      } else {
        showToast(toast, "error", "Error", "Failed to upload image");
        return;
      }
    }
  } catch (error) {
    console.error("File upload error:", error);
    showToast(toast, "error", "Error", "Failed to upload image");
  } finally {
    reset();
  }
  isLoading.value = false;
};

const editModalHandler = (data,categoryNo) => {
  switch (categoryNo) {
  case '0':
    category.value = categories.value[0];
    break;
  case '1':
    category.value = categories.value[1];
    break;
  case '2':
    category.value = categories.value[2];
    break;
  case '3':
    category.value = categories.value[3];
  default:
    console.warn(`Unknown categoryNo: ${categoryNo}`);
}
  showEditModal.value = true;
  menuData.value = data
};

const updateBooking = async () => {

  isLoading.value = true;

  try {
    if (validate() && menuData.value.image !== '') {
      
      menuData.value.price = Number(menuData.value.price);
      const response = await updateMenuInfo(menuData.value._id, menuData.value);
      if (response) {
        showToast(toast, "success", "Success", "Menu Updated");
        showEditModal.value = false;
        updateMenuListData();
      }
    } else {
      console.log(errors);
    }
  } catch (error) {
    console.error("Error adding menu:", error);
    showToast(toast, "error", "Error", "Failed to add menu");
    return;
  }
  isLoading.value = false;
};

const deleteModalHandler = (data) => {
  showDeleteModal.value = true;
  menuData.value = data
};

const deleteBooking = async () => {
  isLoading.value = true
  try{
    const response = await deleteMenuInfo(menuData.value._id)
    if(response){
    showDeleteModal.value = false;
    showToast(toast, "success", "Success", "Menu Deleted");
    updateMenuListData();
    }
  }catch(error){
    console.log(error)
  }
  isLoading.value = false
  console.log('OLD Data',props.menuList)
  console.log('New Data',fetchMenulist)
};

const fetchMenulist = computed(() => Object.values( props.menuList || {}));
</script>

<style scoped lang="scss">
.card-item {
  background-color: var(--tw-color-white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
}
.card-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
