import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from "../views/login/SignIn.vue"
import SignUp from "../views/login/SignUp.vue"
import Patient from "../views/patient/patient.vue"

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/homePage')
  },
  {
    path: '/diagnose',
    name: 'stepsPage',
    component: () => import('../views/steps/steps'),
  },{
    path: '/popularization',
    name: 'sciencePopularization',
    component: () => import('../views/sciencePopularization')
  },
  {
    path: '/login',
    name: 'SignIn',
    component:SignIn
  },
  {
    path: '/register',
    name: 'SignUp',
    component:SignUp
  },
  {
    path: '/patient',
    name: 'Patient',
    component:Patient

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
