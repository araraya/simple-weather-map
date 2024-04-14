<template>
<div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import provCentroids from '../assets/geojson/centroid_provinsi.geojson';
import kabCentroids from '../assets/geojson/centroid_kabkot.geojson';
import kecCentroids from '../assets/geojson/centroid_kecamatan.geojson';

export default {
    name: 'MapComponent',
    props: {
        msg: String
    },
    data: () => {
        return {
            map: null,
            centroids: {
                kecamatanCentroids: kecCentroids,
                kabkotCentroids: kabCentroids,
                provinsiCentroids: provCentroids,
            }
        }
    },
    methods: {
        initMaps: (map, centroids, fetchWeather) => {
            map = L.map('map').setView([-1.0, 118.0], 5);
            L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {

            }).addTo(map);

            let weatherMarkers = [];

            centroids.provinsiCentroids.features.forEach(async prov => {
                const marker = await fetchWeather(prov.geometry.coordinates[1], prov.geometry.coordinates[0]);
                if (marker) {
                    map.addLayer(marker);
                    weatherMarkers.push(marker);
                }
            })

            map.on('zoomend', () => {
                const zoom = map.getZoom();
                const bounds = map.getBounds();
                console.log(bounds);

                console.log(zoom);
                weatherMarkers.forEach(marker => {
                    map.removeLayer(marker);
                })
                weatherMarkers = [];

                if (zoom < 9) {
                    centroids.provinsiCentroids.features.forEach(async prov => {
                        const marker = await fetchWeather(prov.geometry.coordinates[1], prov.geometry.coordinates[0]);

                        if (marker) {
                            map.addLayer(marker);
                            weatherMarkers.push(marker);
                        }
                    })
                } else if (zoom >= 9 && zoom < 13) {
                    centroids.kabkotCentroids.features.forEach(async kabkot => {
                        const marker = await fetchWeather(kabkot.geometry.coordinates[1], kabkot.geometry.coordinates[0]);

                        if (marker) {
                            map.addLayer(marker);
                            weatherMarkers.push(marker);
                        }
                    })
                } else {
                    centroids.kecamatanCentroids.features.forEach(async kec => {
                        const isInBounds = bounds.contains(L.latLng(kec.geometry.coordinates[1], kec.geometry.coordinates[0]))

                        if (isInBounds) {
                            const marker = await fetchWeather(kec.geometry.coordinates[1], kec.geometry.coordinates[0]);

                            if (marker) {
                                map.addLayer(marker);
                                weatherMarkers.push(marker);
                            }
                        }

                    })
                }
            })

            map.on('moveend', () => {
                const zoom = map.getZoom();
                const bounds = map.getBounds();
                
                weatherMarkers.forEach(marker => {
                    map.removeLayer(marker);
                })
                weatherMarkers = [];

                if (zoom >= 13) {
                    centroids.kecamatanCentroids.features.forEach(async kec => {
                        const isInBounds = bounds.contains(L.latLng(kec.geometry.coordinates[1], kec.geometry.coordinates[0]))

                        if (isInBounds) {
                            const marker = await fetchWeather(kec.geometry.coordinates[1], kec.geometry.coordinates[0]);

                            if (marker) {
                                map.addLayer(marker);
                                weatherMarkers.push(marker);
                            }
                        }
                    })
                }
            })
        },
        fetchData: (lat, long) => {
            return new Promise(resolve => {
                const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&exclude=hourly,daily&appid=' + process.env.VUE_APP_WHETHER_KEY

                fetch(weatherUrl).then(weather => {
                    if (weather.ok) {
                        const response = weather.json();

                        response.then(body => {
                            const icon = L.divIcon({
                                html: `
                                    <div>
                                        <img src='https://openweathermap.org/img/wn/${body.weather[0].icon}.png'>
                                        <p style="padding:0;margin:0;width:100px;color:white"><strong>${body.weather[0].description}</strong></p>
                                    </div>
                                    `,
                                className: 'weather-icon'
                            })
                            const marker = L.marker([lat, long], {
                                icon: icon
                            })
                            resolve(marker);
                        })
                    } else {
                        resolve(null);
                    }
                })

            })
        }
    },
    mounted() {
        this.initMaps(this.map, this.centroids, this.fetchData);
    }
}
</script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#map {
    width: 100%;
    height: 100%;
}

.weather-icon {
    background: #e5001a;
    border: 20px solid rgba(255, 255, 255, 0.5);
    color: blue;
    font-weight: bold;
    text-align: center;
    border-radius: 50%;
    line-height: 30px;
}
</style>
