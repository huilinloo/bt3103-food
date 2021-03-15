import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [],
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "PSI Twenty Four Hourly (By Region)",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems: function() {
      axios
        .get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then((response) => {
          var borders = [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#5bc2e7",
          ];
          var eachRegion = {};
          response.data["region_metadata"].forEach((data) => {
            var structure = {
              label: data["name"],
              type: "line",
              borderColor: borders[this.datacollection.datasets.length],
              data: [],
              fill: false,
            };
            eachRegion[data["name"]] = this.datacollection.datasets.length;
            this.datacollection.datasets.push(structure);
          });
          response.data["items"].forEach((data) => {
            this.datacollection.labels.push(data["timestamp"]);
            var psi_24_hourly = data["readings"]["psi_twenty_four_hourly"];
            Object.keys(psi_24_hourly).forEach((region) => {
              this.datacollection.datasets[eachRegion[region]].data.push(
                psi_24_hourly[region]
              );
            });
          });
          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
