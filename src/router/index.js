import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from "../views/login/SignIn.vue"
import SignUp from "../views/login/SignUp.vue"

Vue.use(VueRouter)


const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/homePage')
  },
  {
    path: '/',
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
