<script setup>
    import { useDateFormat } from '@vueuse/core';
import { data } from '../components/store.vue';
    import SwipeCards from '../components/SwipeCards.vue'
</script>

<template>
    <div class="flex flex-col mt-[16vh] w-screen">
        <h1 class="ml-14 text-primary dark:text-dark-primary">{{ data.prefLang === 'no' ? 'Om meg' : 'About me' }}</h1>
        <h2 class="ml-14 text-2xl text-dark dark:text-light"> {{ data.prefLang === 'no' ? 
        'om meg norsk' : 
        'Learning about the world around me is my greatest obsession, be it picking apart my toys as a child or the countless hours I have spent watching dev-logs, learning from all and implementing the designs into my own creations and ideas, noting them down like small personal artworks.' }}</h2>
        <h2 class="ml-14 mt-2 text-2xl text-dark dark:text-light mb-24"> {{ data.prefLang === 'no' ? 'no' : 'I got a taste for programming from a young age, between RPG maker and Minecraft modding, leading to one of my first projects, where I tried to create a portable emulator, combining a Raspberry PI, small LCD display, Xbox controller and two power banks from my dad’s workplace, then packing it all in a case made of LEGOs' }}</h2>
        <h1 class="ml-14 text-primary dark:text-dark-primary">{{ data.prefLang === 'no' ? 'Tidslinje' : 'Timeline' }}: </h1>
        <div
            v-if="data.timeLine"
            v-for="(event, index) in data.timeLine"
            :key="event.id"
            class="text-dark mx-10 border-b-2  border-primary dark:border-dark-primary flex"
            :class="`${index === 0 ? 'border-l-4 border-t-0 mr-30 my-[-2px] rounded-l-2xl': index % 2 === 0 ?  'rounded-l-2xl border-t-2 border-l-4 mr-30 my-[-2px]' : 'rounded-r-2xl border-t-2 border-r-4 rounded-r-2xl ml-30'}`">
                <div
                    class="w-3/5 text-dark dark:text-light"
                    :class="`${index % 2 === 0 ? 'order-0 text-start' : 'order-2 text-end'}`">
                    <h2 class="m-4 underline underline-offset-2 italic">
                        {{ useDateFormat(event.from, 'MM.YYYY') }} - {{ useDateFormat(event.to, 'MM.YYYY') }}
                    </h2>
                    <h1 class="mx-4 text-shadow-dark-accent ">
                        {{ data.prefLang === 'no' ? event.header_no : event.header_en }} 
                    </h1>
                    <div class="m-4" v-html="data.prefLang === 'no' ? event.description_no : event.description_en"/>
                </div>
            <SwipeCards
                v-if="event.eventImages[0]"
                class="w-2/5 pointer-events-auto"
                :class="`${index % 2 === 0 ? 'start-1' : 'end-1'}`"
                :cards="event.eventImages"/>
        </div>
    <div
        v-else>
        Loading
    </div> 
    </div>
    
    
    
</template>