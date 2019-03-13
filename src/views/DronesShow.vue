<template>
  <div class="drones-show">
    <div class="container">
      <h1>{{ drone.name }}</h1>
      <p>Favorite: {{ drone.favorite }}</p>
      <p>Status: {{ drone.status }}</p>
      <p>Notes: {{ drone.notes }}</p>
      <button v-on:click="destroyDrone()" class="btn btn-danger">Delete</button>
      </div>
    </div>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      drone: {},
      user_id: ""
    };
  },
  created: function() {
    axios.get("/api/drones/" + this.$route.params.id).then(response => {
      this.drone = response.data;
    });
  },
  methods: {
    destroyDrone: function() {
      axios.delete("/api/drones/" + this.drone.id)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/drones");
        });
    },
  }
};
</script>