<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { data, setPrefLang } from './store.vue'

import FSLogo from '../assets/svgTemplate/FSLogo.vue'
import listSVG from '../assets/svg/list.vue'
import githubSVG from '../assets/svg/github_logo.vue'
import settingsSVG from '../assets/svg/search.vue'
import GBflagSVG from '../assets/svg/GBflag.vue'
import NOflagSVG from '../assets/svg/NOflag.vue'
import MoonSVG from '../assets/svg/Moon.vue'
import SunSVG from '../assets/svg/Sun.vue'
import linkedinSVG from '../assets/svg/linkedin_logo.vue'
import mail from '../assets/svg/mail.vue'

enum AnimationStates {
    Initial,
    Unwrap,
    FadeInnPage, // + Move Nav
    FadeInnNavButton,
    Finished
}

enum OpenStates {
    Closed,
    NavOpen,
    SettingsOpen
}

const props = defineProps({
  showAnimation: Boolean,
  swapTheme: Function
})

const fontstyling : string = 'text-md lg:text-4xl text-gray-700'

//Initial -> Unwrap
const TextContainerWidth : string = 'w-1/3 lg:w-1/4'
const InitToUnwrapTime : number = 1000
const UnwrapTimeTW : string = 'duration-1000'
//Unwrap -> FadeInnPage
const UnwrapToFadeInnPageTime : number = 1500
const InitNavSize : string = 'max-w-4/5 max-h-4/5 size-80 ms:size-160 aspect-1/1 rounded-[4vh]'

//FadeInnPage -> FadeInnNavButton
const FadeInnPageToFadeInnNavButtonTime : number = 1000
const FinalNavSize : string = 'mt-1 w-4/5 lg:w-2/5 h-1/20 lg:h-1/12 min-h-16  mb-[80vh] rounded-[16vh]'
const FadeTimeTW : string = 'duration-1000'

//FadeInnNavButton -> Finished
const FadeInnNavButtonToFinishedTime : number = 1000
const FadeInnNavButtonToFinishedTimeTW : String = 'duration-1000'

//Finished State


//StateValues
const openState = ref<OpenStates>(OpenStates.Closed)

const AnimationState = ref<AnimationStates>(props.showAnimation ? AnimationStates.Initial : AnimationStates.Finished)

const TitleContainerWidth = computed<string>(() => (AnimationState.value >= AnimationStates.Unwrap) ? TextContainerWidth : 'w-0')
const bgOpacity = computed<string>(() => (AnimationState.value >= AnimationStates.FadeInnPage) ? 'opacity-0' : 'opacity-100')
const navSize = computed<string>(() => (AnimationState.value >= AnimationStates.FadeInnPage) ? FinalNavSize : InitNavSize)
const navButtonOpacity = ref<string>(AnimationState.value >= AnimationStates.FadeInnNavButton ? 'opacity-100' : 'opacity-0')
watch(AnimationState, (state) => {
    if (AnimationState.value >= AnimationStates.FadeInnNavButton) {
        setTimeout(() => {
            navButtonOpacity.value = 'opacity-100'
        }, 10)
    } else {
        navButtonOpacity.value = 'opacity-0'
    }
})

const animating = computed<boolean>(() => AnimationState.value < AnimationStates.Finished)

const activeTimeoutId = ref<number | null>(null)

const animSkipped = ref<boolean>(false)
const skipDurationTW : string = 'duration-200'

onMounted(() => {
    if (props.showAnimation) {
        console.log('Animation started');
        activeTimeoutId.value = window.setTimeout(() => {
            InitialToUnwrap()
        }, InitToUnwrapTime)
    }
})

const InitialToUnwrap = () => {
    console.log('Initial to Unwrap');
    AnimationState.value = AnimationStates.Unwrap
    activeTimeoutId.value = window.setTimeout(() => {
        UnwrapToFadeInn()
    }, UnwrapToFadeInnPageTime)
}

const UnwrapToFadeInn = () => {
    console.log('Unwrap to FadeInn');
    AnimationState.value = AnimationStates.FadeInnPage
    activeTimeoutId.value = window.setTimeout(() => {
        FadeInnToFadeInnNavButton()
    }, FadeInnPageToFadeInnNavButtonTime)
}

