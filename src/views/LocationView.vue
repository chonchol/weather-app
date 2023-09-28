<template>
    <div>
      <button @click="getLocation">Get Location</button>
      <p>Latitude: {{ latitude }}</p>
      <p>Longitude: {{ longitude }}</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      latitude: null,
      longitude: null,
    };
  },
  methods: {
    getLocation() {
      if ("geolocation" in navigator) {
        // Get the user's location
        navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback);
      } else {
        alert("Geolocation is not available in this browser.");
      }
    },
    successCallback(position) {
      // Extract latitude and longitude from the position object
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    errorCallback(error) {
      console.error("Error getting location:", error);
    },
  },
};
</script>
