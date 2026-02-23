<script setup>
import { ref } from "vue";
import Card from "./Card.vue";

const props = defineProps({
  cards: Array
});

const cardData = [
  { id: 5, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800" },
  { id: 4, url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=800" },
  { id: 3, url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800" },
  { id: 2, url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800" },
  { id: 1, url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=800" },
];
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