<script setup>
    import { data, getSoftware, loadProject } from '../components/store.vue';
    import { computed, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const project = ref(data.value.currentProject)
    const software = computed(() => {
        if (project.value?.software) {
            return getSoftware(project.value.software);
        }
        return [];
    });

    const projectTitle = computed(() => {
        if (!project.value) return '';
        return data.value.prefLang === 'no' ? project.value.title_no : project.value.title_en;
    });


    const projectDescription = computed(() => {
        if (!project.value) return '';
        return data.value.prefLang === 'no' ? project.value.description_no : project.value.description_en;
    });

    const getImageURL = (fileName) => {
        const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;
        const projectRecordName = import.meta.env.VITE_POCKETBASE_PROJECTS;
        return `${pocketbaseUrl}/api/files/${projectRecordName}/${project.value.id}/${fileName}`;
    };
</script>

<template>
    <div class="w-screen min-h-screen mt-[10vh] p-8 text-dark dark:text-light mb-12">
        <div v-if="data.currentProjectLoading" class="flex justify-center items-center min-h-screen">
            <p class="text-2xl">Loading project...</p>
        </div>
        
        <div v-else-if="project" class="mx-auto w-full place-items-center">
            <!-- Project Header -->
            <div class="mb-8 max-w-4xl">
                <h1 class="text-4xl lg:text-5xl font-bold mb-4 ">
                    {{ projectTitle }}
                </h1>
            </div>

            <!-- Software Used -->
            <div v-if="software.length > 0" class="mb-8 max-w-4xl">
                <div class="flex flex-wrap gap-4">
                    <div v-if="data.software[0]" v-for="soft in software" :key="test" class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <img 
                            v-if="soft.iconImage"
                            class="h-8 w-8"
                            :src="soft.iconImage"
                            :title="soft.name"
                        />
                        <span class="dark:text-white">{{ soft.name }}</span>
                    </div>
                </div>
            </div>

            <!-- Thumbnail -->
             <div v-if="project.banner" class="max-w-4xl mb-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                    class="w-full object-cover max-h-96"
                    :src="getImageURL(project.banner)"
                    :alt="projectTitle"
                />
            </div>
            <div v-else-if="project.thumbnail" class="max-w-4xl mb-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                    class="w-full object-cover max-h-96"
                    :src="getImageURL(project.thumbnail)"
                    :alt="projectTitle"
                />
            </div>

            

            <!-- Description -->
            <div v-if="projectDescription" class="mb-8 max-w-4xl">
                <h2 class="text-2xl font-semibold mb-4 dark:text-white">Description</h2>
                <p class="text-lg leading-relaxed dark:text-gray-300 whitespace-pre-wrap" v-html="projectDescription"/>

            </div>

            <!-- Additional Images -->
            <div v-if="project.carousel" class="mb-8 w-full">
                <h2 class="text-2xl font-semibold mb-4 text-center dark:text-white">Gallery</h2>
                <div class="columns-1 lg:columns-2 xl:columns-3 gap-4 mx-24 lg:mx-28 xl:mx-32 place-items-center">
                    <img 
                        v-for="(image, index) in project.carousel"
                        :key="index"
                        class="bg-white rounded-xl shadow overflow-hidden break-inside-avoid mb-4"
                        :src="getImageURL(image)"
                        :alt="`Project image ${index + 1}`"
                    />
                </div>
            </div>
        </div>

        <div v-else class="flex justify-center items-center min-h-screen">
            <p class="text-2xl dark:text-white">No project found</p>
        </div>
    </div>
</template>
