import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import UserLocationsIndex from './views/UserLocationsIndex.vue'
import LocationsIndex from './views/LocationsIndex.vue'
import LocationsShow from './views/LocationsShow.vue'
import LocationsNew from './views/LocationsNew.vue'
import DronesIndex from './views/DronesIndex.vue'
import DronesShow from './views/DronesShow.vue'
import DronesNew from './views/DronesNew.vue'
import DronesEdit from './views/DronesEdit.vue'
import WeathersNew from './views/WeathersNew.vue'
import WeathersShow from './views/WeathersShow.vue'
import LocationReviewsNew from './views/LocationReviewsNew.vue'
import LocationReviewsShow from './views/LocationReviewsShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/userlocations', name: 'user-locations-index', component: UserLocationsIndex },
    { path: '/locations', name: 'locations-index', component: LocationsIndex },
    { path: '/locations/new', name: 'locations-new', component: LocationsNew },
    { path: '/locations/:id', name: 'locations-show', component: LocationsShow },
    { path: '/locationreviews/new', name: 'location-reviews-new', component: LocationReviewsNew },
    { path: '/locationreviews/:id', name: 'location-reviews-show', component: LocationReviewsShow },
    { path: '/drones', name: 'drones-index', component: DronesIndex },
    { path: '/drones/new', name: 'drones-new', component: DronesNew },
    { path: '/drones/:id', name: 'drones-show', component: DronesShow },
    { path: '/drones/:id/edit', name: 'drones-edit', component: DronesEdit },
    { path: '/weathers/new', name: 'weathers-new', component: WeathersNew },
    { path: '/weathers/:id', name: 'weathers-show', component: WeathersShow }
  ]
})
