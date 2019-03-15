import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDKqT_CH7jObQjKYAIRukUJe9ERWl2HRHk",
    libraries: "places" // necessary for places input
  }
});

 axios.defaults.baseURL = 
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false
 
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
