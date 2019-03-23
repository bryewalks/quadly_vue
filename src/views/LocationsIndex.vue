<template>
  <div class="locations-index">
      <button v-if="!airportShow" v-on:click="toggleAirports()" class="map-button">
        Show Airports
      </button>
      <button v-if="airportShow" v-on:click="toggleAirports()" class="map-button">
        Hide Airports
      </button>     
    <GmapMap
      :center="{lat: ip.lat, lng: ip.lon}"
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
        <router-link v-bind:to="'/locations/' + infoWindow.id"><div>{{ infoWindow.name }}</div></router-link>
        <div>{{ infoWindow.address }}</div>
        <div v-if="infoWindow.flight_zone_status === 'no_flight_zone'">No Flight Zone</div>
        <div v-if="infoWindow.flight_zone_status === 'requires_authorization'">Requires Authorization</div>
    </gmap-info-window>
    <div v-if="airportShow === true">
    <GmapCircle
      :key="index + 'airport'"
      v-for="(airport, index) in airports"
      :center="airport.position"
      :radius="8047"
      :visible="true"
      v-on:click="defineInfoWindow(airport)"/>
    </div>  
    </GmapMap>
    <div class="index-photography-cta">
<!--       <router-link v-bind:to="'/locations/new'" class="scroll">
        Add a Location!
      </router-link> -->
      <button @click="openModal()" class="scroll">
        Add a Location
      </button>
      <button @click="checkFlightStatus()"></button>
    </div>
    <div class="container">
    <div class="support-hero">
      <div class="container">
        <form>
          <i class="fa fa-search"></i>
          <input v-model:to="filterLocations" type="text" placeholder="Search help topics" />
        </form>

        <div id="wrapper" class="container">
         <modal v-if="showModal">
           <h3 slot="header" class="modal-title">
             New Location
           </h3>
           <div align="center" slot="body">
            <form v-on:submit.prevent="submit()">
              <div class="form-group">
                <label>Location Name: </label>
                <input class='form-control' type='text' v-model="newLocationName" placeholder="ex: Afton Park">
              </div>
              <div class="form-group">
                <label>Location Address: </label>
                <input class='form-control' type='text' v-model="newLocationAddress" placeholder="ex: 8725 Elva Rd Dekalb, Il">
              </div>
              <div>
                <input type="submit" value="Add New location" class="btn btn-primary">
              </div>
            </form>             
              <button class="btn btn-danger" @click="closeModal()">Close</button>  
           </div>
         </modal>
        </div>

        <div class="topics clearfix">
          <div v-for="(locations, index) in formattedLocations()" :key="index" class="row">
            <div v-for="location in filterBy(locations, filterLocations)" class="col-lg-3">
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
import Vue2Filters from "vue2-filters";
import Modal from "../components/Modal";


export default {
  data: function() {
    return {
      warning_message: "",
      newLocationName: "",
      newLocationAddress: "",
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
      airportShow: false,
      filterLocations: "",
      showModal: false
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
    axios.get("/api/airports").then(response => {
      this.airports = response.data;
      this.airports.forEach(function(airport) {
        airport.position.lat = parseFloat(airport.position.lat);
        airport.position.lng = parseFloat(airport.position.lng);
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
    toggleAirports: function() {
      this.airportShow = !this.airportShow;
    },
    formattedLocations: function() {
      return _.chunk(this.locations, 4);
    },
    openModal() { 
      this.showModal = true; 
    },
    closeModal() {
      this.showModal = false;
    },
    checkFlightStatus: function() {
      var params = {
                    latitude: this.ip.lat,
                    longitude: this.ip.lon
                    };
      axios.post("/api/locations/", params)
        .then(response => {
          this.flight_zone_status = response.data.flight_zone_status;
          console.log(this.flight_zone_status);
        });
    },
    submit: function() {
      this.showModal = false;
      var params = {
                    name: this.newLocationName,
                    address: this.newLocationAddress,
                    };
                    
      axios.post("/api/locations/", params)
        .then(response => {
          response.data.position.lat = parseFloat(response.data.position.lat)
          response.data.position.lng = parseFloat(response.data.position.lng)
          this.locations.push(response.data);
        });
    } 
  },
  mixins: [Vue2Filters.mixin],
  components: {
    Modal
  }
}
</script>