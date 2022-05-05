import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Landingpage from '../views/Landingpage.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Landingpage',
    component: Landingpage
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
