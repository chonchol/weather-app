<script setup>
import InputLocation from '../components/InputLocation.vue'
</script>

<template>
  <header class="flex justify-center items-center">
    <img alt="Vue logo" class="logo" src="../assets/images/Logo.svg" />
  </header>
  <div class="flex flex-col justify-center items-center text-white pt-28">
    <h2 class="text-4xl leading-10">Welcome to <span class="text-primary">TypeWeather</span></h2>
    <p class="pt-4 pb-16">Choose a location to view the weather forecast</p>

    <InputLocation />
  </div>
</template>

<style>
/* input {
  width: 600px;
} */
</style>
