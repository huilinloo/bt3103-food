<template>
  <div id="counter">
    <button type="button" v-on:click="decrement">-</button>
    {{counter}}
    <button type="button" v-on:click="increment">+</button>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    increment: function() {
      if (this.counter < 10) {
        this.counter++;
        this.$emit("counter", this.item, this.counter);
      } else {
        alert("You cannot buy more than 10 items.");
      }
    },
    decrement: function() {
      if (this.counter > 0) {
        this.counter--;
        this.$emit("counter", this.item, this.counter);
      }
    }
  }
};
</script>
<style scoped>
#counter {
  font-size: 30px;
}
button {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: pink;
  border: black;
  color: black;
  font-size: 30px;
  border-radius: 5px 5px;
  padding: 15px 20px;
}
</style>