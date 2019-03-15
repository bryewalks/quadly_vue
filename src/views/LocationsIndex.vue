<template>
  <div class="locations-index">
    <div class="container">
    <GmapMap
      :center="{lat:41.875562, lng:-87.624421}"
      :zoom="9"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
    >
      <GmapMarker
        :key="index"
        v-for="(location, index) in locations"
        :position="location.position"
        :clickable="true"
        :draggable="false"
        v-on:click="center=location.position"
      />
    </GmapMap>
      <h1>All Locations</h1>
      <router-link v-bind:to="'/locations/new'">Add Location</router-link>
      <div v-for="location in locations">
        <h2><router-link v-bind:to="'/locations/' + location.id">{{ location.name }}</router-link></h2>
        <p>Address: {{ location.address }}</p>
        <p>Latitude: {{ location.position.lat }}</p>
        <p>Longitude: {{ location.position.lng }}</p>
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
      locations: [{
                    id: "",
                    name: "",
                    address: "",
                    flight_zone_status: "",
                    position: {
                                lat: "",
                                lng: ""
                    }
      }],
      location_reviews: [],
    };
  },
  created: function() {
    axios.get("/api/locations").then(response => {
      this.locations = response.data;
      this.locations.forEach(function(location) {
        location.position.lat = parseFloat(location.position.lat)
        location.position.lng = parseFloat(location.position.lng)
      });
    })
  }
}
</script>