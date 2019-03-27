<template>
    <div class="home"> 
<!--         <ul>
          <li v-for="error in errors"> {{ error }} </li>
        </ul> -->
        <div class="event-hero">
          <div v-if="flight_zone_status === 'flight_zone'">
            <div class="alert alert-success" role="alert">
              <button type="button" class="close" aria-label="Close" @click="flight_zone_status = ''">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="alert-heading">No airports within 5 miles good to fly!</h4>
            </div>  
          </div>
          <div v-if="flight_zone_status === 'no_flight_zone'">
            <div class="alert alert-danger" role="alert">
              <button type="button" class="close" aria-label="Close" @click="flight_zone_status = ''">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="alert-heading">You are within five miles of a major airport. Please relocate before flying.</h4>
            </div>  
          </div>
          <div v-if="flight_zone_status === 'requires_authorization'">
            <div class="alert alert-warning" role="alert">
              <button type="button" class="close" aria-label="Close" @click="flight_zone_status = ''">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="alert-heading">You are within five miles of a small airport. Please request authorization before flying.</h4>
            </div>  
          </div>
          <div class="tickets container">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <p v-if="ip" class="m-md-0">
                {{ ip.city }}
              </p>
              <a v-on:click="submit()" class="btn-get-tickets" data-toggle="collapse" href="#current-weather">
                Check Weather
              </a>
              <router-link class="btn-get-tickets" :to="'/locations'">
                All Locations
              </router-link>
              <a v-on:click="checkFlightStatus()" class="btn-get-tickets">
                Flight Zone Status
              </a>
              <p v-if="ip" class="m-0">
                {{ ip.regionName }}
              </p>
              <p>
              </p>
            </div>
          </div>

        </div>
          <div class="collapse restaurant-gallery" id="current-weather">
            <div class="container">
            <div class="card card-body" align="center">
              <div v-if="weather.good_to_fly">
                <h3>Good Day to Fly in {{ ip.city }}!</h3>
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
      </div>
</template>
<style>
  .event-hero {
    margin-bottom: 100px;
  }
</style>

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
      flight_zone_status: "",
      errors: [],
    };
  },
  created: function() {
    fetch('http://ip-api.com/json/').then(response => 
      response.json()).then(data => 
        this.ip = data);
  },
  methods: {
    checkFlightStatus: function() {
      var params = {
                    search_lat: this.ip.lat,
                    search_lng: this.ip.lon
                    };
      axios.post("/api/locations/", params)
        .then(response => {
          this.flight_zone_status = response.data.flight_zone_status;
        });
      },
    submit: function() {
      var params = {
                    search_lat: this.ip.lat,
                    search_lng: this.ip.lon
                    };
                    
      axios.post("/api/weathers/", params)
        .then(response => {
          this.weather = response.data;
        })
    }    
  }
};
</script>