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
            class="flex gap-2 p-2 z-10 w-full absolute flex-row bg-linear-to-b from-dark to-transparent transition-transform ease-linear duration-200 translate-y-[-10vh] group-hover:translate-y-0">
            <div v-for="soft in software"
                :key="`${projectData.id}/${soft.id}`"
                class="flex-1 aspect-square flex items-center justify-center max-w-12">
                
                <img 
                    class="w-full h-full object-contain"
                    :key="projectData.id + '/' + soft.id"
                    :src="soft.iconImage"
                    :title="soft.name"
                />
            </div>
            

        </div>
        
        <img
            class="object-contain max-h-[60%] w-full"
            v-if="projectData.thumbnail" 
            :key="projectData.thumbnail"
            :src="projectData.thumbnail_img"/>

        <h2 v-if="projectData.short_desc_no || projectData.short_desc_en" class="min-h-12 mt-2 mx-2 text-xl text-wrap">
            {{ data.prefLang ==='no' ? projectData.title_no :  projectData.title_en }}
        </h2>
        <div v-if="projectData.short_desc_no || projectData.short_desc_en" class="min-h-12 mt-2  mx-2 pb-2">
            {{ data.prefLang ==='no' ? projectData.short_desc_no :  projectData.short_desc_en }}
        </div>
        <h2 v-else class="ml-4 text-shadow-dark absolute transition-transform duration-200 text-xl group-hover:-translate-y-10">
            {{ data.prefLang ==='no' ? projectData.title_no :  projectData.title_en }}
        </h2>
    </div>
</template>