import { Bar } from "vue-chartjs";
import database from "../../firebase.js";

export default {
  extends: Bar,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
              },
            },
          ],
        },
        legend: { display: false },
        title: {
          display: true,
          text: "Total Number of each dish",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .get()
        .then((querySnapShot) => {
          this.datacollection.datasets[0].backgroundColor = [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#5bc2e7",
          ];
          querySnapShot.forEach((doc) => {
            let order = doc.data();
            if (this.datacollection.labels.length == 0) {
              Object.keys(order).forEach((dish) => {
                this.datacollection.labels.push(dish);
                this.datacollection.datasets[0].data.push(Number(order[dish]));
              });
            } else {
              Object.keys(order).forEach((dish) => {
                var index = this.datacollection.labels.indexOf(dish);
                this.datacollection.datasets[0].data[index] =
                  this.datacollection.datasets[0].data[index] +
                  Number(order[dish]);
              });
            }
          });

          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
