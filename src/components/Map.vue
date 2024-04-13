<template>
    <div id="map"></div>
</template>
  
<script>
  
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

  export default {
    name: 'MapComponent',
    props: {
      msg: String
    },
    methods : {
        initMaps: () => {
            const map = L.map('map').setView([-1.0, 118.0], 5);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=-1.0&lon=118.0&exclude=hourly,daily&appid=' + process.env.VUE_APP_WHETHER_KEY)
            .then(res => {
                console.log(res.body);
            })
            .catch(err => {
                console.log(err);
            })
            map.on('zoomend', () => {
                console.log(map.getZoom());
            })

        }
    },
    mounted() {
        this.initMaps();
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
  