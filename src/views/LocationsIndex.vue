<template>
  <div class="locations-index">
    <GmapMap
      :center="{lat:41.875562, lng:-87.624421}"
      :zoom="9"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
      :options="{styles: mapStyle}"
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
        <div v-if="this.infoWindow.flight_zone_status === 'no_flight_zone'">No Flight Zone</div>
        <div v-if="this.infoWindow.flight_zone_status === 'requires_authorization'">Requires Authorization</div>
    </gmap-info-window>
    <GmapCircle
      :key="index + 'airport'"
      v-for="(airport, index) in airports"
      :center="airport.position"
      :radius="8047"
      :visible="true"
      v-on:click="defineInfoWindow(airport)"
      :fillColor="2"
      :fillOpacity:="1.0">
    </GmapCircle>
    </GmapMap>
      <button v-if="this.airportShow" v-on:click="showAirports()" class="map-button">
        Show Airports
      </button>
    <div class="map-button">
      <button v-if="!this.airportShow" v-on:click="hideAirports()" class="map-button">
        Hide Airports
      </button>     
    </div>
    <div class="index-photography-cta">
      <router-link v-bind:to="'/locations/new'" class="scroll">
        Add a Location!
      </router-link>
    </div>
    <div class="container">
    <div class="support-hero">
      <div class="container">
        <form>
          <i class="fa fa-search"></i>
          <input type="text" placeholder="Search help topics" />
        </form>

        <div class="topics clearfix">
          <div v-for="location in locations">
            
          <router-link v-bind:to="'/locations/' + location.id" class="topic">
            <h2>{{ location.name }}</h2>
            <i class="icon-linegraph"></i>
            <p>{{ location.address }}</p>
            <p v-if="location.flight_zone_status === 'no_flight_zone'">NO FLIGHT ZONE</p>
          </router-link>
          </div>
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
      locations: [{
                    id: "",
                    name: "",
                    address: "",
                    flight_zone_status: "",
                    position: {lat: 0, lng: 0},
                    airport: ""
      }],
      airports: [{
                    id: "",
                    name: "",
                    address: "",
                    flight_zone_status: "",
                    position: {lat: 0, lng: 0},
                    airport: ""
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
      mapStyle: [],
      airportShow: true
    };
  },
  created: function() {
    this.mapStyle = mapStyle
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
      // this.infoWindow = inputLocation;
      this.infoWindow.id = inputLocation.id;
      this.infoWindow.name = inputLocation.name;
      this.infoWindow.address = inputLocation.address;
      this.infoWindow.flight_zone_status = inputLocation.flight_zone_status;
      this.infoWindow.position = inputLocation.position;
      this.infoWindow.open = true;
    },
    showAirports: function() {
      this.airportShow = false;
      console.log(this.airportShow);
      axios.get("/api/airports").then(response => {
        this.airports = response.data;
        this.airports.forEach(function(airport) {
          airport.position.lat = parseFloat(airport.position.lat);
          airport.position.lng = parseFloat(airport.position.lng);
        });
      })
    },
    hideAirports: function() {
      this.airportShow = true;
      this.airports = [];
    }
  }
}
</script>