<template>
    <div id="map"></div>
</template>
  
  <script>
  export default {
    name: 'MapComponent',
    props: {
      msg: String
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  #map{
    width: 100%;
    height: 100%;
  }
  </style>
  