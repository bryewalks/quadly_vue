<template>
  <div class="locations-show">
    <div class="container">
      <h1>Location</h1>
      <h2>{{ location.name }}</h2>
      <p>Address: {{ location.address }}</p>
      <p>Latitude: {{ location.latitude }}</p>
      <p>Longitude: {{ location.longitude }}</p>
      <p>Longitude: {{ location.user_id }}</p>
      <p>Status: {{ location.flight_zone_status }}</p>
      <button v-on:click="destroyLocation()" class="btn btn-danger">Delete</button>
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
      user_id: "",
      admin: ""
    };
  },
  created: function() {
    this.admin = localStorage.getItem("admin");
    console.log(this.admin);
    axios.get("/api/locations/" + this.$route.params.id).then(response => {
      this.location = response.data;
    });
  },
  methods: {
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