<template>
  <div class="drones-index">
    <div class="index-photography-drone">
    </div>



<div class="container">
  
    <div class="agency-portfolio">
      <div class="container">
        <h2>
          Your Drones
        </h2>
        <div class="blog-posts-grid">
          <div class="container">
            <div class="post" v-for="drone in drones">
              <div class="bg" style="background-image:url('../../drone-side.jpg');">
              </div>
              <router-link v-bind:to="'/drones/' + drone.id + '/edit/'" class="info">
                <span class="title">{{ drone.name }}</span>
                <span class="author">{{ drone.status }}</span>
                <span class="date" v-if="drone.favorite"><star-rating :max-rating="1"
                                                                      read-only
                                                                      :rating="1" 
                                                                      :show-rating="false"></star-rating></span>
              </router-link>
            </div>
              <h2><router-link class="btn btn-success"  to="/drones/new"> Add Drone</router-link></h2>
          </div>
        </div>
      </div>
    </div>
</div>


















<!-- 


    <div class="container">
      <h1>Your Drones</h1>
      <div v-for="drone in drones">     
        <h2><router-link v-bind:to="'/drones/' + drone.id">{{ drone.name }}</router-link></h2>
        <p>Favorite: {{ drone.favorite }}</p>
        <p>Status: {{ drone.status }}</p>
        <p>Notes: {{ drone.notes }}</p>
      </div>
      </div> -->
    </div>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      drones: [{
                id: "",
                user_id: "",
                name: "",
                favorite: "",
                status: "",
                notes: ""

      }],
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