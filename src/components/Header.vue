<template>
  <div>
    <header>
      <h1>{{ msg }}</h1>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Delicious Food"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  background: gold;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  height: 95px;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
h1 {
  color: black;
}
</style>