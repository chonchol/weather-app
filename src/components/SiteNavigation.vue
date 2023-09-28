<template>
    <header class="sticky top-0 bg-weather-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink :to="{ name: 'home'}">
                <div class="flex item-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">The Local Weather</p>
                </div>
            </RouterLink>  
            <div class="flex gap-3 flex-1 justify-end">
                <i class="fa-solid fa-circle-info text-xl hover:bg-weather-secondary duration-150 cursor-pointer" @click="toggleModal"></i>
                <i class="fa-solid fa-plus text-xl duration-150 cursor-pointer"></i>
            </div>
            <BaseModal :modalActive = "modalActive" @close-modal="toggleModal">
                <div class="text-black w-500 p-4 rounded">
                    <h4 class="text-2xl mb-1">About:</h4>
                    <p class="mb-4">The Local Weather allows you to track the current and future weather of cities of your choosing.</p>

                    <h4 class="text-2xl mb-1">How it works:</h4>
                    <ol class="list-decimal list-inside mb-4">
                        <li>Search for your city by entering the name into the search bar.</li>
                        <li>Select a city within the results, this will take you to the current weather for your selection.</li>
                        <li>Track the city by clicking on the "+" icon in the top right. This will save the city to view at a later time on the home page.</li>
                    </ol>

                    <h4 class="text-2xl mb-1">Removing a city</h4>
                    <p class="mb-4">If you no longer wish to track a city, simply select the city within the home page. At the bottom of the page, there will be am option to delete the city.</p>
                </div>

            </BaseModal>   
        </nav>
    </header>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
    import BaseModal from './BaseModal.vue';
    import { ref } from 'vue';

    const modalActive = ref(null);

    const toggleModal = () => {
        modalActive.value = !modalActive.value;
        console.log(modalActive.value)
    }
</script>

<style lang="scss" scoped>

</style>