<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input v-model="searchQuery" @input="getSearchResults" type="text" placeholder="Search for a city or state" class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus: outline-none focus:shadow-[0px_1px_0_0_#004E71]">

      <ul v-if="mapboxSearchResult" class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
        <li v-for="searchResult in mapboxSearchResult" :key="searchResult.id" class="py-2 cursor-pointer">
          {{ searchResult.place_name }}
        </li>
      </ul>

    </div>
  </main>
</template>
<script setup>
// import { VueElement } from 'vue';
import { ref } from "vue";
import axios from "axios";

const mapboxAPIkey = "pk.eyJ1IjoiY2hvbmNob2w1NyIsImEiOiJjbG4ydGVrbHkwYmhkMmxua2x1bXo0MWJ0In0.OPa82SJRaq4aLQ63Ke2KQw";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResult = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout( async() => {
    if( searchQuery.value !== ""){
      const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIkey}&types=place`);

      mapboxSearchResult.value = result.data.features;
      console.log(mapboxSearchResult.value);
      return;
    }
    mapboxSearchResult.value = null;
  }, 300)
}


</script>