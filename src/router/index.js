import { createRouter, createWebHistory } from 'vue-router'
import WeatherDashboard from '../components/WeatherDashboard.vue'
import SearchWeather from '../components/SearchWeather.vue'

const routes = [
  {
    path: '/',
    name: 'SearchWeather',
    component: SearchWeather
  },
  {
    path: '/weatherinfo/:weatherData',
    name: 'WeatherDashboard',
    component: WeatherDashboard,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
