<template>
  <div class="locations-index">
<!--       <button v-if="!airportShow" v-on:click="toggleAirports()" class="map-button">
        Show Airports
      </button>
      <button v-if="airportShow" v-on:click="toggleAirports()" class="map-button">
        Hide Airports
      </button>  -->
        <input v-model="searchAddress" type="text" placeholder="Search Airports" />
        <input v-model="searchDistance" type="number" step="25" min="25" max="500"/>
        <button @click="searchNearbyAirports()">Search</button>
        <button @click="getNearbyAirports()">Nearby</button>
        <button @click="clearAllAirports()">Clear</button>      
        <button @click="openModal2()">Drop Pin</button>      
      <span style="float:right">
          <input v-model="filterAirports" type="radio" name="size" value="small"> Small</input>
          <input v-model="filterAirports" type="radio" name="size" value="large"> Large</input> 
          <input v-model="filterAirports" type="text" placeholder="Filter Results" />
      </span>
      <!-- <span style="float:left"> -->
      <!-- </span> -->
    <GmapMap
      ref="gmap"
      @dragend="showCoords()"
      :center="{lat: ip.lat, lng: ip.lon}"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100%; height: 600px"
      :options="{styles: mapStyle}"
    >
    <GmapMarker
      :key="centerPosition.lat"
      :position="centerPosition"
      :draggable="false"
      @click="getNearbyAirports(centerPosition.lat, centerPosition.lng)"
      :icon="{ url: require('../../public/center-icon.png')}"
    />
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
        <div>{{ infoWindow.flight_zone_status.replace(/_/g,' ') }}</div>
        <button @click="getNearbyAirports(infoWindow.position.lat, infoWindow.position.lng)">Check Airports</button>
        <input v-model="searchDistance" type="number" step="25" min="25" max="50" value="10" />
    </gmap-info-window>
    <GmapCircle
      :key="index + 'airport'"
      v-for="(airport, index) in filterBy(airports, filterAirports)"
      :center="airport.position"
      :radius="8047"
      :visible="true"
      @click="defineInfoWindow(airport)"/>
    </GmapMap>

    <div class="index-photography-cta">
<!--       <router-link v-bind:to="'/locations/new'" class="scroll">
        Add a Location!
      </router-link> -->
      <button @click="openModal()" class="scroll">
        Add a Location
      </button>
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
        <div id="wrapper" class="container">
         <modal v-if="showModal2">
           <h3 slot="header" class="modal-title">
             New Location
           </h3>
           <div align="center" slot="body">
            <form v-on:submit.prevent="submit()">
              <div class="form-group">
                <label>Location Name: </label>
                <input class='form-control' type='text' v-model="newLocationName" placeholder="ex: Afton Park">
              </div>
              <div>
                <input type="submit" value="Add New location" class="btn btn-primary">
              </div>
            </form>             
              <button class="btn btn-danger" @click="closeModal2()">Close</button>  
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
                  <p>{{ location.flight_zone_status.replace(/_/g,' ') }}</p>

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
      filterLocations: "",
      filterAirports: "",
      airportName: "",
      searchDistance: 50,
      searchAddress: "",
      latLng: "",
      showModal: false,
      showModal2: false,
      centerPosition: {
        lat: 0,
        lng: 0     
      }
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
    inputFilter: function() {
      this.filterAirports = this.tempFilter;
      this.airportNumber = this.tempAirportNumber;
    },
    defineInfoWindow: function(inputLocation) {
      this.infoWindow.id = inputLocation.id;
      this.infoWindow.name = inputLocation.name;
      this.infoWindow.address = inputLocation.address;
      this.infoWindow.flight_zone_status = inputLocation.flight_zone_status;
      this.infoWindow.position = inputLocation.position;
      this.infoWindow.open = true;
    },
    formattedLocations: function() {
      return _.chunk(this.locations, 4);
    },
    openModal: function() { 
      this.showModal = true; 
    },
    closeModal: function() {
      this.showModal = false;
    },
    openModal2: function() { 
      this.showModal2 = true; 
    },
    closeModal2: function() {
      this.showModal2 = false;
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
    getNearbyAirports: function(lat, lng) {
      var params = {
                    latitude: lat || this.ip.lat,
                    longitude: lng || this.ip.lon,
                    distance: this.searchDistance
                    };
      var self = this
      axios.get("/api/airports/", {params})
        .then(response => {
          var airports = response.data;
          airports.forEach(function(airport) {
            airport.position.lat = parseFloat(airport.position.lat);
            airport.position.lng = parseFloat(airport.position.lng);
            self.airports = airports;
          });
        });
    },
    searchNearbyAirports: function() {
      var params = {
                    address: this.searchAddress,
                    distance: this.searchDistance
                    };
      var self = this
      axios.get("/api/airports/", {params})
        .then(response => {
          var airports = response.data;
          airports.forEach(function(airport) {
            airport.position.lat = parseFloat(airport.position.lat);
            airport.position.lng = parseFloat(airport.position.lng);
            self.airports = airports;
          });
        });
    },
    clearAllAirports: function() {
      this.airports = "";
    },
    showCoords: function() {
      this.$refs.gmap.$mapPromise.then((map) => {
        var latLng = map.getCenter();
        this.centerPosition.lat = latLng.lat();
        this.centerPosition.lng = latLng.lng();
      })
    },
    submit: function() {
      this.closeModal();
      this.closeModal2();
      var params = {
                    name: this.newLocationName,
                    address: this.newLocationAddress,
                    latitude: this.centerPosition.lat,
                    longitude: this.centerPosition.lng
                    };
                    
      axios.post("/api/locations/", params)
        .then(response => {
          response.data.position.lat = parseFloat(response.data.position.lat)
          response.data.position.lng = parseFloat(response.data.position.lng)
          this.locations.push(response.data);
        });
      this.newLocationName = "",
      this.newLocationAddress = ""
    } 
  },
  mixins: [Vue2Filters.mixin],
  components: {
    Modal
  }
}
</script>