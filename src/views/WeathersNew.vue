<template>
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
          <label>Wind Direction: </label>
          <input class='form-control' type='text' v-model="newWeatherWindDirection" placeholder="ex: North">
        </div>
        <div class="form-group">
          <label>Location ID: </label>
          <input class='form-control' type='text' v-model="newWeatherLocationId" placeholder="ex: 1">
        </div>
        <input type="submit" value="Check Weather" class="btn btn-primary">
      </form>

    </div>
  </div>


</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newWeatherTemperature: "",
      newWeatherVisibilityMiles: "",
      newWeatherMaxGustSpeed: "",
      newWeatherWindSpeed: "",
      newWeatherChanceOfPrecipitation: "",
      newWeatherCloudCover: "",
      newWeatherWindDirection: "",
      newWeatherLocationId: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
                    temperature: this.newWeatherTemperature,
                    visibility_miles: this.newWeatherVisibilityMiles,
                    max_gust_speed: this.newWeatherMaxGustSpeed,
                    wind_speed: this.newWeatherWindSpeed,
                    chance_of_precipitation: this.newWeatherChanceOfPrecipitation,
                    cloud_cover: this.newWeatherCloudCover,
                    wind_direction: this.newWeatherWindDirection,
                    location_id: this.newWeatherLocationId
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