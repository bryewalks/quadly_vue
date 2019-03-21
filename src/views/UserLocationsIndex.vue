<template>
  <div class="user-locations-index">
    <div class="container">
      <h1>Your Tracked Locations</h1>
        <table class="table table-striped table-dark">
          <thead class="thead-light"> 
           <tr>
             <th scope="col">Review</th>
             <th scope="col">Name</th>
             <th scope="col">Address</th>
             <th scope="col">Status</th>
           </tr>
          </thead>
          <tbody>
          <tr v-for="(user_location, index) in user_locations" :key="index" v-if="user_location.status === 'visited'">
            <th scope="row">
              <button v-on:click="newLocationReviewUserLocationId = user_location.id" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Review
              </button>
            </th>
             <th scope="row">
              <router-link v-bind:to="'/locations/' + user_location.location_id">{{ user_location.location.name }}</router-link>
            </th>
            <th scope="row">
              {{ user_location.location.address }}
            </th>
             <th scope="row">
                visited
                <button v-on:click="destroyUserLocation(user_location)" type="button" class="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </th>
           </tr>
          </tbody>
         </table>
          
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
          <table class="table table-striped table-dark">
            <thead class="thead-light"> 
             <tr>
               <th scope="col">Mark</th>
               <th scope="col">Name</th>
               <th scope="col">Address</th>
               <th scope="col">Status</th>
             </tr>
            </thead>
            <tbody>
            <tr v-for="(user_location, index) in user_locations" :key="index" v-if="user_location.status === 'to_visit'">
              <th scope="row">
                <button v-on:click="updateStatus(user_location, index)" class="btn btn-success" type="button">
                  Visited
                </button>
              </th>
               <th scope="row">
                <router-link v-bind:to="'/locations/' + user_location.location_id">{{ user_location.location.name }}</router-link>
              </th>
              <th scope="row">
                {{ user_location.location.address }}
              </th>
               <th scope="row">
                  To Visit
                  <button v-on:click="destroyUserLocation(user_location)" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </th>
             </tr>
            </tbody>
           </table>
    </div>    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user_locations: [],
      newLocationReviewSummary: "",
      newLocationReviewWarning: "",
      newLocationReviewUserLocationId: "",
      newLocationReviewRating: "",
      errors: []
                };
  },
  created: function() {
    axios.get("/api/user_locations").then(response => {
      this.user_locations = response.data;
    });
  },
  methods: {
    destroyUserLocation: function(inputUserLocation) {
      axios.delete("/api/user_locations/" + inputUserLocation.id)
        .then(response => {
          this.user_locations = response.data;
          // console.log("Success", response.data);
          // axios.get("/api/user_locations").then(response => {
          //   this.user_locations = response.data;
          // });
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
    updateStatus: function(inputUserLocation, inputIndex) {
      var params = {
                    status: "visited"
                    };
      axios.patch("api/user_locations/" + inputUserLocation.id, params)
      .then(response => {
        this.user_locations.push(response.data);
        this.user_locations.splice(inputIndex, 1);
      })
    }
  }
};
</script>

<!-- axios.patch("/api/drones/" + this.drone.id, params)
  .then(response => {
    this.$router.push("/drones/" + this.drone.id);
  }).catch(error => {
    this.errors = error.response.data.errors;
  }); -->