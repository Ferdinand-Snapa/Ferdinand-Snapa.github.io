<script setup>
import { ref } from "vue";
import Card from "./Card.vue";

const props = defineProps({
  cards: Array
});


const cards = ref([...props.cards.map((imgUrl, index) => ({ id: index, url: imgUrl }))]);

function removeCard(id) {
    cards.value.unshift(cards.value.pop())
  //cards.value = cards.value.filter((c) => c.id !== id);
}


</script>

<template>
  <div
    class="grid h-[500px] place-items-center"
  >
    <Card
        class="pointer-events-auto w-1/3 lg:w-1/1"
      v-for="card in cards"
      :key="card.id"
      :card="card"
      :cards="cards"
      @remove="removeCard"
    />
  </div>
</template>