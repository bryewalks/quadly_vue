<template>
    <div class="home"> 
          <button v-on:click="getGeoLocation()">Click Me</button>
<!--         <ul>
          <li v-for="error in errors"> {{ error }} </li>
        </ul> -->
        <div class="event-hero">
          <div class="container">
            <h2 class="customFadeInUp">
              The Spacial Conference
            </h2>
          </div>
          <div class="tickets container">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <p class="m-md-0">
                June 13th - 18th
              </p>
              <a v-on:click="submit()" class="btn-get-tickets" data-toggle="collapse" href="#current-weather">
                Check Weather
              </a>
              <p class="m-0">
                Portland, Oregon
              </p>
            </div>
          </div>
        </div>
          <div class="collapse restaurant-gallery" id="current-weather">
            <div class="card card-body">
              <div v-if="weather.good_to_fly">
                <h3>Weather Conditions Good For Flying!</h3>
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
      location: {
                  id: "",
                  position: {
                            lat: 10,
                            lng: 10
                            }
                },
      weather: {},
      errors: []
    };
  },
  created: function() {},
  methods: {
    submitStatus: function(inputStatus) {
      var params = {
                    user_id: this.user_id,
                    location_id: this.location.id,
                    status: inputStatus
                    };
                    
      axios.post("/api/user_locations/", params)
        .then(response => {
          this.$router.push("/userlocations/");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    submit: function() {
      var params = {
                    location_id: this.location.id,
                    search_lat: this.location.position.lat,
                    search_lng: this.location.position.lng
                    };
                    
      axios.post("/api/weathers/", params)
        .then(response => {
          axios.get("/api/weathers/" + response.data.id).then(response => {
            this.weather = response.data;
          });
          // this.$router.push("/weathers/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
     },
     getGeoLocation: function() {
      console.log(getCurrentPosition())
      // console.log(navigator.geolocation.getCurrentPosition())
       if(navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(position => {
               console.log(position);
               console.log("hello");
           });
       } else {
           console.error("Geolocate not supported");
           console.log("hello2");

       }
     }     
    }
  };
</script>