<template>
  <section class="p-10 xl:p-20 unit-wrapper">
    <div class="flex items-center justify-between gap-4 mb-10">
      <h1 class="xl:text-xl font-bold mb-5">Unit Management</h1>
      <button
        type="button"
        class="border-2 p-2 rounded-lg border-primary text-white bg-primary flex items-center gap-2"
        @click="showAddModal = true"
      >
        <i class="pi pi-plus-circle"></i>
        <span class="hidden xl:block" >Add New Unit</span>
      </button>
    </div>
    <div class="card">
      <DataTable
        v-model:filters="filters"
        :value="newUnit"
        paginator
        :rows="5"
        tableStyle="min-width: 50rem"
        filterDisplay="menu"
        :loading="loading"
        :globalFilterFields="['name']"
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
        <template #empty> No unit found. </template>
        <template #loading> Loading unit data. Please wait. </template>
        <Column
          field="name"
          filterField="name"
          header="Name"
          sortable
        ></Column>
        <Column
          header="Last Modify Date"
        >
        <template #body="{ data }">{{ dayjs(data.updatedAt).format("ddd, DD MMM YYYY") }}</template>
        </Column>
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
      >Add Unit information.</span
    >
    <div class="flex items-start gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name</label>
      <div class="flex flex-col flex-auto">
        <InputText
          id="name"
          class="flex-auto"
          v-model="unitData.name"
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
        @click="addUnit"
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
      >Update unit information.</span
    >
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Name</label>
      <div class="flex flex-col flex-auto">
        <InputText
          id="name"
          class="flex-auto"
          v-model="unitData.name"
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
        @click="updateUnit"
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
      >Are you sure to delete unit information ?</span
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
        @click="deleteUnit"
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
  getUnits,
  createUnit,
  deleteUnitInfo,
  updateUnitInfo,
} from "../../api/unit";

onMounted(() => {
  loading.value = false;
});

const toast = useToast();
const filters = ref();
const unit = ref();
const loading = ref(true);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showAddModal = ref(false);

const unitData = ref({
  name: "",
});

const { errors, validate, reset } =
  categoryFormValidator(unitData, categoryFormRules);

const editModalHandler = (data) => {
  showEditModal.value = true;
  unitData.value = data;
};

const updateUnit = async () => {
  try {
    if (validate()) {
      const response = await updateUnitInfo(
      unitData.value._id,
      unitData.value
    );
    if (response) {
      showToast(toast, "success", "Success", "Unit Updated");
      fetchUnits();
      reset();
      showEditModal.value = false;
    }} else {
      console.log("Validation failed", showEditModal.value);
      console.log(errors);
    }
  } catch (error) {
    console.error("Error deleting Unit:", error);
    showToast(toast, "error", "Error", "Failed to delete Unit");
  }
  unitData.value = {
      name: "",
    };
};

const deleteModalHandler = (data) => {
  showDeleteModal.value = true;
  unitData.value = data;
  unitData.value.date = dayjs(data.date).format("DD MMM YYYY");
};

const deleteUnit = async () => {
  showDeleteModal.value = false;
  try {
    const response = await deleteUnitInfo(unitData.value._id);
    if (response) {
      showToast(toast, "success", "Success", "Unit Deleted");
      fetchUnits();
    }
  } catch (error) {
    console.error("Error deleting Unit:", error);
    showToast(toast, "error", "Error", "Failed to delete Unit");
  }
};

const addUnit = async () => {
  const unit = {
    name: unitData.value.name,
  };
  try {
    if (validate()) {
      const response = await createUnit(unit);
      if (response) {
        unitData.value = response;
        showToast(toast, "success", "Success", "Unit Added");
        fetchUnits();
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
  unitData.value = {
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

const fetchUnits = async () => {
  loading.value = true;
  try {
    const response = await getUnits();
    if (response) {
      unit.value = response.data;
      console.log(unit.value);
    }
  } catch (error) {
    showToast(toast, "error", "Error", "Failed to fetch unit");
  } finally {
    loading.value = false;
  }
};
const role = ref()
onMounted(async () => {
  role.value = localStorage.getItem('role')
  await fetchUnits();
  newUnit.value = unit.value;
});

const newUnit = computed(() => unit.value);
</script>
