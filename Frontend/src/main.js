import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from "./routes"
import 'bootstrap/dist/css/bootstrap.min.css'
import store from "./store/store"

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  store,
  mode:"history"
})
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
