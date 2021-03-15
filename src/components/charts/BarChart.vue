<template>
  <div id="chart">
    <h1>Bar Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
  components: {
    chart: Chart
  }
};
</script>
<style scoped>
h1 {
  background: green;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  height: 50px;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: black;
}
</style>