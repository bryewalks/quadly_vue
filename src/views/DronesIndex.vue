<template>
  <div class="drones-index">
    <div class="container">
      <h1>Your Drones</h1>
      <router-link class="btn btn-success"  to="/drones/new"> Add Drone</router-link>
      <div v-for="drone in drones">     
        <h2><router-link v-bind:to="'/drones/' + drone.id">{{ drone.name }}</router-link></h2>
        <p>Favorite: {{ drone.favorite }}</p>
        <p>Status: {{ drone.status }}</p>
        <p>Notes: {{ drone.notes }}</p>
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
      drones: [],
      user_id: ""
    };
  },
  created: function() {
    axios.get("/api/drones/").then(response => {
      this.drones = response.data;
    });
  },
  methods: {
    destroyDrone: function(inputDrone) {
      axios.delete("/api/drones/" + inputDrone.id)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/drones");
        });
    },
  }
};
</script>