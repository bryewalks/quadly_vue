<template>
  <div class="locations-index">
      <button v-if="this.airportShow" v-on:click="showAirports()" class="map-button">
        Show Airports
      </button>
      <button v-if="!this.airportShow" v-on:click="hideAirports()" class="map-button">
        Hide Airports
      </button>     
    <GmapMap
      :center="{lat: this.ip.lat, lng: this.ip.lon}"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
      :options="{styles: mapStyle}"
    >
    <GmapCluster
      :grid-size="50"
      :zoomOnClick="true">
    <GmapMarker
      :key="index"
      v-for="(location, index) in locations"
      :position="location.position"
      :draggable="false"
      v-on:click="defineInfoWindow(location)"
      :icon="{ url: require('../../public/drone-map.png')}"
    />
    </GmapCluster>
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
      v-on:click="defineInfoWindow(airport)"/>
    </GmapMap>
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
<!--         <span>
            Find Location: <input v-model="locationFilter" list="locations">
          <datalist id="locations">
            <option v-for="location in locations">{{location.name}}</option>
          </datalist>
        </span>  -->

        <div class="topics clearfix">
          <div v-for="locations in formattedLocations()" class="row">
            <div v-for="location in locations" class="col-lg-3">
              <div>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      ip: {
            lat: 0,
            lon: 0,
            city: "",
            regionName: ""
      },
      locationFilter: "",
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

    fetch('http://ip-api.com/json/').then(response => 
      response.json()).then(data => 
        this.ip = data);
  },
  methods: {
    defineInfoWindow: function(inputLocation) {
      this.infoWindow.id = inputLocation.id;
      this.infoWindow.name = inputLocation.name;
      this.infoWindow.address = inputLocation.address;
      this.infoWindow.flight_zone_status = inputLocation.flight_zone_status;
      this.infoWindow.position = inputLocation.position;
      this.infoWindow.open = true;
    },
    showAirports: function() {
      this.airportShow = false;
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
    },
    formattedLocations: function() {
      return _.chunk(this.locations, 4);
    }
  }
}
</script>