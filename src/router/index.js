import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/homePage')
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('../views/login/login')
  },
  {
    path: '/',
    name: 'stepsPage',
    component: () => import('../views/steps/steps')
  },{
    path: '/popularization',
    name: 'sciencePopularization',
    component: () => import('../views/sciencePopularization')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
