<template>
  <div class="locations-new">
   
    <ul>
      <li v-for="error in errors"> {{ error }} </li>
    </ul>

    <div class='container'>
      <h1>Add New location:</h1>

      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>Location Name: </label>
          <input class='form-control' type='text' v-model="newLocationName" placeholder="ex: Afton Park">
        </div>
        <div class="form-group">
          <label>Location Address: </label>
          <input class='form-control' type='text' v-model="newLocationAddress" placeholder="ex: 8725 Elva Rd Dekalb, Il">
        </div>
        <div class="form-group">
          <label>Latitude: </label>
          <input class='form-control' type='text' v-model="newLocationLatitude" placeholder="ex: 41.9295">
        </div>
        <div class="form-group">
          <label>Longitude: </label>
          <input class='form-control' type='text' v-model="newLocationLongitude" placeholder="ex: 88.7504">
        </div>        
        <div class="form-group">
          <label>Flight Zone Status: </label>
          <input class='form-control' type='text' v-model="newLocationFlightZoneStatus" placeholder="ex: Real good at driving">
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
      newLocationName: "",
      newLocationAddress: "",
      newLocationLatitude: "",
      newLocationLongitude: "",
      newLocationFlightZoneStatus: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
                    name: this.newLocationName,
                    address: this.newLocationAddress,
                    latitude: this.newLocationLatitude,
                    longitude: this.newLocationLongitude,
                    flight_zone_status: this.newLocationFlightZoneStatus
                    };
                    
      axios.post("/api/locations/", params)
        .then(response => {
          this.$router.push("/locations/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>