<template>
  <Chart type="bar" :data="tableChartData" :options="tableChartOptions" />
</template>

<script setup>
import Chart from "primevue/chart";
import { ref, onMounted } from "vue";

onMounted(() => {
  tableChartData.value = settableChartData();
  tableChartOptions.value = settableChartOptions();
});

const tableChartData = ref();
const tableChartOptions = ref();

const settableChartData = () => {
  return {
    labels: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Orders",
        data: [540, 325, 702, 620, 540, 325, 702, 620, 540, 325, 702, 785],
        backgroundColor: ["rgba(249, 115, 22, 0.2)", "rgba(6, 182, 212, 0.2)"],
        borderColor: [
          "rgb(249, 115, 22)",
          "rgb(6, 182, 212)",
          "rgb(107, 114, 128)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
const settableChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-muted-color");

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
  };
};
</script>

<style lang="scss" scoped></style>
