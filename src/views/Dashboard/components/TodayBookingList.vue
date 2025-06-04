
<template>
    <div class="card">
        <DataTable :value="products" sortMode="multiple" tableStyle="min-width: 50rem">
            <Column field="name" header="Name" sortable style="width: 25%"></Column>
            <Column field="phoneNumber" header="Phone" style="width: 25%"></Column>
            <Column field="email" header="Email" style="width: 25%"></Column>
            <Column field="date" header="Date" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { DummyData } from '../../../utils/dummy';

onMounted(() => {
    products.value = DummyData
});

const products = ref();

</script>
