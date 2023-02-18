import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/homePage"
import SignIn from "../views/login/SignIn.vue"
import SignUp from "../views/login/SignUp.vue"

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
