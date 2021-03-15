<template>
  <div>
    Menu:
    <ul>
      <li v-for="item in itemsSelected" :key="item[0]">{{item[0]}} x {{item[1]}}</li>
    </ul>
    <button type="button" v-on:click="findTotal(); sendOrder();">Add Order</button>
    <div v-show="show">Subtotal: ${{ subTotal }}</div>
    <div v-show="show">Grand Total: ${{ grandTotal }}</div>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  props: {
    itemsSelected: {
      type: Array
    }
  },
  data() {
    return {
      subTotal: 0,
      show: false
    };
  },
  methods: {
    findTotal: function() {
      var sum = 0;
      for (let i = 0; i < this.itemsSelected.length; i++) {
        sum += this.itemsSelected[i][2] * this.itemsSelected[i][1];
      }
      this.subTotal = sum;
      this.show = true;
    },
    sendOrder: function() {
      var order = {};
      for (let i = 0; i < this.itemsSelected.length; i++) {
        var curr = this.itemsSelected[i];
        order[curr[0]] = curr[1];
      }
      var dishes = [
        "Prawn omelette",
        "Dry Beef Hor Fun",
        "Sambal KangKung",
        "Pork Fried Rice",
        "Mapo Tofu",
        "Cereal Prawn"
      ];
      for (let i = 0; i < dishes.length; i++) {
        if (!(dishes[i] in order)) {
          var empty = dishes[i];
          order[empty] = 0;
        }
      }
      database
        .collection("orders")
        .add(order)
        .then(() => location.reload());
    }
  },
  computed: {
    grandTotal: function() {
      return (this.subTotal * 1.07).toFixed(2);
    }
  }
};
</script>
<style scoped>
li,
div {
  font-size: 30px;
  padding: 5px;
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