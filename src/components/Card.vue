<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  card: Object,
  cards: Array,
});

const emit = defineEmits(["remove"]);

const x = ref(0);
const isDragging = ref(false);
const startX = ref(0);

const isFront = computed(() => {
  return props.card.id === props.cards[props.cards.length - 1]?.id;
});

const rotation = computed(() => {
  const baseOffset = isFront.value
    ? 0
    : props.card.id % 2
    ? 6
    : -6;

  return baseOffset + x.value * 0.12;
});

const opacity = computed(() => {
  const abs = Math.abs(x.value);
  if (abs >= 150) return 0;
  return 1 - abs / 150;
});

function onPointerDown(e) {
  if (!isFront.value) return;

  isDragging.value = true;
  startX.value = e.clientX;

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(e) {
  if (!isDragging.value) return;
  x.value = e.clientX - startX.value;
}

function onPointerUp() {
  isDragging.value = false;

  if (Math.abs(x.value) > 100) {
    emit("remove", props.card.id);
    x.value = 0;
  } else {
    // snap back
    x.value = 0;
  }

  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
}
</script>

<template>
  <img
    :src="card.url"
    draggable="false"
    alt="Card image"
    class="max-h-96 pointer-events-auto max-w-96 rounded-lg object-cover absolute cursor-grab active:cursor-grabbing select-none"
    :class="isFront ? 'pointer-events-auto' : 'pointer-events-none' "
    :style="{
      transform: `translateX(${x}px) rotate(${rotation}deg) scale(${isFront ? 1 : 0.98})`,
      opacity: opacity,
      transition: isDragging ? 'none' : 'transform 0.2s ease, opacity 0.2s ease',
      boxShadow: isFront
        ? '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)'
        : undefined
    }"
    @pointercancel="onPointerUp"
    @pointerdown="onPointerDown"
  />
</template>