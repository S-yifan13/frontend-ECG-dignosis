import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/homePage')
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import('../views/login/SignIn.vue'),
    meta: {
        requireNotAuth: true,
        noNav: true
    }
},
{
    path: '/register',
    name: 'SignUp',
    component: () => import('../views/login/SignUp.vue'),
    meta: {
        requireNotAuth: true,
        noNav: true
    }
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
