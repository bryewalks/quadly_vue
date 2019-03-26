<template>
  <div class="locations-show">
    <div class="agency-alt-map">
      <div class="container">
        <div class="location d-none d-md-block">
          <h5>{{ location.name }}</h5>
          <p>
            {{ location.address }}
          </p>
          <p>
            {{ location.flight_zone_status.replace(/_/g,' ') }}
          </p>
        </div>
      </div>
      <GmapMap
        ref="gmap"
        :center="{lat: parseFloat(location.position.lat), lng: parseFloat(location.position.lng)}"
        :zoom="15"
        map-type-id="terrain"
        style="width: 100%; height: 600px"
        :options="mapOptions"
      >
        <GmapMarker
          :position="{lat: parseFloat(location.position.lat), lng: parseFloat(location.position.lng)}"
          :draggable="false"
          :icon="{ url: require('../../public/images/icons/map-icon.png')}"
        />
      </GmapMap>
    </div>
    <button v-if="user_admin === 'true'" @click="destroyLocation()" class="btn btn-danger">Delete Location</button>     

    <div class="agency-alt-contact-info">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <a v-on:click="submitStatus(visited)">
            <h4 style="color: #518dc3;">
              <i class="ion-map"></i>
              Visited
            </h4>
            </a>
            <p>
              Mark this location as visited.
            </p>
          </div>
          <div class="col-md-4">
            <a @click="submitWeather()">
            <h4 style="color: #4fc4c5;">
              <i class="ion-ios-rainy"></i>
              Weather
            </h4>
            </a>
            <p>
              Check the weather at this location.
            </p>
          </div>
          <div class="col-md-4">
            <a v-on:click="submitStatus(toVisit)">
            <h4 style="color: #a34dd6;">
              <i class="ion-ios-bookmarks"></i>
              Track
            </h4>
            </a>
            <p>
              Add this location to your tracked locations.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="agency-alt-hero">
      <div class="container">
        <h3 class="customFadeInUp">
          <h2 v-if="location.location_reviews.length > 0">Reviews</h2>
          <h2 v-else>This Location Has No Reviews.</h2>
        </h3>
      </div>
    </div>

    <div id="wrapper" class="container">
     <modal v-if="modal">
       <h3 slot="header" class="modal-title">
          Weather Conditions
       </h3>
       <div align="center" slot="body">
          <div v-if="weather.good_to_fly">
            <h3>Good For Flying!</h3>
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
          <button class="btn btn-danger" @click="toggleModal()">Close</button>  
       </div>
     </modal>
   </div>

   <div v-if="location.location_reviews.length > 0" class="container">
   <div class="support-hero">
     <div class="container">
       <div class="topics clearfix">
         <div v-for="(location_reviews, index) in formattedReviews()" :key="index" class="row">
           <div v-for="location_review in location_reviews" class="col-lg-3">
             <div class="topic">                
              <star-rating v-model="location_review.rating" v-bind:star-size="25" read-only></star-rating>
              <i class="icon-linegraph"></i>
              <p>Review Summary: {{ location_review.summary }}</p>
              <p>Location Warnings: {{ location_review.warning }}</p>
              <button v-if="user_id == location_review.user_id" @click="destroyReview(location_review, index)" class="btn btn-danger">Delete Review</button>
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
import Modal from "../components/Modal";


export default {
  data: function() {
    return {
      location: {
                  id: "",
                  flight_zone_status: "",
                  position: {
                            lat: "",
                            lng: ""
                            },
                  location_reviews: [{
                                      
                                                        id: "",
                                                        rating: 0,
                                                        warning: "",
                                                        location_id: "",
                                                        user_id: ""
                                      


                  }]
                },
      newUserLocationsStatus: "",
      user_id: "",
      user_admin: "",
      visited: "visited",
      toVisit: "to_visit",
      weather: {},
      errors: [],
      modal: false,
      mapOptions: {
                    styles: mapStyle,
                    draggable: false,
                    fullscreenControl: false,
                    // streetViewControl: false,
                    overviewMapControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    scrollwheel: false
                  }
    };
  },
  created: function() {
    this.user_id = localStorage.getItem("user_id");
    this.user_admin = localStorage.getItem("admin");
    console.log(this.user_admin);
    axios.get("/api/locations/" + this.$route.params.id).then(response => {
      this.location = response.data;
    });
  },
  components: {
                Modal
  },
  methods: {
    submitStatus: function(inputStatus) {
      var params = {
                    user_id: this.user_id,
                    location_id: this.location.id,
                    status: inputStatus
                    };
                    
      axios.post("/api/user_locations/", params)
        .then(response => {
          this.$router.push("/userlocations/");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    toggleModal: function() {
      this.modal = !this.modal;
    },
    formattedReviews: function() {
      return _.chunk(this.location.location_reviews, 4);
    },
    submitWeather: function() {
      var params = {
                    location_id: this.location.id,
                    search_lat: this.location.position.lat,
                    search_lng: this.location.position.lng
                    };
                    
      axios.post("/api/weathers/", params)
        .then(response => {
          this.weather = response.data;
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
      self = this
      setTimeout(function () {self.toggleModal()}, 500)
     },
     destroyReview: function(inputLocationReview, inputIndex) {
       axios.delete("/api/location_reviews/" + inputLocationReview.id)
         .then(response => {
           console.log("Success", response.data);
           this.location.location_reviews.splice(inputIndex, 1);
         });
     },
     destroyLocation: function() {
       axios.delete("/api/locations/" + this.location.id)
         .then(response => {
           console.log("Success", response.data);
           this.$router.push("/locations");
         });
     },    
    }
  };
</script>