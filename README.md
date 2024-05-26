# Meteo
Meteo is a Vue.js application that processes and visualizes meteorological data. It uses Chart.js for data visualization and XLSX to read Excel files.

## Project Structure
The project is structured as follows:

- `src/`: Contains the main application code.
- `App.vue`: The main Vue component.
- `main.js`: The entry point of the application.
- `router/`: Contains the application's routing configuration.
- `views/`: Contains the Vue components that represent different views in the application.
- `public/`: Contains static files and datasets.
- `package.json`: Defines the project's npm dependencies.
- `vue.config.js`: Contains Vue configuration.

## Views
The application has three main views:

- `HomeView.vue`: The default view that displays the home page.
- `BestView.vue`: Displays the hottest cities per year.
- `RegioniView.vue`: Displays temperature and precipitation data by region.

## Setup
To set up the project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install the project dependencies with `npm install`.

## Running the Project
To run the project in development mode with hot-reloading, use the command `npm run serve`.

## Building the Project
To build the project for production, use the command `npm run build`.

## Linting
To lint and fix files, use the command `npm run lint`.

## Customizing Configuration
For further configuration, see the [Vue Configuration Reference](https://cli.vuejs.org/config/).

## Dependencies
The project uses several dependencies, including:

- Vue.js: The main framework used for building the user interface.
- Vue Router: Used for routing in the Vue.js application.
- Chart.js and vue-chart-3: Used for creating charts to visualize data.
- XLSX: Used for reading Excel files.
- VueApexCharts: Used for creating interactive charts.

For a full list of dependencies, refer to the `package.json` file.
