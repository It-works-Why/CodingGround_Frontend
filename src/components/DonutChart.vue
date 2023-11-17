<!-- DonutChart.vue -->
<template>
    <Doughnut :data="chartData" :options="chartOptions"></Doughnut>
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import { Chart as customChart, ArcElement, Tooltip, Legend } from 'chart.js'
customChart.register(ArcElement, Tooltip, Legend)
export default {
  name: "DoughnutChartView",
  components: {Doughnut},
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
  },
};
</script>
