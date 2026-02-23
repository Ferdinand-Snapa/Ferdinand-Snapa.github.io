<script setup>
import { data } from './store.vue'
        //class="transition-all duration-200 m-4 my-4 p-2 w-64 min-h-38 rounded-xl shadow bg-primary dark:bg-dark-primary flex flex-row items-center overflow-hidden hover:m-2 hover:my-2 hover:w-68"
</script>
<template>
    <div
        v-if="!data.loading"
        v-for="software in data.software"
        v-on:click="console.log(`pressed ${software.name}`)"
        :key="software.id"
        class="w-54 h-32 mx-1 relative  shadow-md
         hover:shadow-2xl hover:-translate-y-4  transition-all duration-150 ease-linear
         overflow-hiden group bg-linear-to-r cursor-pointer rounded-xl flex"
        :class="`
        ${software.grad_color_2 ? ` from-[${software.grad_color_2}] ` : `from-secondary dark:from-dark-secondary`} 
        ${software.grad_color_1 ? ` to-[${software.grad_color_1}] ` : `to-primary dark:to-dark-primary `}`"
        :style="{backgroundImage: `linear-gradient(to right, ${software.grad_color_1}, ${software.grad_color_2})`}"
    >
        <span :class="`absolute inset-0  bg-linear-to-r rounded-xl 
        ${software.grad_color_2 ? ` from-[${software.grad_color_2}] ` : `from-secondary dark:from-dark-secondary `} 
        ${software.grad_color_1 ? ` to-[${software.grad_color_1}] ` : `to-primary dark:to-dark-primary `}
        transition-opacity duration-500 group-hover:opacity-0`"
        :style="{backgroundImage: `linear-gradient(to right, ${software.grad_color_1}, ${software.grad_color_2})`}"></span>
        
        <span :class="`absolute inset-0  bg-linear-to-r rounded-xl 
        ${software.grad_color_1 ? ` from-[${software.grad_color_1}] ` : `from-primary dark:from-dark-primary `} 
        ${software.grad_color_2 ? ` to-[${software.grad_color_2}] ` : `to-secondary dark:to-dark-secondary ` }
        transition-opacity duration-500 group-hover:opacity-0`"
        :style="{backgroundImage: `linear-gradient(to left, ${software.grad_color_1}, ${software.grad_color_2})`}"></span>
        <span class="pl-2 relative z-10 transition-transform duration-300 flex items-center justify-self-center">
            <img
                v-if="software.iconImage"
                :src="software.iconImage"
                :title="software.name"
                class="w-16 h-16 mb-4"
                alt="Software icon"
            />
            <h2 class="text-lg font-semibold text-blue-400 pl-4 text-pretty text-shadow-lg">
             {{ software.name }}
            </h2>
        </span>
        <!--span :class= "{ absolute inset-0 bg-gradient-to-r from-[${}] to-[#000000] }" ></span-->

        
    </div>
</template>

