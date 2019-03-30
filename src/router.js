import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import UserLocationsIndex from './views/UserLocationsIndex.vue'
import LocationsIndex from './views/LocationsIndex.vue'
import LocationsShow from './views/LocationsShow.vue'
import DronesIndex from './views/DronesIndex.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    // { path: '/about', name: 'about', component: About },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/userlocations', name: 'user-locations-index', component: UserLocationsIndex },
    { path: '/locations', name: 'locations-index', component: LocationsIndex },
    { path: '/locations/:id', name: 'locations-show', component: LocationsShow },
    { path: '/drones', name: 'drones-index', component: DronesIndex },
    { path: '*', redirect: '/' }
  ]
})
