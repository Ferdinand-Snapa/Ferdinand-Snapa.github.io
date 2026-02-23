<script setup>
import Ferd_wobg from '../assets/img/ferdi_u_Bakgrunn.png'
import { data } from '../components/store.vue'
import SoftwareCards from '../components/SoftwareCards.vue'


const headerfontclass = "text-2xl lg:text-6xl pb-5 pt-5 mt-[2vh] lg:mt-[5vh]"
const textfontclass = "text-lg lg:text-3xl lg:pb-6 pb-2"
</script>


<template>
  <div class="place-self-start flex w-screen flex-col">
    <div class="absolute w-1/1 h-1/1 z-10 pointer-events-none">
      <img class="absolute bottom-0 right-0 h-1/2 mr-[-6vh] lg:mr-0 lg:h-1/1 "  :src="Ferd_wobg">
    </div>
    
    <!--img class="absolute end-0 w-1/3 z-10 mt-[4vh] drop-shadow-xl/20"  :src="Ferd_wobg"-->
    <div class="inset-0 h-fit w-screen mt-[10vh] z-5">
      <div class="bg-accent dark:bg-dark-accent w-5/6 rounded-r-3xl pl-12 drop-shadow-xl">
          <div :class="headerfontclass">{{ data.loading ? "loading" : (data.frontPage.header ? data.frontPage.header : "no header") }}</div> 
      </div>
    </div>

    <div class="mx-12 lg:mr-48 mt-6 p-6 drop-shadow-xl rounded-xl bg-secondary dark:bg-dark-secondary lg:pr-[350px]" v-html="data.frontPage.intro"/>
    <!--Looping software icons-->
    <div class="relative w-full h-full lg:w-4/5 overflow-hidden mt-16 lg:m-0 lg:mt-22">
      <div class="flex w-max scroll-x p-4" ref="SoftwareCardContainer">
        <div class="flex h-1/6"> 
          <software-cards/>
        </div>
        <div class="flex h-1/6">
          <software-cards/>
        </div>
      </div>
    </div>
  </div>
    
</template>