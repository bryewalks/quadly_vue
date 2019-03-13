<template>
  <div class="weathers-show">
    <div class="container">
      <h1>Weather at {{ weather.location.address }}</h1>
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
      <p>Wind Direction: {{ weather.wind_direction }}</p>
      </div>
    </div>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      weather: {
                id: "",
                good_to_fly: "",
                wind_speed: "",
                temperature: "",
                visibility_miles: "",
                max_gust_speed: "",
                chance_of_precipitation: "",
                cloud_cover: "",
                wind_direction: "",
                location: {
                            id: "",
                            name: "",
                            address: "",
                            latitude: "",
                            longitude: "",
                            flight_zone_status: "",
                            location_reviews: []
                            }
      }
    };
  },
  created: function() {
    axios.get("/api/weathers/" + this.$route.params.id).then(response => {
      this.weather = response.data;
    });
  },
  methods: {
    destroyWeather: function() {
      axios.delete("/api/weathers/" + this.weather.id)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/weathers");
        });
    },
  }
};
</script>