<template>
  <h1 class="text-xl xl:text-3xl mb-5">Weekly Reservation</h1>
  <div class="shadow-md p-5 xl:p-10">
    <Chart
      type="pie"
      :data="circleChartData"
      :options="circleChartOptions"
      class="w-full md:w-[30rem]"
    />
  </div>
</template>

<script setup>
import Chart from "primevue/chart";
import { ref, onMounted } from "vue";

onMounted(() => {
  circleChartData.value = setChartData();
  circleChartOptions.value = setChartOptions();
});

const circleChartData = ref();
const circleChartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [540, 325, 702, 555, 451, 750, 241],
        backgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-400"),
          documentStyle.getPropertyValue("--p-orange-400"),
          documentStyle.getPropertyValue("--p-gray-400"),
          documentStyle.getPropertyValue("--p-red-400"),
          documentStyle.getPropertyValue("--p-blue-400"),
          documentStyle.getPropertyValue("--p-pink-400"),
          documentStyle.getPropertyValue("--p-green-400"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-300"),
          documentStyle.getPropertyValue("--p-orange-300"),
          documentStyle.getPropertyValue("--p-gray-300"),
          documentStyle.getPropertyValue("--p-red-300"),
          documentStyle.getPropertyValue("--p-blue-300"),
          documentStyle.getPropertyValue("--p-pink-300"),
          documentStyle.getPropertyValue("--p-green-300"),
        ],
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-muted-color");

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  };
};
</script>

<style lang="scss" scoped></style>
