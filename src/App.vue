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

  export default {
    name: "App",
    components: {
      NavBar,
      ThemeFooter,
      Modal
    },
    data() { 
      return { 
      } 
    }
  };
</script>
