import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Landingpage from '../views/Landingpage.vue'

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
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
