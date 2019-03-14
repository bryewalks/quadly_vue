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
    <div id="map"></div>   
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
  methods: {},
  mounted: function() {
      var chicago = {lat: 41.891486, lng: -87.630833};


      var map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        zoom: 14
      });

      
      // this.locations.forEach(function(location) {
      //   console.log(location.address);
      // });


      var places = [
                    // { location_mark: {lat: location.latitude,lng: location.longitude}, description: '<h4>59 W Hubbard St #2</h4>'},
                    ];

      places.forEach(function(place) {
        var infowindow = new google.maps.InfoWindow({ content: place.description });

        var marker = new google.maps.Marker({
          position: place.location_mark,
          map: map,
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        }); 
      });
    }
  };
</script>
<!--                     { location: {lat: 41.8921364,lng: -87.6370182}, description: '<h4>Actualize</h4>'},
                    { location: {lat: 41.891486,lng: -87.630833}, description: '<h4>519 N Clark St, Chicago, IL</h4>'},
                    { location: {lat: 41.890336,lng: -87.624701}, description: '<h4>430 N Michigan Ave, Chicago, IL 60611</h4>'},
                    { location: {lat: 41.892987,lng: -87.630885}, description: '<h4>100 W Ontario St, Chicago, IL 60654</h4>'} -->