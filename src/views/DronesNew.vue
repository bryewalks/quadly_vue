<template>
  <div class="drones-new">

    <ul>
      <li v-for="error in errors"> {{ error }} </li>
    </ul>

    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>Drone Name: </label>
          <input class='form-control' type='text' v-model="newDroneName" placeholder="ex: Betsy">
        </div>
        <div class="form-group">
          <label>Favorite: </label>
          <input class='form-control' type='text' v-model="newDroneFavorite" placeholder="ex: yes">
        </div>
        <div class="form-group">
          <label>Status: </label>
          <input class='form-control' type='text' v-model="newDroneStatus" placeholder="ex: flyable">
        </div>
        <div class="form-group">
          <label>Notes: </label>
          <input class='form-control' type='text' v-model="newDroneNotes" placeholder="ex: Fix something">
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
      newDroneName: "",
      newDroneFavorite: "",
      newDroneStatus: "",
      newDroneNotes: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
                    name: this.newDroneName,
                    favorite: this.newDroneFavorite,
                    status: this.newDroneStatus,
                    notes: this.newDroneNotes
                    };
                    
      axios.post("/api/drones/", params)
        .then(response => {
          this.$router.push("/drones/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>