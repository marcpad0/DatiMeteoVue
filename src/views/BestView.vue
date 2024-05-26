<template>
  <div>
    <h3>Top Città Più Calde per Anno</h3>
    <table v-if="hottestCities.length">
      <thead>
        <tr>
          <th>Anno</th>
          <th>Città</th>
          <th>Temperatura (°C)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in hottestCities" :key="index">
          <td>{{ item.year }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.temperature }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No data available or still loading...</p>
    </div>

    <!-- Bar Chart for Hottest Cities Per Year -->
    <apexchart
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
      height="350">
    </apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import * as XLSX from "xlsx";

export default {
  name: 'ClassificaView',
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      temps: [],
      hottestCities: [],  // Array to hold the hottest city for each year
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar'
        },
        dataLabels: {
          enabled: false  // Correct placement to disable data labels
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: 'Temperature (°C)'
          }
        }
      },
      chartSeries: [{
        name: 'Temperature',
        data: []
      }]
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      let storedTemps = localStorage.getItem('tempData');
      if (storedTemps) {
        this.temps = JSON.parse(storedTemps);
      }
      else {
        // Load and process temperature data
        const response = await fetch('/data.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        this.temps = jsonData;
      }
      this.processTemperatureData(this.temps);
    },
    processTemperatureData(data) {
      if (data.length > 1) {
        const years = data[0].slice(1); // Get the years from the first row
        const cityTemperatureData = data.slice(1).map(row => ({
          city: row[0],
          temperatures: row.slice(1).map(parseFloat)
        }));

        const hottestCitiesPerYear = years.map((year, index) => {
          let hottestCity = null;
          let maxTemperature = -Infinity;

          cityTemperatureData.forEach(cityData => {
            const temp = cityData.temperatures[index];
            if (temp > maxTemperature) {
              maxTemperature = temp;
              hottestCity = cityData.city;
            }
          });

          return {
            year: year,
            city: hottestCity,
            temperature: maxTemperature
          };
        });

        this.hottestCities = hottestCitiesPerYear;

        // Update chart data
        this.chartOptions.xaxis.categories = hottestCitiesPerYear.map(item => item.year);
        this.chartSeries[0].data = hottestCitiesPerYear.map(item => item.temperature);
      }
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
  width: 80%;
  margin: 50px auto;
  background: #fff;
  color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 20px;
  text-align: left;
  transition: all 0.3s ease;
  position: relative;
}

th {
  background: #3498db;
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
}

td {
  font-size: 14px;
}

tr {
  transition: all 0.3s ease;
}

tr:nth-child(odd) {
  background: #f2f2f2;
}

tr:hover {
  background: #ddd;
  cursor: pointer;
}

td::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background-color: #3498db;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: right;
}

tr:hover td::before {
  transform: scaleX(1);
  transform-origin: left;
}
</style>
