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
      } 
    }
  };
</script>
