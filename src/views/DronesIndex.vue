<template>
  <div class="drones-index">
    <div class="index-photography-drone">
    </div>

    <div id="wrapper" class="container">
     <modal v-if="modal1">
       <h3 slot="header" class="modal-title">
         New Drone
       </h3>
       <div align="center" slot="body">
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
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="true" v-model="newDroneFavorite">
              <label class="form-check-label" for="inlineCheckbox1">Favorite?</label>
            </div>
            <div>
              <input type="submit" value="Add Drone" class="btn btn-primary"> 
            </div>
          </form>
        </div>              
          <button class="btn btn-danger" @click="closeModal1()">Close</button>  
       </div>
     </modal>
    </div>

    <div id="wrapper" class="container">
     <modal v-if="modal2">
       <h3 slot="header" class="modal-title">
         Edit Drone
       </h3>
       <div align="center" slot="body">
        <div class="container">
          <form v-on:submit.prevent="submitEdit()">
            <div class="form-group">
              <label>Drone Name: </label>
              <input class='form-control' type='text' v-model="editDrone.name" placeholder="ex: Betsy">
            </div>
            <div class="form-group">
              <label>Status: </label>
              <select v-model="editDrone.status" class="form-control" id="status">
                <option value="flyable">Flyable</option>
                <option value="fixable">Fixable</option>
                <option value="trash">Trash</option>
              </select>
            <div class="form-group">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="true" v-model="editDrone.favorite">
              <label class="form-check-label" for="inlineCheckbox1">Favorite?</label>
            </div>
            </div>     
            <input @click="closeModal2()" type="submit" value="Edit Drone" class="btn btn-primary">
            <button class="btn btn-warning" @click="closeModal2(), destroyDrone(editDrone)">Delete Drone</button>  
          </form>
        </div>              
        <button class="btn btn-danger" @click="closeModal2()">Close</button>  
       </div>
     </modal>
    </div>

    <div class="container">
      
        <div class="agency-portfolio">
          <div class="container">
            <h2>
              Your Drones
            </h2>
            <div v-if="drones.length > 0" class="blog-posts-grid">
              <div class="container">
                <div class="post" v-for="(drone, index) in drones" :key="index">
                  <div class="bg" style="background-image:url('../../drone-side.jpg');">
                  </div>
                  <div @click="defineEditDrone(drone, index), openModal2()" class="info">
                   <span class="title">{{ drone.name }}</span>
                    <span class="author">{{ drone.status }}</span>
                    <span class="date" v-if="drone.favorite"><star-rating :max-rating="1"
                                                                          read-only
                                                                          :rating="1" 
                                                                          :show-rating="false"></star-rating></span>
                  </div>
                </div>
                  <h2><button @click="openModal1()" class="btn btn-success"> Add Drone</button></h2>
              </div>
            </div>
            <div v-else>
              <h2>Add some drones to your collection...</h2>
              <h2><button @click="openModal1()" class="btn btn-success"> Add Drone</button></h2>
            </div>
          </div>
        </div>
    </div>

    </div>  
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../components/Modal";

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
      editDrone: {
                id: "",
                user_id: "",
                name: "",
                favorite: "",
                status: "",
                notes: "",
                index: ""
      },
      newDroneName: "",
      newDroneFavorite: "",
      newDroneStatus: "",
      newDroneNotes: "",
      errors: [],
      user_id: "",
      modal1: false,
      modal2: false,
    };
  },
  created: function() {
    axios.get("/api/drones/").then(response => {
      this.drones = response.data;
    });
  },
  components: {
                Modal
  },
  methods: {
    destroyDrone: function(inputDrone) {
      axios.delete("/api/drones/" + inputDrone.id)
        .then(response => {
          console.log("Success", response.data);
          this.drones.splice(inputDrone.index, 1);
        });
    },
    openModal1: function() { 
      this.modal1 = true; 
    },
    closeModal1: function() {
      this.modal1 = false;
      this.errors = [];
    },
    openModal2: function() { 
      this.modal2 = true; 
    },
    closeModal2: function() {
      this.modal2 = false;
      this.errors = [];
    },
    submit: function() {
      var params = {
                    name: this.newDroneName,
                    favorite: this.newDroneFavorite,
                    status: this.newDroneStatus,
                    notes: this.newDroneNotes
                    };
                    
      axios.post("/api/drones/", params)
        .then(response => {
          this.drones.push(response.data);
          this.closeModal1();
          this.errors = [];
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    defineEditDrone: function(inputDrone, inputIndex) {
      this.editDrone = inputDrone;
      this.editDrone.index = inputIndex;
    },
    submitEdit: function() {
      var params = {
                    name: this.editDrone.name,
                    favorite: this.editDrone.favorite,
                    status: this.editDrone.status,
                    notes: this.editDrone.notes
                    };
                    
      axios.patch("/api/drones/" + this.editDrone.id, params)
        .then(response => {
          // this.drones.splice(this.editDrone.index, 1)
          // this.drones.push(response.data);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>