<template>
  <div class="user-locations-index">
    <div class="container">
      <h1>Your Tracked Locations</h1>
          <table class="table table-striped table-dark">
            <thead class="thead-light"> 
             <tr>
               <th scope="col">Name</th>
               <th scope="col">Address</th>
               <th scope="col">Status</th>
             </tr>
            </thead>
            <tbody>
            <tr v-for="user_location in user_locations">
               <th scope="row">
                <router-link v-bind:to="'/locations/' + user_location.location_id">{{ user_location.location.name }}</router-link>
              </th>
              <th scope="row">
                {{ user_location.location.address }}
              </th>
               <th scope="row">
                {{ user_location.status }}
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
      user_locations: []
      // location_reviews: []
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
          console.log("Success", response.data);
        });
    }
  }
};
</script>