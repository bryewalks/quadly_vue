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

      <div class="collapse navbar-collapse justify-content-end" id="navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <router-link :to="'/drones'" class="nav-link dropdown-toggle">
              Drones
            </router-link>
          </li>
          <li class="nav-item active dropdown">
            <p class="nav-link dropdown-toggle" data-toggle="dropdown">
              Locations
              <i class="ion-chevron-down"></i>
            </p>
            <div class="dropdown-menu" role="menu">
              <router-link class="dropdown-item" :to="'/locations'">All Locations</router-link>
              <router-link class="dropdown-item" :to="'/userlocations'">Tracked Locations</router-link>
            </div>
          </li>
          <li class="nav-item active dropdown">
            <p class="nav-link dropdown-toggle" data-toggle="dropdown">
              Authorization
              <i class="ion-chevron-down"></i>
            </p>
            <div class="dropdown-menu" role="menu">
              <router-link class="dropdown-item" :to="'/signup'">Sign Up</router-link>
              <router-link class="dropdown-item" :to="'/login'">Login</router-link>
              <router-link class="dropdown-item" :to="'/logout'">Logout</router-link>
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
export default {
  name: 'NavBar',
  props: {
  }
}
</script>

<style>
</style>