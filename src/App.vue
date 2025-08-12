<script setup>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'
import { ref } from 'vue'
const animationEnabled = ref(true)
</script>

<template>
  <NavBar :showAnimation="animationEnabled" />
  
  <HelloWorld msg="Vite + Vue"/>
  <button class="text-3xl font-bold underline">
    Hello world!
  </button>
  <div class="h-screen flex items-center justify-center">
    <p>This is a simple Vue.js application.</p>
  </div>
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
