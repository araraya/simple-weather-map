<template>
  <div id="app">
    <MapComponent/>
  </div>
</template>

<script>
import MapComponent from './components/Map.vue'

export default {
  name: 'App',
  components: {
    MapComponent
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
