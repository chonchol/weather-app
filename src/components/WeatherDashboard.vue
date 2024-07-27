<script>
import axios from 'axios'
import InputLocation from '../components/InputLocation.vue'

export default {
  components: {
    InputLocation
  },
  props: ['weatherData'],

  data() {
    return {
      name: '',
      country: '',
      localtime: '',
      weatherInfo: this.weatherData
    }
  },

  watch: {
    weatherInfo(newVal, oldVal) {
      if (newVal == null) {
        newVal = oldVal
      }
      return newVal
    }
  },

  methods: {
    async getForecast(newData) {
      if (newData == null) {
        newData = this.weatherData
      }

      const apiKey = 'd1e73c9d8c8e4079bd784955242406'
      this.weatherInfo = newData

      const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${this.weatherInfo}&days=3`

      try {
        const response = await axios.get(url)

        const locationData = response.data.location
        const currentData = response.data.current
        const forecastData = response.data.forecast

        this.name = locationData.name
        this.country = locationData.country
        this.localtime = locationData.localtime
        this.conditionText = currentData.condition.text
        this.conditionWindDeg = currentData.wind_degree
        this.conditionImg = currentData.condition.icon
        this.conditionTemp = currentData.temp_c
        this.conditionTempFeel = currentData.feelslike_c
        this.conditionWind = currentData.wind_kph
        this.conditionUV = currentData.uv
        this.conditionHumadity = currentData.humidity
        this.conditionCloud = currentData.cloud
        this.conditionWindDir = currentData.wind_dir

        this.fDatas = response.data.forecast.forecastday

        this.forecastMax = forecastData.forecastday['0'].day.maxtemp_c
        this.forecastMin = forecastData.forecastday['0'].day.mintemp_c
      } catch (error) {
        console.error(error)
      }
    }
  },
  beforeMount() {
    this.getForecast()
  }
}
</script>

<template>
  <div class="dashboard p-3 flex flex-col md:flex-row">
    <div class="left-dash mr-10 md:w-2/5 w-full">
      <div class="form-area bg-gray-800 flex items-normal py-6 px-1">
        <RouterLink to="/"
          ><img src="../assets/images/Logo-s.svg" alt="" class="bg-gray-600 rounded p-2 mr-4"
        /></RouterLink>
        <InputLocation @update:data="getForecast" />
      </div>
      <div class="detail-area flex flex-col justify-between rounded">
        <div class="top-detail flex justify-between items-center">
          <div class="location p-10">
            <h3 class="text-2xl font-bold">{{ name }}, {{ country }}</h3>
            <p>{{ localtime }}</p>
          </div>
          <div class="time font-medium p-10">
            <p>Feels: {{ conditionTempFeel }}ºc</p>
          </div>
        </div>
        <div class="bottom-detail flex justify-between items-center">
          <div class="temparature p-10">
            <h2 class="text-7xl font-bold">{{ conditionTemp }}ºc</h2>
            <p class="mt-2">{{ forecastMax }}ºc/{{ forecastMin }}ºc .{{ conditionText }}</p>
          </div>
          <div class="wea-img-all p-10">
            <img :src="conditionImg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="right-dash md:w-3/5 w-full">
      <div class="top-section bg-gray-800 rounded p-6">
        <p class="text-gray-400 text-2xl mb-4">Climate details</p>
        <div class="flex justify-between items-center py-4">
          <div class="flex justify-between items-center">
            <img src="../assets/images/temparature.svg" alt="" />
            <p class="ml-3 text-gray-200 font-medium">Wind Degree</p>
          </div>
          <p class="text-gray-100 text-2xl font-medium">{{ conditionWindDeg }}</p>
        </div>
        <hr class="text-hrline" />
        <div class="flex justify-between items-center py-4">
          <div class="flex justify-between items-center">
            <img src="../assets/images/Icons-2.svg" alt="" />
            <p class="ml-3 text-gray-200 font-medium">Probability of Rain</p>
          </div>
          <p class="text-gray-100 text-2xl font-medium">{{ conditionCloud }} %</p>
        </div>
        <hr class="text-hrline" />
        <div class="flex justify-between py-4">
          <div class="flex justify-between">
            <img src="../assets/images/Icons-3.svg" alt="" />
            <p class="ml-3 text-gray-200 font-medium">Wind speed</p>
          </div>
          <p class="text-gray-100 text-2xl font-medium">{{ conditionWind }} km/h</p>
        </div>
        <hr class="text-hrline" />
        <div class="flex justify-between py-4">
          <div class="flex justify-between">
            <img src="../assets/images/Icons-4.svg" alt="" />
            <p class="ml-3 text-gray-200 font-medium">Air humidity</p>
          </div>
          <p class="text-gray-100 text-2xl font-medium">{{ conditionHumadity }} %</p>
        </div>
        <hr class="text-hrline" />
        <div class="flex justify-between py-4">
          <div class="flex justify-between">
            <img src="../assets/images/Icons-5.svg" alt="" />
            <p class="ml-3 text-gray-200 font-medium">UV Index</p>
          </div>
          <p class="text-gray-100 text-2xl font-medium">{{ conditionUV }}</p>
        </div>
      </div>
      <div class="bottom-section bg-gray-800 rounded p-6 mt-6">
        <p class="text-gray-400 text-2xl mb-4">3 day forecast</p>
        <div class="flex justify-between">
          <div class="flex flex-col items-center text-center" v-for="forecastday in fDatas">
            <p class="text-gray-200 font-medium">{{ forecastday.date }}</p>
            <img :src="forecastday.day.condition.icon" alt="" />
            <p class="text-gray-200">{{ forecastday.day.condition.text }}</p>
            <p class="text-gray-100 font-medium">
              {{ forecastday.day.maxtemp_c }}ºc
              <span class="text-gray-400">{{ forecastday.day.mintemp_c }}ºc</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/deep/ input {
  width: 450px;
}
@media only screen and (max-width: 640px) {
  /deep/ input {
    width: 295px;
  }
}
</style>
