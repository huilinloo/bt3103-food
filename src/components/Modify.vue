<template>
  <div>
    <ul>
      <li v-for="(quantity, dish,idx) in datapacket" :key="idx">
        {{dish}}: {{quantity}}
        <br />
        <input v-bind:id="idx" placeholder="0" type="number" min="0" />
        <br />
      </li>
    </ul>

    <button v-on:click="updateOrder">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      datapacket: {}
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .doc(this.id)
        .get()
        .then(querySnapShot => {
          this.datapacket = querySnapShot.data();
        });
    },
    updateOrder: function() {
      var updated = {};
      for (var dish in this.datapacket) {
        updated[dish] = dish.value;
      }
      var index = 0;
      for (var name in updated) {
        var curr = document.getElementById(index).value;
        if (curr != "") {
          updated[name] = parseInt(curr);
        } else {
          updated[name] = 0;
        }
        index++;
      }
      database
        .collection("orders")
        .doc(this.id)
        .update(updated)
        .then(this.$router.push("orders"));
    }
  },
  created() {
    this.fetchItems();
  }
};
</script>
<style scoped>
li {
  list-style-type: none;
  left: 0px;
}
button {
  width: 100px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>