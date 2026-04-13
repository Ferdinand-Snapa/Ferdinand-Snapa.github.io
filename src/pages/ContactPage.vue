<script setup>
import FerdImg from '../assets/img/_DSC4963.JPG'

</script>

<template>
    <div class="mt-28 mx-20 flex flex-col md:flex-row gap-8">
        <!-- Image Section -->
        <div class="w-full md:w-1/2 flex items-center justify-center">
            <img :src="FerdImg" class="w-full h-auto object-cover rounded-lg">
        </div>

        <!-- Contact Information Section -->
        <div class="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-6">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-4 w-full text-md md:text-xl">
                <div class="flex flex-col items-center md:items-start">
                    <h2 class="text-xl font-semibold">Email</h2>
                    <p class="text-gray-600 dark:text-background">ferdinand@snapa.no</p>
                </div>

                <div class="flex flex-col items-center md:items-start">
                    <h2 class="text-xl font-semibold">Phone</h2>
                    <p class="text-gray-600 dark:text-background">+47 916 32 442</p>
                </div>

                <div class="flex flex-col items-center md:items-start">
                    <h2 class="text-xl font-semibold">Location</h2>
                    <p class="text-gray-600 dark:text-background">Sørumsand, Akerhus</p>
                    <p class="text-gray-600 dark:text-background">15 min → Lillestrøm</p>
                    <p class="text-gray-600 dark:text-background">30 min → Oslo S</p>
                </div>

                <div class="flex flex-col items-center md:items-start">
                    <h2 class="text-xl font-semibold">Social Media</h2>
                    <div class="flex gap-4">
                        <a href="https://www.linkedin.com/in/ferdinand-snapa-a61576285/" class="text-blue-500 hover:text-blue-700">LinkedIn</a>
                        <a href="https://github.com/Ferdinand-Snapa" class="text-blue-500 hover:text-blue-700">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>