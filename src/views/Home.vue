<template>
    <div class="weathers-new">       
        <ul>
          <li v-for="error in errors"> {{ error }} </li>
        </ul>

        <div class='container'>
          <h1>Input Current Weather:</h1>

          <form v-on:submit.prevent="submit()">
            <input type="submit" value="Check Weather" class="btn btn-primary">
          </form>
        </div>
      </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      location: {
                  id: "",
                  position: {
                            lat: 10,
                            lng: 10
                            }
                },
      errors: []
    };
  },
  created: function() {},
  methods: {
    submitStatus: function(inputStatus) {
      var params = {
                    user_id: this.user_id,
                    location_id: this.location.id,
                    status: inputStatus
                    };
                    
      axios.post("/api/user_locations/", params)
        .then(response => {
          this.$router.push("/userlocations/");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    submit: function() {
      var params = {
                    search_lat: this.location.position.lat,
                    search_lng: this.location.position.lng
                    };
                    
      axios.post("/api/weathers/", params)
        .then(response => {
          this.$router.push("/weathers/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
     }    
    }
  };
</script>