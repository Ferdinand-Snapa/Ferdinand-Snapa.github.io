<script setup>
    import ProjectCard from '../components/ProjectCard.vue';
    import { data } from '../components/store.vue'
    import VanillaTilt from 'vanilla-tilt';
    import { onMounted, ref } from 'vue';


    const element = ref(null);

    onMounted(() => {
        VanillaTilt.init(element.value, {
            max: 10, // Max tilt rotation (degrees)
            reverse: false,
            speed: 200, // Speed of the enter/exit transition
        });
    });

</script>

<template>
    <div class="w-screen bg-red-600 mt-[10vh]">
        <div class="columns-1 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 mx-24 lg:mx-28 xl:mx-32">
            <div
                v-for="project in data.projects"
                :key="project.id"
                class="bg-white rounded-xl shadow overflow-hidden break-inside-avoid mb-4"
                ref="element"
            >
                <ProjectCard :projectID="project.id"></ProjectCard>
            </div>

            </div>
        </div>
    

</template>