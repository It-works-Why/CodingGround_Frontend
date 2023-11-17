<!-- DonutChart.vue -->
<template>
  <div>
    <doughnut-chart :data="chartData" :options="chartOptions"></doughnut-chart>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
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
    this.renderChart(this.chartData, this.chartOptions);
  },
};
</script>
