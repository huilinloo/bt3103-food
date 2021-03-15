<template>
  <div>
    <ul>
      <li>
        <router-link to="/" exact>Home</router-link>
      </li>
      <li>
        <router-link to="/orders" exact>Orders</router-link>
      </li>
      <li>
        <router-link to="/dashboard" exact>Dashboard</router-link>
      </li>
    </ul>
    <Barchart></Barchart>
    <Linechart></Linechart>
  </div>
</template>
<script>
import barchart from "./charts/BarChart.vue";
import linechart from "./charts/CallAPI.vue";
export default {
  name: "app",
  components: {
    Barchart: barchart,
    Linechart: linechart
  }
};
</script>
<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>