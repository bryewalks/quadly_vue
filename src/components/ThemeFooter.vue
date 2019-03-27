<template>
  <footer class="footer" id="footer">
    <div class="container">
      <div class="container">
        
      <div class="row">
        <div class="col-md-4">
          <div class="title">
            Authorization
          </div>
          <ul class="menu">
            <li>
              <router-link :to="'/signup'">
                <i class="fa fa-user-plus"></i>
                Sign Up
              </router-link>
            </li>
            <li>
              <router-link :to="'/login'">
                <i class="fa fa-user"></i>
                Login
              </router-link>
            </li>
            <li>
              <router-link :to="'/logout'">
                <i class="fa fa-sign-out"></i>
                Logout
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-8" style="text-align: right;">
          <div class="title">
            Quadly
          </div>
          <ul class="menu">
            <li>
              <router-link :to="'/drones'">Drones</router-link>
            </li>
            <li>
              <router-link :to="'/locations'">All Locations</router-link>
            </li>
            <li>
              <router-link :to="'/userlocations'">Tracked Locations</router-link>
            </li>
          </ul>
        </div>
      </div>
      </div>
      <div class="bottom">
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ThemeFooter',
  props: {
  }
}
</script>

<style>
</style>