<script setup>
    import { defineProps } from 'vue';
    import { getProject, getSoftware, data } from '../components/store.vue'
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    
    const props = defineProps({
        projectID : String
    })

    
    const projectData = getProject(props.projectID)
    const software = getSoftware(projectData.software)

    const handleCardClick = () => {
        router.push({ name: 'Project', params: { id: props.projectID } });
    }

</script>
<template>
    <div class="relative bg-primary dark:bg-dark-primary group cursor-pointer" @click="handleCardClick">
        <div 
            v-if="software[0]"
            class="gap-2 w-full p-2 z-10 absolute flex flex-row overflow-hidden bg-linear-to-b from-gray-500 to-transparent transition-transform ease-linear duration-200 translate-y-[-10vh] group-hover:translate-y-0">
            <img v-for="soft in software"
                class="h-12 w-12"
                :key="projectData.id + '/' + soft.id"
                :src="soft.iconImage"
                :title="soft.name"
            />
        </div>
        <img
            class="object-contain max-h-[60%] w-full mb-2"
            v-if="projectData.thumbnail" 
            :key="projectData.thumbnail"
            :src="projectData.thumbnail_img"/>
        <h2 class="min-h-12 text-2xl mx-2 tetx-wrap">
            {{ data.prefLang ==='no' ? projectData.title_no :  projectData.title_en }}
        </h2>
        <div class="min-h-12 mt-2 tetx-xl mx-2">
            {{ data.prefLang ==='no' ? projectData.short_desc_no :  projectData.short_desc_en }}
        </div>
    </div>
</template>