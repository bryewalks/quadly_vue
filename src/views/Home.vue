<template>
    <div class="home"> 
<!--         <ul>
          <li v-for="error in errors"> {{ error }} </li>
        </ul> -->
        <div class="event-hero">
          <div class="container">
            <h2 class="customFadeInUp">
<!--               The Spacial Conference
 -->            </h2>
          </div>
          <div class="tickets container">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <p v-if="this.ip" class="m-md-0">
                {{ this.ip.city }}
              </p>
              <a v-on:click="submit()" class="btn-get-tickets" data-toggle="collapse" href="#current-weather">
                Check Weather
              </a>
              <p v-if="this.ip" class="m-0">
                {{ this.ip.regionName }}
              </p>
            </div>
          </div>
        </div>
          <div class="collapse restaurant-gallery" id="current-weather">
            <div class="card card-body">
              <div v-if="weather.good_to_fly">
                <h3>Good Day to Fly in {{ this.ip.city }}!</h3>
              </div>
              <div v-else>
                <h3>DO NOT FLY</h3>
              </div>
              <p>Wind Speed: {{ weather.wind_speed }}</p>
              <p>Temperature: {{ weather.temperature }}</p>
              <p>Visibility Miles: {{ weather.visibility_miles }}</p>
              <p>Max Gust Speed: {{ weather.max_gust_speed }}</p>
              <p>Chance of Precipitation: {{ weather.chance_of_precipitation }}</p>
              <p>Cloud Coverage: {{ weather.cloud_cover }}</p>          
             </div>
          </div>
      </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      weather: {},
      ip: {
            lat: 0,
            lon: 0,
            city: "",
            regionName: ""
      },
      errors: []
    };
  },
  created: function() {
    var axiosTemp = axios;
    delete axiosTemp.defaults.headers.common["Authorization"];
    axiosTemp.get("http://ip-api.com/json/").then(response => {
      this.ip = response.data
    }, error => {
        console.error(error);
    });
  },
  methods: {
    submit: function() {
      var params = {
                    search_lat: this.ip.lat,
                    search_lng: this.ip.lon
                    };
                    
      axios.post("/api/weathers/", params)
        .then(response => {
          axios.get("/api/weathers/" + response.data.id).then(response => {
            this.weather = response.data;
          });
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }    
  }
};
</script>