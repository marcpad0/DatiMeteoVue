import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BestView from '../views/BestView.vue'
import RegioniView from '../views/RegioniView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/classifica',
    name: 'classifica',
    component: BestView  // Ensure this component is correctly referenced
  },
  {
    path: '/regioni',
    name: 'regioni',
    component: RegioniView  // Ensure this component is correctly referenced
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
