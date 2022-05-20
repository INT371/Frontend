import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Landingpage from '../views/Landingpage.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import ShowRoom from '../views/ShowRoom.vue'
import SingleRoom from '../views/SingleRoom.vue'
import ManagePanel from '../views/ManagePanel.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  } ,
   {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/showroom',
    name: 'Showroom',
    component: ShowRoom
  },
  {
    path: '/room/:singleRoom',
    name: 'singleRoom',
    component: SingleRoom,
    props: true
  },
  {
    path: '/manage',
    name:'ManagePanel',
    component: ManagePanel
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
