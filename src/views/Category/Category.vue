<template>
  <section class="p-10 xl:p-20 category-wrapper">
    <div class="flex items-center justify-between gap-4 mb-10">
      <h1 class="text-xl font-bold mb-5">Category Management</h1>
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary text-white bg-primary flex items-center gap-2"
        @click="showAddModal = true"
      >
        <i class="pi pi-plus-circle"></i>
        Add New Category
      </button>
    </div>
    <div class="card">
      <DataTable
        v-model:filters="filters"
        :value="newCategories"
        paginator
        :rows="5"
        tableStyle="min-width: 50rem"
        filterDisplay="menu"
        :loading="loading"
        :globalFilterFields="['name']"
      >
        <template #header>
          <div class="flex justify-between">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              outlined
              @click="clearFilter()"
            />
            <IconField>
              <InputIcon>
                <i class="pi pi-search absolute top-3 left-3" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                placeholder="Keyword Search"
              />
            </IconField>
          </div>
        </template>
        <template #empty> No category found. </template>
        <template #loading> Loading category data. Please wait. </template>
        <Column
          field="name"
          filterField="name"
          header="Name"
          sortable
        ></Column>
        <Column header="Action" >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <Button
                type="button"
                severity="info"
                variant="text"
                raised
                rounded
                icon="pi pi-pen-to-square"
                @click="editModalHandler(data)"
              />
              <Button
                type="button"
                variant="text"
                raised
                rounded
                severity="danger"
                icon="pi pi-trash"
                @click="deleteModalHandler(data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </section>

  <!-- Add Modal -->
  <Dialog
    v-model:visible="showAddModal"
    modal
    header="Add"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Add category information.</span
    >
    <div class="flex items-start gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name</label>
      <div class="flex flex-col flex-auto">
        <InputText
          id="name"
          class="flex-auto"
          v-model="categoryData.name"
          autocomplete="off"
        />
        <p v-if="errors.name" class="text-sm text-red-600 mt-1 inline-block">
          {{ errors.name }}
        </p>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary text-primary"
        @click="showAddModal = false"
      >
        Cancel
      </button>
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary bg-primary text-white"
        @click="addCategory"
      >
        Save
      </button>
    </div>
  </Dialog>

  <!-- Edit Modal -->
  <Dialog
    v-model:visible="showEditModal"
    modal
    header="Edit"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Update category information.</span
    >
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name</label>
      <div class="flex flex-col flex-auto">
        <InputText
          id="name"
          class="flex-auto"
          v-model="categoryData.name"
          autocomplete="off"
        />
        <p v-if="errors.name" class="text-sm text-red-600 mt-1 inline-block">
          {{ errors.name }}
        </p>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary text-primary"
        @click="showEditModal = false"
      >
        Cancel
      </button>
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary bg-primary text-white"
        @click="updateCategory"
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
      >Are you sure to delete category information ?</span
    >

    <div class="flex justify-end gap-2">
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary text-primary"
        @click="showDeleteModal = false"
      >
        Cancel
      </button>
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-red-400 bg-red-500 text-white"
        @click="deleteCategory"
      >
        Delete
      </button>
    </div>
  </Dialog>
  <Toast />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { DummyData } from "../../utils/dummy";
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import { Dialog } from "primevue";
import { useToast } from "primevue";
import Toast from "primevue/toast";
import { showToast } from "../../utils/toast";
import DatePicker from "primevue/datepicker";
import dayjs from "dayjs";
import {
  categoryFormRules,
  categoryFormValidator,
} from "../../utils/categoryFormValidator";

import {
  getCategory,
  crateCategory,
  deleteCategoryInfo,
  updateCategoryInfo,
} from "../../api/category";

onMounted(() => {
  loading.value = false;
});

const toast = useToast();
const filters = ref();
const category = ref();
const loading = ref(true);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showAddModal = ref(false);

const categoryData = ref({
  name: "",
});

const { errors, validate, reset } =
  categoryFormValidator(categoryData, categoryFormRules);

const editModalHandler = (data) => {
  showEditModal.value = true;
  categoryData.value = data;
};

const updateCategory = async () => {
  try {
    if (validate()) {
      const response = await updateCategoryInfo(
      categoryData.value._id,
      categoryData.value
    );
    if (response) {
      showToast(toast, "success", "Success", "Category Updated");
      fetchCategories();
      reset();
      showEditModal.value = false;
    }} else {
      console.log("Validation failed", showEditModal.value);
      console.log(errors);
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    showToast(toast, "error", "Error", "Failed to delete category");
  }
  categoryData.value = {
      name: "",
      email: "",
      phone: "",
      count: "",
      date: new Date(),
    };
};

const deleteModalHandler = (data) => {
  showDeleteModal.value = true;
  categoryData.value = data;
  categoryData.value.date = dayjs(data.date).format("DD MMM YYYY");
};

const deleteCategory = async () => {
  showDeleteModal.value = false;
  try {
    const response = await deleteCategoryInfo(categoryData.value._id);
    if (response) {
      showToast(toast, "success", "Success", "Category Deleted");
      fetchCategories();
    }
  } catch (error) {
    console.error("Error deleting Category:", error);
    showToast(toast, "error", "Error", "Failed to delete Category");
  }
};

const addCategory = async () => {
  const category = {
    name: categoryData.value.name,
  };
  try {
    if (validate()) {
      const response = await crateCategory(category);
      if (response) {
        categoryData.value = response;
        showToast(toast, "success", "Success", "Category Added");
        fetchCategories();
        showAddModal.value = false;
        reset();

      } else {
        console.log(response);
      }
    } else {
      console.log("Validation failed", showAddModal.value);
      console.log(errors);
    }
  } catch (error) {
    console.log(error);
  } finally {
    reset();
  }
  categoryData.value = {
      name: "",
    };
};

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    }
  };
};

initFilters();

const clearFilter = () => {
  initFilters();
};

const fetchCategories = async () => {
  loading.value = true;
  try {
    const response = await getCategory();
    if (response) {
      category.value = response.data;
      console.log(category.value);
    }
  } catch (error) {
    showToast(toast, "error", "Error", "Failed to fetch category");
  } finally {
    loading.value = false;
  }
};
const role = ref()
onMounted(async () => {
  role.value = localStorage.getItem('role')
  await fetchCategories();
  newCategories.value = category.value;
});

const newCategories = computed(() => category.value);
</script>
