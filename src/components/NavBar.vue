<template>
  <nav class="navbar navbar-expand-lg navbar-dark" role="navigation">
    <div class="container no-override">
      <router-link class="navbar-brand" :to="'/'">
        <img src="/images/logo-alt-w.png" class="d-none d-lg-inline mr-2 w-25" />
        Quadly
      </router-link>
      <button class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div v-if="currentUser" class="collapse navbar-collapse justify-content-end" id="navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <router-link :to="'/drones'" class="nav-link dropdown-toggle">
              Drones
            </router-link>
          </li>
          <li class="nav-item active dropdown">
            <router-link :to="'/locations'" class="nav-link dropdown-toggle" data-toggle="dropdown">
              Locations
              <i class="ion-chevron-down"></i>
            </router-link>
            <div class="dropdown-menu" role="menu">
              <router-link class="dropdown-item" :to="'/locations'">All Locations</router-link>
              <router-link class="dropdown-item" :to="'/userlocations'">Tracked Locations</router-link>
            </div>
          </li>
          <li class="nav-item active dropdown">
            <router-link :to="'/logout'" class="nav-link">
              Logout
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link--rounded" :to="'/'">Home</router-link>
          </li>
        </ul>
      </div>

      <div v-else class="collapse navbar-collapse justify-content-end" id="navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="'/locations'" class="nav-link">
              Locations
            </router-link>
          </li>
          <li class="nav-item active dropdown">
            <router-link :to="'/login'" class="nav-link dropdown-toggle" data-toggle="dropdown">
              Login
              <i class="ion-chevron-down"></i>
            </router-link>
            <div class="dropdown-menu" role="menu">
              <router-link class="dropdown-item" :to="'/login'">Login</router-link>
              <router-link class="dropdown-item" :to="'/signup'">Sign Up</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link--rounded" :to="'/'">Home</router-link>
          </li>
        </ul>
      </div>


    </div>
  </nav>
</template>

<script>
import { eventBus } from '../main.js';

export default {
  name: 'NavBar',
  data: function() { 
    return {
            currentUser: ""
    } 
  },
  created: function() {
    eventBus.$on('currentUser', (data) => {
      this.currentUser = data;
    })
  }
}
</script>

<style>
</style>