<template>
    <div class="flex justify-center flex-col items-center">
        <h5 class="text-2xl font-bold">No Data Yet.</h5>
        <img :src="emptyData" alt="emptyData" class="w-80">
    </div>
</template>

<script setup>
import emptyData from '../assets/images/empty_web.svg'

</script>