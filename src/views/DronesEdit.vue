<template>
  <div class="drones-edit">

    <ul>
      <li v-for="error in errors"> {{ error }} </li>
    </ul>

    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>Drone Name: </label>
          <input class='form-control' type='text' v-model="drone.name" placeholder="ex: Betsy">
        </div>
        <div class="form-group">
          <label>Favorite: </label>
          <input class='form-control' type='text' v-model="drone.favorite" placeholder="ex: yes">
        </div>
        <div class="form-group">
          <label>Status: </label>
          <input class='form-control' type='text' v-model="drone.status" placeholder="ex: flyable">
        </div>
        <div class="form-group">
          <label>Notes: </label>
          <input class='form-control' type='text' v-model="drone.notes" placeholder="ex: Fix something">
        </div>        
        <input type="submit" value="Add New location" class="btn btn-primary">
      </form>
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
            name: "",
            favorite: "",
            status: "",
            notes: ""
             },
      errors: []
    };
  },
  created: function() {
    axios.get("/api/drones/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.drone = response.data;
      });
  },
  methods: {
    submit: function() {
      var params = {
                    name: this.drone.name,
                    favorite: this.drone.favorite,
                    status: this.drone.status,
                    notes: this.drone.notes
                    };
                    
      axios.patch("/api/drones/" + this.drone.id, params)
        .then(response => {
          this.$router.push("/drones/" + this.drone.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>