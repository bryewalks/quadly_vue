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
      v-on:click="defineInfoWindow(location)"
      :icon="{ url: require('../../public/drone-map.png')}"
    />
    <gmap-info-window
        :options="{maxWidth: 300}"
        :position="infoWindow.position"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open = !infoWindow.open">
        <router-link v-bind:to="'/locations/' + this.infoWindow.id"><div>{{ this.infoWindow.name }}</div></router-link>
        <div>{{ this.infoWindow.address }}</div>
        <div>{{ this.infoWindow.flight_zone_status }}</div>
    </gmap-info-window>
    </GmapMap>
      <h1>All Locations</h1>
      <router-link v-bind:to="'/locations/new'">Add Location</router-link>
      <div v-for="location in locations">
        <h2><router-link v-bind:to="'/locations/' + location.id">{{ location.name }}</router-link></h2>
        <p>Address: {{ location.address }}</p>
        <p>Latitude: {{ location.position.lat }}</p>
        <p>Longitude: {{ location.position.lng }}</p>
        <p>Status: {{ location.flight_zone_status }}</p>
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
                    position: {lat: 0, lng: 0}
      }],
      infoWindow: {
        position: {lat: 0, lng: 0},
        open: false,
        id: "",
        name: "",
        address: "",
        flight_zone_status: ""
      },
      location_reviews: [],
    };
  },
  created: function() {
    axios.get("/api/locations").then(response => {
      this.locations = response.data;
      this.locations.forEach(function(location) {
        location.position.lat = parseFloat(location.position.lat);
        location.position.lng = parseFloat(location.position.lng);
      });
    })
  },
  methods: {
    defineInfoWindow: function(inputLocation) {
      this.infoWindow.id = inputLocation.id;
      this.infoWindow.name = inputLocation.name;
      this.infoWindow.address = inputLocation.address;
      this.infoWindow.flight_zone_status = inputLocation.flight_zone_status;
      this.infoWindow.position = inputLocation.position;
      this.infoWindow.open = true;
    }
  }
}
</script>