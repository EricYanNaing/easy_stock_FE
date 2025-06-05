<template>
  <section class="p-10 xl:p-20 booking-wrapper">
    <div class="flex items-center justify-between gap-4 mb-10">
      <h1 class="xl:text-xl font-bold mb-5">Stocks Management</h1>
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary text-white bg-primary flex items-center gap-2"
        @click="addmodalHandler"
      >
        <i class="pi pi-plus-circle"></i>
        <span class="hidden xl:block" >Add New Item</span>
      </button>
    </div>
    <div class="card">
      <DataTable
        v-model:filters="filters"
        :value="newItems"
        paginator
        :rows="5"
        tableStyle="min-width: 50rem"
        filterDisplay="item"
        :loading="loading"
        :globalFilterFields="['name', 'amount', 'unit', 'category']"
      >
        <template #header>
          <div class="flex flex-col xl:flex-row gap-3 justify-between">
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
        <template #empty> No items found. </template>
        <template #loading> Loading items data. Please wait. </template>
        <Column
          field="name"
          filterField="name"
          header="Name"
          sortable
          style="width: 15%"
        ></Column>
        <Column
          field="amount"
          filterField="amount"
          header="Amount"
        >
        </Column>

        <Column
          field="unit"
          filterField="unit"
          header="Unit"
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              {{ data.unit.name }}
            </div>
          </template></Column
        >
        <Column
          field="category"
          filterField="category"
          header="Category"
        >
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              {{ data.category.name }}
            </div>
          </template>
        </Column>
        <Column
          field="image"
          filterField="image"
          header="Image"
          style="width: 15%"
        >
        <template #body="{ data }">
            <img :src="data.image || stockImage" alt="image" width="55" class="bg-muted p-2 rounded-full">
          </template>
        </Column>
        <Column
          header="Last Modify Date"
        >
        <template #body="{ data }">{{ dayjs(data.updatedAt).format("ddd, DD MMM YYYY") }}</template>
        </Column>
        <Column header="Action" style="min-width: 12rem">
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
      >Add item information.</span
    >
    <div class="flex items-start gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name</label>
      <div class="flex flex-col flex-auto">
        <InputText
          id="name"
          class="flex-auto"
          v-model="itemData.name"
          autocomplete="off"
        />
        <p v-if="errors.name" class="text-sm text-red-600 mt-1 inline-block">
          {{ errors.name }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="amount" class="font-semibold w-24">Amount</label>
      <div class="flex flex-col flex-auto">
        <InputText
          id="amount"
          class="flex-auto"
          v-model="itemData.amount"
          autocomplete="off"
        />
        <p v-if="errors.amount" class="text-sm text-red-600 mt-1">
          {{ errors.amount }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="unit" class="font-semibold w-24">Unit</label>
      <div class="flex flex-col flex-auto">
        <Select
          v-model="itemData.unit"
          :options="units"
          optionLabel="Unit"
          placeholder="Select a unit"
          class="w-full"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
          <template #dropdownicon>
            <i class="pi pi-angle-down" />
          </template>
        </Select>
        <p v-if="errors.unit" class="text-sm text-red-600 mt-1">
          {{ errors.unit }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="category" class="font-semibold w-24">Category</label>
      <div class="flex flex-col flex-auto">
        <Select
          v-model="itemData.category"
          :options="categories"
          optionLabel="Unit"
          placeholder="Select a category"
          class="w-full"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
          <template #dropdownicon>
            <i class="pi pi-angle-down" />
          </template>
        </Select>
        <p v-if="errors.category" class="text-sm text-red-600 mt-1">
          {{ errors.category }}
        </p>
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
            chooseLabel="Upload Item Image"
            class="w-full"
          />
          <Button
            :disabled="!itemData.image"
            type="button"
            variant="text"
            raised
            severity="danger"
            icon="pi pi-trash"
            @click="itemData.image = ''"
          />
        </div>
        <img
          v-if="itemData.image"
          :src="itemData.image"
          alt="enuData.image"
          class="shadow-md rounded-xl w-full sm:w-64 my-3"
        />
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
        @click="addItem"
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
      >Update booking information.</span
    >
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name</label>
      <div class="flex flex-col flex-auto">
        <InputText
          id="name"
          class="flex-auto"
          v-model="itemData.name"
          autocomplete="off"
        />
        <p v-if="errors.name" class="text-sm text-red-600 mt-1 inline-block">
          {{ errors.name }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24">Amount</label>
      <div class="flex flex-col flex-auto">
        <InputText
          id="amount"
          class="flex-auto"
          v-model="itemData.amount"
          autocomplete="off"
        />
        <p v-if="errors.amount" class="text-sm text-red-600 mt-1">
          {{ errors.amount }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="unit" class="font-semibold w-24">Unit</label>
      <div class="flex flex-col flex-auto">
        <Select
          v-model="itemData.unit"
          :options="units"
          optionLabel="Unit"
          placeholder="Select a unit"
          class="w-full"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
          <template #dropdownicon>
            <i class="pi pi-angle-down" />
          </template>
        </Select>
        <p v-if="errors.unit" class="text-sm text-red-600 mt-1">
          {{ errors.unit }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="category" class="font-semibold w-24">Category</label>
      <div class="flex flex-col flex-auto">
        <Select
          v-model="itemData.category"
          :options="categories"
          optionLabel="Unit"
          placeholder="Select a category"
          class="w-full"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
          <template #dropdownicon>
            <i class="pi pi-angle-down" />
          </template>
        </Select>
        <p v-if="errors.category" class="text-sm text-red-600 mt-1">
          {{ errors.category }}
        </p>
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
            chooseLabel="Upload Item Image"
            class="w-full"
          />
          <Button
            :disabled="!itemData.image"
            type="button"
            variant="text"
            raised
            severity="danger"
            icon="pi pi-trash"
            @click="itemData.image = ''"
          />
        </div>
        <img
          v-if="itemData.image"
          :src="itemData.image"
          alt="enuData.image"
          class="shadow-md rounded-xl w-full sm:w-64 my-3"
        />
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
        @click="updateItems"
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
      >Are you sure to delete item information ?</span
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
        @click="deleteItem"
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
import Select from "primevue/select";
import { getUnits } from "../../api/unit";
import { getCategory } from "../../api/category";
import FileUpload from "primevue/fileupload";
import stockImage from '../../../src/assets/images/ready-stock.png'
import {
  itemsFormRules,
  itemsFormValidator,
} from "../../utils/itemFormValidator";

import {
  uploadItemsImage,
  getItems,
  createItem,
  deleteItemsInfo,
  updateItemsInfo,
} from "../../api/items.js";

onMounted(() => {
  loading.value = false;
});

const toast = useToast();
const filters = ref();
const items = ref();
const loading = ref(true);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showAddModal = ref(false);
const units = ref();
const categories = ref();
const isLoading = ref(false);

const itemData = ref({
  name: "",
  amount: "",
  unit: "",
  category: "",
  image: ""
});

const { errors, validate, reset } = itemsFormValidator(
  itemData,
  itemsFormRules
);

const fetchUnits = async () => {
  loading.value = true;
  try {
    const response = await getUnits();
    if (response) {
      units.value = response.data;

      console.log(units.value);
    }
  } catch (error) {
    showToast(toast, "error", "Error", "Failed to fetch unit");
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  loading.value = true;
  try {
    const response = await getCategory();
    if (response) {
      categories.value = response.data;
      console.log(categories.value);
    }
  } catch (error) {
    showToast(toast, "error", "Error", "Failed to fetch category");
  } finally {
    loading.value = false;
  }
};

const addmodalHandler = () => {
  itemData.value = {
    name: "",
    amount: "",
    unit: "",
    category: "",
    image: ""
  };
  showAddModal.value = true
}

const editModalHandler = (data) => {
  showEditModal.value = true;
  itemData.value = data;
};

const updateItems = async () => {
  try {
    if (validate()) {
      const response = await updateItemsInfo(
        itemData.value._id,
        itemData.value
      );
      if (response) {
        showToast(toast, "success", "Success", "Items Updated");
        fetchItems();
        reset();
        showEditModal.value = false;
      }
    } else {
      console.log("Validation failed", showEditModal.value);
      console.log(errors);
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    showToast(toast, "error", "Error", "Failed to delete booking");
  }
  itemData.value = {
    name: "",
    amount: "",
    unit: "",
    category: "",
    image: ""
  };
};

const deleteModalHandler = (data) => {
  showDeleteModal.value = true;
  itemData.value = data;
  itemData.value.date = dayjs(data.date).format("DD MMM YYYY");
};

const deleteItem = async () => {
  showDeleteModal.value = false;
  try {
    const response = await deleteItemsInfo(itemData.value._id);
    if (response) {
      showToast(toast, "success", "Success", "Item Deleted");
      fetchItems();
    }
  } catch (error) {
    console.error("Error deleting Item:", error);
    showToast(toast, "error", "Error", "Failed to delete Item");
  }
};

const addItem = async () => {
  const item = {
    name: itemData.value.name,
    amount: Number(itemData.value.amount),
    unit: itemData.value.unit.id,
    category: itemData.value.category.id,
    image: itemData.value.image
  };
  console.log(item)
  try {
    if (validate()) {
      const response = await createItem(item);
      if (response) {
        itemData.value = response;
        showToast(toast, "success", "Success", "Item Added");
        fetchItems();
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
  itemData.value = {
    name: "",
    amount: "",
    unit: "",
    category: "",
    image: ""
  };
};

const onUpload = async (event) => {
  isLoading.value = true;
  try {
    const file = event.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadItemsImage(formData);
      if (response) {
        itemData.value.image = response.data.imageUrl;
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

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    phone: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  };
};

initFilters();

const clearFilter = () => {
  initFilters();
};

const fetchItems = async () => {
  loading.value = true;
  try {
    const response = await getItems();
    if (response) {
      items.value = response.data;
      console.log(items.value);
    }
  } catch (error) {
    showToast(toast, "error", "Error", "Failed to fetch items");
  } finally {
    loading.value = false;
  }
};
const role = ref();
onMounted(async () => {
  role.value = localStorage.getItem("role");
  await fetchItems();
  await fetchUnits();
  await fetchCategories();
  newItems.value = items.value;
});

const newItems = computed(() => items.value);
</script>
