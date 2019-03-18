<template>
  <div class="locations-show">

    <div class="container">
      <h1>Location</h1>
      <h2>{{ location.name }}</h2>
      <div class="container">
        <button v-on:click="submitStatus(visited)" class="btn btn-primary">Visited</button>
        <button v-on:click="submitStatus(toVisit)" class="btn btn-secondary">Want to Visit</button>
      </div>  
      <p>Address: {{ location.address }}</p>
      <p>Latitude: {{ location.position.lat }}</p>
      <p>Longitude: {{ location.position.lng }}</p>
      <p>Status: {{ location.flight_zone_status }}</p>

      <p>Reviews</p>
      <div v-if="location.location_reviews" v-for="location_review in location.location_reviews">
        <p>Rating: {{ location_review.rating }}</p>
        <p>Summary: {{ location_review.summary }}</p>
        <p>Warning: {{ location_review.warning }}</p>
      </div>
      </div>

      <div class="weathers-new">
       
        <ul>
          <li v-for="error in errors"> {{ error }} </li>
        </ul>

        <div class='container'>
          <p>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#current-weather" aria-expanded="false" aria-controls="collapseExample" v-on:click="submit()">
              Check Weather
            </button>
          </p>
          <div class="collapse" id="current-weather">
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
                            lat: "",
                            lng: ""
                            }
                },
      newUserLocationsStatus: "",
      user_id: "",
      visited: "visited",
      toVisit: "to_visit",
      weather: {},
      errors: []
    };
  },
  created: function() {
    this.user_id = localStorage.getItem("user_id");
    axios.get("/api/locations/" + this.$route.params.id).then(response => {
      this.location = response.data;
    });
  },
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
     }    
    }
  };
</script>