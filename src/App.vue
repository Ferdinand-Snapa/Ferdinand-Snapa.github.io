<script setup>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'
import { onMounted, ref } from 'vue'
import PocketBase from 'pocketbase'
import { fetchData } from './components/store.vue'
//import useConfigurationStore from './components/store.vue'

//const pb = new PocketBase('http://127.0.0.1:8090') 

const animationEnabled = ref(true)
const isDark = ref(false);

function toggleTheme() {
  console.log("toggle theme")
  isDark.value = !isDark.value
  applyTheme(isDark.value)

  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function applyTheme(value) {
  if (value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}


onMounted(async () => {
  const saved = localStorage.getItem('theme')

  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    // Optional: respect system preference
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  applyTheme(isDark.value)
  

  await fetchData()
})

</script>

<template>
  <NavBar :showAnimation="animationEnabled" :swapTheme="toggleTheme" />
  <router-view class="z-5"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
