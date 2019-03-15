<template>
  <div class="locations-show">
    <div class="container">
      <h1>Location</h1>
      <h2>{{ location.name }}</h2>
      <div class="container">
        <button v-on:click="submit(visited)" class="btn btn-primary">Visited</button>
        <button v-on:click="submit(toVisit)" class="btn btn-secondary">Want to Visit</button>
      </div>  
      <p>Address: {{ location.address }}</p>
      <p>Latitude: {{ location.position.lat }}</p>
      <p>Longitude: {{ location.position.lng }}</p>
      <p>Status: {{ location.flight_zone_status }}</p>
      <div v-if="location.location_reviews" v-for="location_review in location.location_reviews">
        <p>Review</p>
        <p>Rating: {{ location_review.rating }}</p>
        <p>Summary: {{ location_review.summary }}</p>
        <p>Warning: {{ location_review.warning }}</p>
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
      location: {},
      newUserLocationsStatus: "",
      user_id: "",
      visited: "visited",
      toVisit: "to_visit",
      admin: ""
    };
  },
  created: function() {
    this.user_id = localStorage.getItem("user_id");
    axios.get("/api/locations/" + this.$route.params.id).then(response => {
      this.location = response.data;
    });
  },
  methods: {},
    submit: function(inputStatus) {
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
    }
  };
</script>