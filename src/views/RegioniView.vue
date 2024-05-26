<template>
  <div class="data-container">
    <h3>Temperatura Per Regione</h3>
    <div class="table-chart-container">     
      <div class="table-container">
        <div class="table-wrapper">
          <table v-if="regioni.length">
            <thead>
              <tr>
                <th>Città</th>
                <th>Temperatura Media (°C)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in regioni" :key="index">
                <td>{{ item.regione }}</td>
                <td>{{ (item.temps.reduce((a, b) => a + b, 0) / item.temps.length).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="chart-container">
        <apexchart type="bar" :options="chartOptions" :series="chartSeries" height="350"></apexchart>
      </div>
    </div>
    <h3>Precipitazioni Per Regione</h3>
    <div class="table-chart-container">
      <div class="table-container">
        <div class="table-wrapper">
          <table v-if="regioni.length">
            <thead>
              <tr>
                <th>Città</th>
                <th>Precipitazioni Medie</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in regioni" :key="index">
                <td>{{ item.regione }}</td>
                <td>{{ (item.precips.reduce((a, b) => a + b, 0) / item.precips.length).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="chart-container">
        <apexchart type="bar" :options="precChartOptions" :series="precChartSeries" height="350"></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'ClassificaView',
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      temps: [],
      precips: [],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 8,
            colors: {
              backgroundBarColors: ['#f8f8f8'],
              backgroundBarOpacity: 0.6
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: '#333',
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Temperatura (°C)',
            style: {
              color: '#333',
              fontSize: '14px'
            }
          },
          labels: {
            style: {
              colors: '#333',
              fontSize: '12px'
            }
          }
        },
        fill: {
          opacity: 1,
          colors: ['#f39c12']
        },
        tooltip: {
          theme: 'dark'
        }
      },
      chartSeries: [{
        name: 'Temperatura Media',
        data: []
      }],
      precChartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 8,
            colors: {
              backgroundBarColors: ['#f8f8f8'],
              backgroundBarOpacity: 0.6
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: '#333',
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Precipitazioni',
            style: {
              color: '#333',
              fontSize: '14px'
            }
          },
          labels: {
            style: {
              colors: '#333',
              fontSize: '12px'
            }
          }
        },
        fill: {
          opacity: 1,
          colors: ['#3498db']
        },
        tooltip: {
          theme: 'dark'
        }
      },
      precChartSeries: [{
        name: 'Precipitazioni',
        data: []
      }],
      jsonRegioni: {
        "Lombardia": [
          "Milano",
          "Bergamo",
          "Brescia",
          "Como",
          "Pavia",
          "Sondrio"
        ],
        "Lazio": [
          "Roma",
          "Latina",
          "Frosinone",
          "Viterbo",
          "Rieti"
        ],
        "Campania": [
          "Napoli",
          "Salerno",
          "Caserta",
          "Benevento",
          "Avellino"
        ],
        "Sicilia": [
          "Palermo",
          "Catania",
          "Messina",
          "Siracusa",
          "Trapani"
        ],
        "Veneto": [
          "Venezia",
          "Verona",
          "Padova",
          "Vicenza",
          "Treviso",
          "Belluno"
        ],
        "Piemonte": [
          "Torino",
          "Novara",
          "Cuneo",
          "Asti",
          "Alessandria",
          "Biella"
        ],
        "Toscana": [
          "Firenze",
          "Pisa",
          "Siena",
          "Lucca",
          "Arezzo",
          "Grosseto"
        ],
        "Emilia-Romagna": [
          "Bologna",
          "Modena",
          "Parma",
          "Reggio Emilia",
          "Ferrara",
          "Ravenna"
        ],
        "Puglia": [
          "Bari",
          "Taranto",
          "Foggia",
          "Lecce",
          "Brindisi",
          "Barletta"
        ],
        "Calabria": [
          "Reggio Calabria",
          "Catanzaro",
          "Cosenza",
          "Crotone",
          "Vibo Valentia"
        ],
        "Liguria": [
          "Genova",
          "La Spezia",
          "Savona",
          "Imperia"
        ],
        "Marche": [
          "Ancona",
          "Pesaro",
          "Macerata",
          "Ascoli Piceno",
          "Fermo"
        ],
        "Abruzzo": [
          "L'Aquila",
          "Pescara",
          "Teramo",
          "Chieti"
        ],
        "Friuli-Venezia Giulia": [
          "Trieste",
          "Udine",
          "Gorizia",
          "Pordenone"
        ],
        "Trentino-Alto Adige": [
          "Trento",
          "Bolzano"
        ],
        "Umbria": [
          "Perugia",
          "Terni"
        ],
        "Basilicata": [
          "Potenza",
          "Matera"
        ],
        "Sardegna": [
          "Cagliari",
          "Sassari",
          "Olbia",
          "Oristano",
          "Nuoro"
        ],
        "Valle d'Aosta": [
          "Aosta"
        ],
        "Molise": [
          "Campobasso",
          "Isernia"
        ]
      },
      regioni: []
    };
  },
  async mounted() {
    for (const region in this.jsonRegioni) {
      var array = []
      this.jsonRegioni[region].forEach(città => {
        array.push(città)
      })
      this.regioni.push({ regione: region, città: array, temps: [], precips: [] })
    }
    this.loadData();
  },
  methods: {
    async loadData() {
      let storedTemps = localStorage.getItem('tempData');
      this.temps = JSON.parse(storedTemps);

      let storedPrecs = localStorage.getItem('precData');
      this.precips = JSON.parse(storedPrecs);

      let pos = 0;
      this.temps.forEach(datiCittà => {
        if (pos > 0) {
          datiCittà.forEach(datoCittà => {
            if (typeof datoCittà === 'number' || (!isNaN(parseFloat(datoCittà)) && isFinite(datoCittà))) {
              datoCittà = Number(datoCittà);
              this.regioni.forEach(regione => {
                regione.città.forEach(città => {
                  if (città == datiCittà[0]) {
                    console.log(datiCittà[0] + " è in " + regione.regione)
                    regione.temps.push(datoCittà);
                  }
                })
              })
            }
          })
        }
        else {
          pos++;
        }
      })

      pos = 0;
      this.precips.forEach(datiCittà => {
        if (pos > 0) {
          datiCittà.forEach(datoCittà => {
            if (typeof datoCittà === 'number' || (!isNaN(parseFloat(datoCittà)) && isFinite(datoCittà))) {
              datoCittà = Number(datoCittà);
              this.regioni.forEach(regione => {
                regione.città.forEach(città => {
                  if (città == datiCittà[0]) {
                    console.log(datiCittà[0] + " è in " + regione.regione)
                    regione.precips.push(datoCittà);
                  }
                })
              })
            }
          })
        }
        else {
          pos++;
        }
      })
      this.mostraPrecipitazioni(this.regioni);
      this.mostraTemperatureData(this.regioni);
    },
    mostraTemperatureData(data) {
      if (data.length > 1) {
        // Update chart data
        console.log(data)
        this.chartOptions.xaxis.categories = data.map(item => item.regione)
        this.chartSeries[0].data = data.map(item => (item.temps.reduce((a, b) => a + b, 0) / item.temps.length).toFixed(2));
      }
    },
    mostraPrecipitazioni(data) {
      if (data.length > 1) {
        // Update chart data
        console.log(data)
        this.precChartOptions.xaxis.categories = data.map(item => item.regione)
        this.precChartSeries[0].data = data.map(item => (item.precips.reduce((a, b) => a + b, 0) / item.precips.length).toFixed(2));
      }
    }
  }
};
</script>

