import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LocationView from '../views/LocationView.vue';
import CityView from '../views/CityView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/weather/:state/:city',
      name: 'cityview',
      component: CityView
    },
    {
      path: '/location',
      name: 'Location',
      component: LocationView
    }
  ]
})

export default router
