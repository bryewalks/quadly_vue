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
          <h1>Input Current Weather:</h1>

          <form v-on:submit.prevent="submit()">
            <div class="form-group">
              <label>Temperature: </label>
              <input class='form-control' type='text' v-model="newWeatherTemperature" placeholder="ex: 70">
            </div>
            <div class="form-group">
              <label>Visible Miles: </label>
              <input class='form-control' type='text' v-model="newWeatherVisibilityMiles" placeholder="ex: 5">
            </div>
            <div class="form-group">
              <label>Max Gust Speed: </label>
              <input class='form-control' type='text' v-model="newWeatherMaxGustSpeed" placeholder="ex: 10">
            </div>
            <div class="form-group">
              <label>Wind Speed: </label>
              <input class='form-control' type='text' v-model="newWeatherWindSpeed" placeholder="ex: 10">
            </div>        
            <div class="form-group">
              <label>Chance of Precipitation: </label>
              <input class='form-control' type='text' v-model="newWeatherChanceOfPrecipitation" placeholder="ex: 40">
            </div>
            <div class="form-group">
              <label>Cloud Cover: </label>
              <input class='form-control' type='text' v-model="newWeatherCloudCover" placeholder="ex: 60">
            </div>
            <div class="form-group">
              <select v-model="newWeatherWindDirection">
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
                <option value="north_east">North East</option>
                <option value="north_west">North West</option>
                <option value="south_east">South East</option>
                <option value="south_west">South West</option>
              </select>
            </div>
            <input type="submit" value="Check Weather" class="btn btn-primary">
          </form>
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
      admin: "",
      newWeatherTemperature: "",
      newWeatherVisibilityMiles: "",
      newWeatherMaxGustSpeed: "",
      newWeatherWindSpeed: "",
      newWeatherChanceOfPrecipitation: "",
      newWeatherCloudCover: "",
      newWeatherWindDirection: "",
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
                    temperature: this.newWeatherTemperature,
                    visibility_miles: this.newWeatherVisibilityMiles,
                    max_gust_speed: this.newWeatherMaxGustSpeed,
                    wind_speed: this.newWeatherWindSpeed,
                    chance_of_precipitation: this.newWeatherChanceOfPrecipitation,
                    cloud_cover: this.newWeatherCloudCover,
                    wind_direction: this.newWeatherWindDirection,
                    location_id: this.location.id
                    };
                    
      axios.post("/api/weathers/", params)
        .then(response => {
          this.$router.push("/weathers/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
     }    
    }
  };
</script>