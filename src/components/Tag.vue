<script setup lang="ts">
import {ref , defineProps} from 'vue'
import 'iconify-icon'

const props = defineProps({
    tagName: String,
    iconstr: String
})


</script>

<template>
    <div>
        <div :class="'h-20 w-20 bg-red-400'">
        {{tagName}}
        <iconify-icon :icon='iconstr'></iconify-icon>
        </div>
    </div>
    
</template>