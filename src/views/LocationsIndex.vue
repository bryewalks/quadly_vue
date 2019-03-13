<template>
  <div class="locations-index">
    <div class="container">
      <h1>All Locations</h1>
      <router-link v-bind:to="'/locations/new'">Add Location</router-link>
      <div v-for="location in locations">
        <h2><router-link v-bind:to="'/locations/' + location.id">{{ location.name }}</router-link></h2>
        <p>Address: {{ location.address }}</p>
        <p>Latitude: {{ location.latitude }}</p>
        <p>Longitude: {{ location.longitude }}</p>
        <p>Status: {{ location.flight_zone_status }}</p>
        <div v-if="location.location_reviews" v-for="location_review in location.location_reviews">
          <p>Review</p>
          <p>Rating: {{ location_review.rating }}</p>
          <p>Summary: {{ location_review.summary }}</p>
          <p>Warning: {{ location_review.warning }}</p>
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
      locations: [],
      location_reviews: []
    };
  },
  created: function() {
    axios.get("/api/locations").then(response => {
      this.locations = response.data;
    });
  },
  methods: {}
};
</script>