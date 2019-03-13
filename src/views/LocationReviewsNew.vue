<template>
  <div class="location-reviews-new">

    <ul>
      <li v-for="error in errors"> {{ error }} </li>
    </ul>

    <div class="container">
      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>Summary: </label>
          <input class='form-control' type='text' v-model="newLocationReviewSummary" placeholder="ex: Betsy">
        </div>
        <div class="form-group">
          <label>Warning: </label>
          <input class='form-control' type='text' v-model="newLocationReviewWarning" placeholder="ex: yes">
        </div>
        <div class="form-group">
          <label>User Location ID: </label>
          <input class='form-control' type='text' v-model="newLocationReviewUserLocationId" placeholder="ex: flyable">
        </div>      
        <input type="submit" value="Review Location" class="btn btn-primary">
      </form>
    </div>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newLocationReviewSummary: "",
      newLocationReviewWarning: "",
      newLocationReviewUserLocationId: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function() {
      var params = {
                    summary: this.newLocationReviewSummary,
                    warning: this.newLocationReviewWarning,
                    user_location_id: this.newLocationReviewUserLocationId
                    };
                    
      axios.post("/api/location_reviews/", params)
        .then(response => {
          this.$router.push("/location_reviews/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>