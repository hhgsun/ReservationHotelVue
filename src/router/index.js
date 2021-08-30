import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hotels from '../views/Hotels.vue'
import ResultHotels from '../views/ResultHotels.vue'
import Reservations from '../views/Reservations.vue'
import { getAuth } from "firebase/auth";

Vue.use(VueRouter)

const authenticated = (to, from, next) => {
  getAuth().onAuthStateChanged((user) => {
    if (user != null) {
      next()
      return
    } else {
      next('/')
      return
    }
  });
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/hotels',
    name: 'Hotels',
    component: Hotels,
    beforeEnter: authenticated
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: Reservations,
    beforeEnter: authenticated
  },
  {
    path: '/result/:city/:start/:end',
    name: "ResultHotels",
    component: ResultHotels
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})


export default router
