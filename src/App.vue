<template>
  <div id="app">
    <NavBar/>
    <router-view/>
    <ThemeFooter/>
  </div>
</template>

<style>
</style>
<script>
  import NavBar from "./components/NavBar";
  import ThemeFooter from "./components/ThemeFooter";
  import Modal from "./components/Modal";
  import MapNavBar from "./components/MapNavBar";
  import { eventBus } from './main.js';


  export default {
    name: "App",
    components: {
      NavBar,
      MapNavBar,
      ThemeFooter,
      Modal
    },
    data() { 
      return {
        user_id: ""
      } 
    },
    mounted: function() {
      this.user_id = localStorage.getItem("user_id");
      eventBus.$emit('currentUser', this.user_id );
    },
  };
</script>