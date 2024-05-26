<template>
  <div class="data-container">
    <div class="data-section" v-if="temps.length">
      <h3>Tabella Temperature:</h3>
      <button class="add-button" @click="addNewYearColumn('temp')">+ Nuovo Anno</button>
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="(header, index) in temps[0]" :key="'temp-header-' + index"
              :class="{ 'first-column': index === 0 }">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in temps.slice(1)" :key="'temp-row-' + rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="'temp-cell-' + cellIndex"
              :class="{ 'first-column': cellIndex === 0 }" :data-label="temps[0][cellIndex]">
              <input class="table-input" v-model="temps[rowIndex + 1][cellIndex]" @change="saveToLocalStorage" />
            </td>
          </tr>
        </tbody>
      </table>
      <apexchart type="bar" :options="tempChartOptions" :series="tempChartData" height="350"></apexchart>
    </div>
    <div class="data-section" v-if="prec.length">
      <h3>Tabella Precipitazioni:</h3>
      <button class="add-button" @click="addNewYearColumn('prec')">+ Nuovo Anno</button>
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="(header, index) in prec[0]" :key="'prec-header-' + index"
              :class="{ 'first-column': index === 0 }">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in prec.slice(1)" :key="'prec-row-' + rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="'prec-cell-' + cellIndex"
              :class="{ 'first-column': cellIndex === 0 }" :data-label="prec[0][cellIndex]">
              <input class="table-input" v-model="prec[rowIndex + 1][cellIndex]" @change="saveToLocalStorage" />
            </td>
          </tr>
        </tbody>
      </table>
      <apexchart type="bar" :options="precChartOptions" :series="precChartData" height="350"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import * as XLSX from "xlsx";

export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      temps: [],
      prec: [],
      tempChartOptions: {
        chart: {
          id: 'tempChart',
          type: 'bar',
          height: 350
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: '#ffffff',
            },
          },
        },
        title: {
          text: 'Grafico Temperature',
          align: 'center',
          style: {
            color: '#ffffff',
          },
        }
      },
      tempChartData: [{
        name: 'Temperature',
        data: []
      }],
      precChartOptions: {
        chart: {
          id: 'precChart',
          type: 'bar',
          height: 350
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: '#ffffff',
            },
          },
        },
        title: {
          text: 'Grafico Precipitazioni',
          align: 'center',
          style: {
            color: '#ffffff',
          },
        }
      },
      precChartData: [{
        name: 'Precipitation',
        data: []
      }]
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      let storedTemps = localStorage.getItem('tempData');
      let storedPrec = localStorage.getItem('precData');
      if (storedTemps) {
        this.temps = JSON.parse(storedTemps);
      } else {
        const response = await fetch('/data.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        this.temps = jsonData;
        this.saveToLocalStorage();
      }
      this.updateChartData(this.temps, this.tempChartData, this.tempChartOptions);
      if (storedPrec) {
        this.prec = JSON.parse(storedPrec);
      } else {
        const response2 = await fetch('/precipitazioni.xlsx');
        const arrayBuffer2 = await response2.arrayBuffer();
        const data2 = new Uint8Array(arrayBuffer2);
        const workbook2 = XLSX.read(data2, { type: 'array' });
        const firstSheetName2 = workbook2.SheetNames[0];
        const worksheet2 = workbook2.Sheets[firstSheetName2];
        const jsonData2 = XLSX.utils.sheet_to_json(worksheet2, { header: 1 });
        this.prec = jsonData2;
        this.saveToLocalStorage();
      }
      this.updateChartData(this.prec, this.precChartData, this.precChartOptions);
    },
    saveToLocalStorage() {
      localStorage.setItem('tempData', JSON.stringify(this.temps));
      localStorage.setItem('precData', JSON.stringify(this.prec));
      this.updateChartData(this.temps, this.tempChartData, this.tempChartOptions);
      this.updateChartData(this.prec, this.precChartData, this.precChartOptions);
    },
    updateChartData(data, chartDataArray, options) {
      if (data.length > 1) {
        options.xaxis.categories = data.slice(1).map(item => item[0]);
        chartDataArray[0].data = data.slice(1).map(item => parseFloat(item[1]));
      }
    },
    addNewYearColumn(table) {
      if (table == "temp") {
        var pos = 0;
        this.temps.forEach(item => {
          if (pos == 0) {
            item.push(this.temps[0][this.temps[0].length - 1] + 1);
            pos++;
          } else {
            item.push(0);
          }
        })
      } else {
        var pos2 = 0;
        this.prec.forEach(item => {
          if (pos2 == 0) {
            item.push(this.prec[0][this.prec[0].length - 1] + 1);
            pos2++;
          } else {
            item.push(0);
          }
        })
      }
      this.saveToLocalStorage();
      this.updateChartData(this.temps, this.tempChartData, this.tempChartOptions);
      this.updateChartData(this.prec, this.precChartData, this.precChartOptions);
    }
  }
};
</script>

<style scoped>
.data-container {
  margin: 50px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 80%;
  background: #fffefe;
  color: #000000;
  /* Changed from #f0f0f0 to #000000 */
  box-shadow: 0 0 10px rgb(255, 255, 255);
  overflow-x: auto;
}

.data-section {
  background: #ffffff;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.data-section:hover {
  background: #fffafa;
  cursor: pointer;
}

.data-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.data-table th,
.data-table td {
  padding: 20px;
  text-align: left;
  position: relative;
  transition: all 0.3s ease;
}

.data-table th {
  background: #ff6600;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 12px;
}

.data-table td {
  font-size: 14px;
  background: #ffffff;
  color: #ffffff;
}

.data-table td::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background-color: #ff6600;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: right;
}

.data-table tr:hover td::before {
  transform: scaleX(1);
  transform-origin: left;
}

.table-input {
  width: 150%;
  padding: 5px;
  box-sizing: border-box;
}

.add-button {
  background-color: #4e18e2;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0d23e4;
}

@media (max-width: 768px) {
  .data-table {
    display: block;
    background-color: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }

  .data-table thead {
    display: none;
  }

  .table-input {
    width: 132%;
    padding: 5px;
    box-sizing: border-box;
  }

  .data-table tr {
    margin-bottom: 10px;
    display: block;
    border-bottom: 2px solid #ddd;
    padding: 10px;
  }

  .data-table td {
    display: block;
    text-align: right;
    font-size: 13px;
    border-bottom: 1px dotted #ccc;
    padding: 10px;
    color: #333;
  }

  .data-section {
    background: #ff7300;
    padding: 20px;
    margin-bottom: 30px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .data-table td::before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
    color: #666;
  }
}
</style>
