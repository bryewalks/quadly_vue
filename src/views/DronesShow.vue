<template>
  <div class="drones-show">
    <div class="container">
      <h1>{{ drone.name }}</h1>
      <p>Favorite: {{ drone.favorite }}</p>
      <p>Status: {{ drone.status }}</p>
      <p>Notes: {{ drone.notes }}</p>
      <button v-if="user_id == drone.user_id" v-on:click="destroyDrone()" class="btn btn-danger">Delete</button>
      <router-link v-if="user_id == drone.user_id" v-bind:to="'/drones/' + drone.id + '/edit'">Edit</router-link>
      </div>
    </div>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      drone: {
              id: "",
              user_id: "",
              name: "",
              favorite: "",
              status: "",
              notes: ""
      },
      user_id: ""
    };
  },
  created: function() {
    this.user_id = localStorage.getItem("user_id");
    console.log(this.user_id)
    axios.get("/api/drones/" + this.$route.params.id).then(response => {
      this.drone = response.data;
      console.log(this.drone.user_id);
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