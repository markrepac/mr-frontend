import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import ResultsView from '../views/ResultsView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingView
    },
    { 
      path: '/error', component: ErrorView 
    },
    {
      path: '/results/:message',
      name: 'Results',
      component: ResultsView,
      props: true
    },
  ]
})

export default router
