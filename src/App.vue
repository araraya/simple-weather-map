<template>
  <div id="app">
    <MapComponent/>
  </div>
</template>

<script>
import MapComponent from './components/Map.vue'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

export default {
  name: 'App',
  components: {
    MapComponent
  },
  methods : {
    initMaps: () => {
        const map = L.map('map').setView([-1.0, 118.0], 5);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
  },
  mounted() {
    this.initMaps();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100vh;
  width: 100vw;
  margin:0 !important;
  padding: 0 !important;
}

</style>
