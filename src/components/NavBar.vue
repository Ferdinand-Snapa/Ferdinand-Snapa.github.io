<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

import FSLogo from '../assets/svgTemplate/FSLogo.vue'
import listSVG from '../assets/svg/list.svg'
import searchSVG from '../assets/svg/search.svg'

enum AnimationStates {
    Initial,
    Unwrap,
    FadeInnPage, // + Move Nav
    FadeInnNavButton,
    Finished,
}

const props = defineProps({
  showAnimation: Boolean,
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
const FinalNavSize : string = 'mt-1 w-4/5 md:w-3/5 h-1/20 md:h-1/10 min-h-16  mb-[80vh] rounded-[16vh]'
const FadeTimeTW : string = 'duration-1000'

//FadeInnNavButton -> Finished
const FadeInnNavButtonToFinishedTime : number = 1000
const FadeInnNavButtonToFinishedTimeTW : String = 'duration-1000'

//Finished State


//StateValues
const open = ref<boolean>(false)

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

</script>

<template>
    <div @click="skipAnimation">
        <div
        v-if="animating"
        class="z-10 fixed inset-0 bg-gray-300 transition-opacity ease-in-out"
        :class="bgOpacity + ' ' + (animSkipped ? skipDurationTW : FadeTimeTW)" />
    </div>
    <div class="fixed inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div class="rounded-[8vh] bg-green-700 ease-in-out flex flex-row-center gap-5 content-fit pointer-events-none drop-shadow-xl/50"
            :class="navSize + ' ' + (animSkipped ? skipDurationTW : FadeTimeTW)">
            <img @click="() => {console.log('List icon clicked')}"
                v-if="AnimationState >= AnimationStates.FadeInnNavButton"
                class="transition-opacity ease-in-out aspect-square flex-1/3 pointer-events-auto cursor-pointer"
                :class="navButtonOpacity + ' ' + (animSkipped ? skipDurationTW : FadeInnNavButtonToFinishedTimeTW)"
                :src="listSVG"
            />

            <FSLogo @click="() => {console.log('FSLogo clicked')}"
                    :class="'aspect-square stroke-black stroke-2 flex-1/3  pointer-events-auto cursor-pointer'"
            />

            <img @click="() => {console.log('Search icon clicked')}"
                v-if="AnimationState >= AnimationStates.FadeInnNavButton"
                class="transition-opacity ease-in-out aspect-square flex-1/3 my-2 pointer-events-auto cursor-pointer"
                :class="navButtonOpacity + ' ' + (animSkipped ? skipDurationTW : FadeInnNavButtonToFinishedTimeTW)"
                :src="searchSVG"
            />
        </div>
        <div class="flex items-center justify-center w-full">
            <div class="" :class="fontstyling"> < </div>
            <div class="overflow-hidden h-16 flex items-center justify-center ease-in-out"
                :class="TitleContainerWidth + ' ' + (animSkipped ? skipDurationTW : UnwrapTimeTW)">
                <span class="whitespace-nowrap block w-full px-2" :class="fontstyling">
                Ferdinand Snapa
                </span>
            </div>
            <div class="" :class="fontstyling"> / </div>
            <div class="overflow-hidden h-16 flex items-center justify-center ease-in-out"
                :class="TitleContainerWidth + ' ' + (animSkipped ? skipDurationTW : UnwrapTimeTW)">
                <span class="whitespace-nowrap block w-full px-2" :class="fontstyling">
                Web Portfolio
                </span>
            </div>
            <div class="" :class="fontstyling"> > </div>
        </div>
    </div>
    
</template>

<style scoped>

</style>