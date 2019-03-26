<template>
  <div class="user-locations-index">
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
      :key="user_location.status + index"
      v-for="(user_location, index) in user_locations"
      :position="user_location.location.position"
      :draggable="false"
      v-on:click="defineInfoWindow(user_location, index)"
      :icon="{ url: require('../../public/drone-map.png')}"
    />
    </GmapCluster>
    <gmap-info-window
        :options="{maxWidth: 300}"
        :position="infoWindow.location.position"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open = !infoWindow.open">
        <router-link v-bind:to="'/locations/' + infoWindow.location.id"><div>{{ infoWindow.location.name }}</div></router-link>
        <div>{{ infoWindow.location.address }}</div>
        <div>{{ infoWindow.location.flight_zone_status.replace(/_/g,' ') }}</div>
        <div>{{ infoWindow.status.replace(/_/g,' ') }}</div>
        <button v-on:click="updateStatus(infoWindow, infoWindow.index)" v-if="infoWindow.status === 'to_visit'">Mark as visited</button>
    </gmap-info-window>
    </GmapMap>
      <div class="index-app-news">
        <div class="container">
          <span>All</span>
          <strong>Tracked Locations.</strong> Mark locations as visited to leave a review! 
          <router-link v-bind:to="'/locations/'" >Back to locations.</router-link>
        </div>
      </div>
      <div class="new-topic container">
           <div class="cart table" v-if="statusCount('to_visit')">
              <div class="store-cart-header">
                <div class="container">
                  <h3>Locations To Visit</h3>
                </div>
              </div>
             <div class="container">
               <div class="row cart-headers d-none d-md-flex">
                 <div class="col-md-3">
                 </div>
                 <div class="col-md-3">
                   <span class="price">Name:</span>
                 </div>
                 <div class="col-md-3">
                   <span>Address:</span>
                 </div>
                 <div class="col-md-3">      
                 </div>
               </div>
               <div v-for="(user_location, index) in user_locations" :key="index" v-if="user_location.status === 'to_visit'" class="row cart-product">
                 <div class="col-md-3">
                    <button v-on:click="updateStatus(user_location, index)" class="btn btn-success table-content" type="button">
                      Visited
                    </button>
                 </div>
                 <div class="col-md-3 table-content" >
                  <router-link v-bind:to="'/locations/' + user_location.location_id">{{ user_location.location.name }}</router-link>
                 </div>
                 <div class="col-md-3 col-3 table-content">
                   <span class="price">
                    {{ user_location.location.address }}
                   </span>
                 </div>
                 <div class="col-md-3 col-3">
                  <button v-on:click="destroyUserLocation(user_location, index)" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                 </div>
               </div>
               </div>
             </div>
             <div v-else>
              <div class="container">
                <div class="index-features-user">
                  <header>
                    <h3>You have no locations marked to visit!</h3>
                    <h4>
                      Mark locations as want to visit to keep track of great places to fly.
                    </h4>
                  </header>
                </div> 
              </div>
             </div>


            <div class="cart table" v-if="statusCount('visited')">
            <div class="store-cart-header">
              <div class="container">
                <h3>Visited Locations</h3>
              </div>
            </div>
              <div class="container">
                <div class="row cart-headers d-none d-md-flex">
                  <div class="col-md-3">
                  </div>
                  <div class="col-md-3">
                    <span class="price">Name:</span>
                  </div>
                  <div class="col-md-3">
                    <span>Address:</span>
                  </div>
                  <div class="col-md-3">      
                  </div>
                </div>
              </div>


            <div class="container">
                <div v-for="(user_location, index) in user_locations" :key="index" v-if="user_location.status === 'visited'" class="row cart-product">
                  <div class="col-md-3 table-content">
                    <button v-on:click="newLocationReviewUserLocationId = user_location.id" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                      Review
                    </button>
                  </div>
                  <div class="col-md-3 table-content" >
                   <router-link v-bind:to="'/locations/' + user_location.location_id">{{ user_location.location.name }}</router-link>
                  </div>
                  <div class="col-md-3 col-3 table-content">
                    <span class="price">
                     {{ user_location.location.address }}
                    </span>
                  </div>
                  <div class="col-md-3 col-3">
                   <button v-on:click="destroyUserLocation(user_location, index)" type="button" class="close" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                   </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="container">
                <div class="index-features-user">
                  <header>
                    <h3>You haven't visited any locations!</h3>
                    <h4>
                      Add some visited locations to start leaving reviews.
                    </h4>
                  </header>
                </div> 
              </div>
            </div>

          <div class="container">  
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <div class="location-reviews-new">

                  <ul>
                    <li v-for="error in errors"> {{ error }} </li>
                  </ul>

                  <div class="container">
                    <form v-on:submit.prevent="submitReview()">
                      <div class="form-group">
                        <label>Summary: </label>
                        <input class='form-control' type='text' v-model="newLocationReviewSummary" placeholder="ex: Betsy">
                      </div>
                      <div class="form-group">
                        <label>Warning: </label>
                        <input class='form-control' type='text' v-model="newLocationReviewWarning" placeholder="ex: yes">
                      </div>
                      <div class="form-group">
                        <label>Rating: </label>
                        <input class='form-control' type='text' v-model="newLocationReviewRating" placeholder="ex: yes">
                      </div>       
                      <input type="submit" value="Review Location" class="btn btn-primary">
                    </form>
                  </div>  
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
      user_locations: [{
                          id: "",
                          user_id: "",
                          location_id: "",
                          status: "",
                          location: {
                            id: "",
                            name: "",
                            address: "",
                            flight_zone_status: "",
                            airport: "",
                            position: {
                              lat: 0,
                              lng: 0
                            }
                          }
      }],
      newLocationReviewSummary: "",
      newLocationReviewWarning: "",
      newLocationReviewUserLocationId: "",
      newLocationReviewRating: "",
      errors: [],
      ip: {
            lat: 0,
            lon: 0,
            city: "",
            regionName: ""
      },
      mapStyle: mapStyle,
      infoWindow: {
        open: false,
        id: "",
        status: "",
        location: {
                  id: "",
                  name: "",
                  address: "",
                  flight_zone_status: "",
                  position: {lat: 0, lng: 0}
                },
        index: ""
      },
      searchDistance: ""
                };
  },
  created: function() {
    axios.get("/api/user_locations").then(response => {
      this.user_locations = response.data;
      this.user_locations.forEach(function(user_location) {
        user_location.location.position.lat = parseFloat(user_location.location.position.lat);
        user_location.location.position.lng = parseFloat(user_location.location.position.lng);
      });
    });

    fetch('http://ip-api.com/json/').then(response => 
      response.json()).then(data =>
        this.ip = data);
  },
  methods: {
    defineInfoWindow: function(inputUserLocation, inputUserLocationIndex) {
      this.infoWindow.id = inputUserLocation.id;
      this.infoWindow.index = inputUserLocationIndex;
      this.infoWindow.location.id = inputUserLocation.location.id;
      this.infoWindow.location.name = inputUserLocation.location.name;
      this.infoWindow.location.address = inputUserLocation.location.address;
      this.infoWindow.location.flight_zone_status = inputUserLocation.location.flight_zone_status;
      this.infoWindow.location.position = inputUserLocation.location.position;
      this.infoWindow.status = inputUserLocation.status;
      this.infoWindow.open = true;
    },
    destroyUserLocation: function(inputUserLocation, inputIndex) {
      axios.delete("/api/user_locations/" + inputUserLocation.id)
        .then(response => {
          this.user_locations.splice(inputIndex, 1);
        });
    },
  submitReview: function() {
    var params = {
                  summary: this.newLocationReviewSummary,
                  warning: this.newLocationReviewWarning,
                  user_location_id: this.newLocationReviewUserLocationId,
                  rating: this.newLocationReviewRating
                  };
                  
    axios.post("/api/location_reviews/", params)
      .then(response => {
        this.$router.push("/locations/" + response.data.location_id);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    statusCount: function(inputString) {
      // console.log(inputString);
      var counter = 0;
        this.user_locations.forEach(function(user_location) {
          if (user_location.status === inputString) {
            counter += 1;
          }
      });
      if (counter > 0) {
        return true
      }
    },
    updateStatus: function(inputUserLocation, inputIndex) {
      var params = {
                    status: "visited"
                    };
      axios.patch("api/user_locations/" + inputUserLocation.id, params)
      .then(response => {
        var user_location = response.data;
        user_location.location.position.lat = parseFloat(user_location.location.position.lat);
        user_location.location.position.lng = parseFloat(user_location.location.position.lng);
        this.user_locations.push(user_location);
        this.user_locations.splice(inputIndex, 1);
      })
    }
  }
};
</script>