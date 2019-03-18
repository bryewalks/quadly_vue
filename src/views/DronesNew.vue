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
          <label for="status">Drone Condition</label>
          <select v-model="newDroneStatus" class="form-control" id="status">
            <option value="flyable">Flyable</option>
            <option value="fixable">Fixable</option>
            <option value="trash">Trash</option>
          </select>
        </div>
        <div class="form-group">
          <label>Notes: </label>
          <input class='form-control' type='text' v-model="newDroneNotes" placeholder="ex: Fix something">
        </div>        
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="true" v-model="newDroneFavorite">
          <label class="form-check-label" for="inlineCheckbox1">Favorite?</label>
        </div>
        <input type="submit" value="Add Drone" class="btn btn-primary">
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