<style scoped>
.data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.table-chart-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Allow flex items to wrap */
}

.table-container {
  flex: 0 0 35%; /* Adjusted width to be smaller */
  margin-right: 20px;
  max-height: 300px; /* Set a max height */
  overflow-y: auto; /* Enable vertical scrolling */
  width: 100%; /* Ensure full width on small screens */
}

::-webkit-scrollbar {
    width: 10px; /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
    background: #f1f1f1; /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
    background: #888; /* color of the scroll thumb */
    border-radius: 10px; /* roundness of the scroll thumb */
}

::-webkit-scrollbar-thumb:hover {
    background: #555; /* color of the scroll thumb on hover */
}

.table-wrapper {
  overflow-x: auto; /* Enable horizontal scrolling */
}

.chart-container {
  flex: 1; /* Take remaining space */
  width: 100%; /* Ensure full width on small screens */
}

h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  background: #fff;
  color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 10px 15px;
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

@media (max-width: 768px) {
  .table-chart-container {
    flex-direction: column;
  }

  .table-container {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .chart-container {
    width: 100%;
  }

  table {
    width: 100%;
  }

  th, td {
    padding: 10px;
  }

  th {
    font-size: 14px;
  }

  td {
    font-size: 16px;
  }

  h3 {
    font-size: 20px;
  }

  .table-container {
    max-height: none;
    overflow-y: visible;
  }

  .table-wrapper {
    overflow-x: visible;
  }

  tr {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  td::before {
    display: none;
  }

  tr:hover td::before {
    display: none;
  }

  tr:nth-child(odd) {
    background: none;
  }

  tr:hover {
    background: none;
  }

  tr:hover td {
    background: #f2f2f2;
  }
}
</style>