const FadeInnToFadeInnNavButton = () => {
    console.log('FadeInnPage to FadeInnNavButton');
    AnimationState.value = AnimationStates.FadeInnNavButton
    activeTimeoutId.value = window.setTimeout(() => {
        FadeInnNavButtonToFinished()
    }, FadeInnNavButtonToFinishedTime)
}

const FadeInnNavButtonToFinished = () => {
    console.log('FadeInnNavButton to Finished');
    AnimationState.value = AnimationStates.Finished
}


const skipAnimation = () => {
    console.log('Animation skipped');

    if (activeTimeoutId.value !== null) {
        clearTimeout(activeTimeoutId.value)
    }
    animSkipped.value = true
    activeTimeoutId.value = null
    FadeInnNavButtonToFinished()
}

const closeMenu = () => {
    openState.value = OpenStates.Closed
}

const searchInput = ref<HTMLInputElement | null>(null)


</script>

<template>
    <div @click="skipAnimation">
        <div
        v-if="animating"
        class="z-15 fixed inset-0 bg-gray-300 transition-opacity ease-in-out"
        :class="bgOpacity + ' ' + (animSkipped ? skipDurationTW : FadeTimeTW)" />
    </div>
    <div class="fixed inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div class=" ease-in-out flex flex-row-center gap-5 content-fit pointer-events-none drop-shadow-xl/50 z-20"
            :class="navSize + ' ' + (animSkipped ? skipDurationTW : FadeTimeTW)">
            <div class="absolute w-1/1 h-1/1 bg-primary dark:bg-dark-primary rounded-[8vh] -z-10 drop-shadow-xl/50"/>

            <listSVG @click="() => {openState = openState == OpenStates.NavOpen ?  OpenStates.Closed : OpenStates.NavOpen}"
                v-if="AnimationState >= AnimationStates.FadeInnNavButton"
                class="transition-opacity ease-in-out aspect-square flex-1/3 pointer-events-auto cursor-pointer fill-light dark:fill-dark"
                :class="navButtonOpacity + ' ' + (animSkipped ? skipDurationTW : FadeInnNavButtonToFinishedTimeTW)"
            />
            <router-link :to="{name: 'Home'}" @click="closeMenu" :class="'stroke-light dark:stroke-dark flex-1/3 pointer-events-auto cursor-pointer flex'">
                <FSLogo
                    :class="'aspect-square stroke-light dark:stroke-dark stroke-2 pointer-events-auto cursor-pointer flex-1/1'"
                />
            </router-link>
            

            <settingsSVG @click="() => {
                openState = openState == OpenStates.SettingsOpen ? OpenStates.Closed : OpenStates.SettingsOpen
                }"
                v-if="AnimationState >= AnimationStates.FadeInnNavButton"
                class="transition-transform ease-in-out aspect-square my-2 pointer-events-auto cursor-pointer justify-end fill-light dark:fill-dark flex-1/3"
                :class="`${navButtonOpacity} ${animSkipped ? skipDurationTW : FadeInnNavButtonToFinishedTimeTW} ${openState === OpenStates.SettingsOpen ? 'rotate-0' : '-rotate-180'}`"

            />

            

            <!--NavOptions-->
            <div class="mt-9 absolute w-1/1 duration-300 bg-light dark:bg-dark  rounded-b-[4vh] -z-20 ease-in-out overflow-hidden"
                :class="openState === OpenStates.NavOpen ? 'h-58' : 'h-[0vh]'">
                <div class="flex flex-col pt-[5vh] items-start">
                    <router-link :to="{name: 'About'}" @click="closeMenu" class="ml-[6.25%] text-dark dark:text-light pointer-events-auto">About me</router-link>
                    <div class="h-px mx-5 w-7/8 bg-dark dark:bg-light self-center my-2"></div>
                    <router-link :to="{name: 'Collection'}" @click="closeMenu" class="ml-[6.25%] text-dark dark:text-light pointer-events-auto">Collection</router-link >
                    <div class="h-px mx-5 w-7/8 bg-dark dark:bg-light self-center my-2"></div>
                    <router-link :to="{name: 'Contact'}" @click="closeMenu" class="ml-[6.25%] text-dark dark:text-light pointer-events-auto">Contact</router-link >
                    <div class="h-px mx-5 w-7/8 bg-dark dark:bg-light self-center mt-2"></div>

                    <div class="flex w-full h-full items-center gap-2 justify-self-end py-4 fill-dark dark:fill-light">
                        <a title="GitHub" href="https://github.com/Ferdinand-Snapa" class="flex-1/3 h-12 pointer-events-auto"><githubSVG class="h-10 w-full"/></a>
                        <div class="w-px h-6 bg-dark dark:bg-light mx-1"></div>
                        <a title="LinkedIn" href="https://www.linkedin.com/in/ferdinand-snapa-a61576285/" class="flex-1/3 h-12 pointer-events-auto"><linkedinSVG class="h-10 w-full"/></a>
                        <div class="w-px h-6 bg-dark dark:bg-light mx-1"></div>
                        <a title="Ferdinand@snapa.no" href="mailto:ferdinand@snapa.no" class="flex-1/3 h-12 pointer-events-auto"><mail class="h-10 w-full stroke-dark dark:stroke-light"/></a>
                    </div>
                </div>
            </div>
            <!--SettingsBar-->
            <div class="mt-9 inset-0 absolute w-1/1 duration-300 bg-secondary dark:bg-dark-secondary rounded-b-[4vh] -z-20 ease-in-out overflow-hidden"
                :class="openState === OpenStates.SettingsOpen ? 'h-28' : 'h-[0vh]'">
                <!--Content of search results-->
                <div class="flex flex-row pt-[7vh] items-center  justify-center">
                    <!--Lang select-->
                    <div class="flex-1/3 flex flex-row gap-4 justify-center cursor-pointer">
                        <GBflagSVG 
                            @click="() => setPrefLang('en')"
                            class="h-8 pointer-events-auto rounded-xl"
                            :class="data.prefLang === 'en' ? '' : 'grayscale' "/>
                        <div class="h-8 text-xl">/</div>
                        <NOflagSVG
                            @click="() => setPrefLang('no')"
                            class="h-8 pointer-events-auto rounded-xl"
                            :class="data.prefLang === 'no' ? '' : 'grayscale'"/>
                    </div>
                    <div class="flex-1/3 pointer-events-auto cursor-pointer relative" @click="swapTheme">
                        <SunSVG
                            class="h-14 rotate-90 fill-yellow-500 dark:rotate-0 dark:h-0 rounded-xl absolute transition-all duration-1000 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:fill-gray-500"
                        />
                        <MoonSVG
                            class="h-8 fill-yellow-500 rounded-xl absolute transition-all duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:fill-gray-500 justify-center"
                        />
                        <MoonSVG
                            class="h-8 rotate-180 fill-yellow-500 rounded-xl absolute transition-all duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:rotate-0 dark:fill-gray-500 justify-center"
                        />
                            
                        <!--class="h-0 pointer-events-auto rounded-xl absolute transition-all duration-1000 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-gray-500"-->
                        
                    </div>
                    <div class="flex-1/3 pointer-events-auto text-center" @click="swapTheme">
                        swap theme 
                    </div>
                    
                </div>
            </div>
        </div>
        



        <div class="flex items-center justify-center w-full bg-gray-300/70">
            <div class="" :class="fontstyling"> < </div>
            <div class="overflow-hidden h-16 flex items-center justify-center ease-in-out"
                :class="TitleContainerWidth + ' ' + (animSkipped ? skipDurationTW : UnwrapTimeTW)">
                <span class="whitespace-nowrap block w-full px-2 text-center" :class="fontstyling">
                Ferdinand Snapa
                </span>
            </div>
            <div class="" :class="fontstyling"> / </div>
            <div class="overflow-hidden h-16 flex items-center justify-center ease-in-out"
                :class="TitleContainerWidth + ' ' + (animSkipped ? skipDurationTW : UnwrapTimeTW)">
                <span class="whitespace-nowrap block w-full px-2 text-center" :class="fontstyling">
                Web Portfolio
                </span>
            </div>
            <div class="" :class="fontstyling"> > </div>
        </div>
    </div>
    
</template>

<style scoped>

</style>