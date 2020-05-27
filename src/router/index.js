import Vue from 'vue'
import Router from '../vue-router.js'
import Home from '../components/home.vue'
import About from '../components/about.vue'
Vue.use(Router)
export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
