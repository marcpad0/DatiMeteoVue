<template>
  <nav>
    <button class="button-link" @click="navigateTo('/')">Dati Grafici</button> |
    <button class="button-link" @click="navigateTo('/classifica')">Classifica</button> |
    <button class="button-link" @click="navigateTo('/regioni')">Regioni</button>
  </nav>
  <router-view/>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  font-size: 30px;
  display: flex;
  justify-content: center;
}

nav button {
  font-weight: bold;
  color: #fff;
  height: 40px;
  width: auto;
  border-radius: 15px;
  background: linear-gradient(135deg, #1b0ddf, #300b96);
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  margin: 0 10px;
}

nav button:hover {
  background: linear-gradient(135deg, #301ca5, #1a279b);
  transform: translateY(-2px);
}

nav button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

nav button:focus {
  outline: none;
}
</style>
