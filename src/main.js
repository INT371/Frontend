import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import store from './store'

 
const app = createApp(App).use(store)
app.component('nav-bar',Navbar)
app.component('foo-ter',Footer)

app.use(router).mount('#app')


