<template>
  <div class="locations-new">
   
    <ul>
      <li v-for="error in errors"> {{ error }} </li>
    </ul>

    <div class='container'>
      <h1>Add New location:</h1>
      <p>
        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Button with data-target
        </button>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </div>

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
          <label for="status">Flight Zone Status</label>
          <select v-model="newLocationFlightZoneStatus" class="form-control" id="status">
            <option value="no_flight_zone">No Flight Zone</option>
            <option value="flight_zone">Flight Zone</option>
            <option value="requires_authorization">Requires Authorization</option>
          </select>
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