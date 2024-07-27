<script>
import axios from 'axios'

export default {
  data() {
    return {
      location: '',
      suggestions: []
    }
  },

  methods: {
    async fetchSuggestions() {
      const apKey = 'd1e73c9d8c8e4079bd784955242406'
      if (this.location.length > 2) {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${apKey}&q=${this.location}`
        )
        this.suggestions = response.data.map((loc) => `${loc.name}, ${loc.region} - ${loc.country}`)
      } else {
        this.suggestions = []
      }
    },
    async selectSuggestion(suggestion) {
      this.location = suggestion
      this.suggestions = []

      setTimeout(async () => {
        await this.getWeather()
        this.location = ''
      }, 2000)
    },
    async getWeather() {
      const apiKey = 'd1e73c9d8c8e4079bd784955242406'
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.location}`

      try {
        const response = await axios.get(url)

        this.$emit('update:data', response.data.location.name)
        this.$router.push({
          name: 'WeatherDashboard',
          params: { weatherData: response.data.location.name }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="relative">
      <input
        type="text"
        v-model="location"
        @input="fetchSuggestions"
        name=""
        id=""
        placeholder="Search location"
        class="p-4 rounded bg-gray-600"
      />

      <div class="icon-container" v-if="location.length > 2">
        <img src="../assets/images/loader.svg" alt="" />
      </div>
    </div>

    <div class="suggestions" v-if="suggestions.length">
      <div
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="selectSuggestion(suggestion)"
        class="suggestion"
      >
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  width: 600px;
}
.suggestions {
  min-width: auto;
}
@media only screen and (max-width: 640px) {
  input {
    width: 295px;
  }
}
</style>
