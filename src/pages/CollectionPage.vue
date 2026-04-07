<script setup>
    import ProjectCard from '../components/ProjectCard.vue';
    import { data, getSoftware } from '../components/store.vue'
    import { computed, ref } from 'vue';


    const filterSoftId = ref(null);

    const select = ref('')

    const filteredProjects = computed(() => {
        if (filterSoftId.value) {
            console.log("test filter projects: " + filterSoftId.value)
            return data.value.projects.filter((project) => {return project.software.includes(filterSoftId.value)})
        }
        else {
            console.log("test no filter projects")
            return data.value.projects
        }
    }) 
    
    function selectionChange(event) {
        filterSoftId.value = event.target.value
        console.log("lenght of filtered Projects: ")

    }

    function clearFilter() {
        filterSoftId.value = null
        select.value = ''
    }
</script>

<template>
    <div class="w-screen bg-opacity-50 mt-[10vh]">
        <div class="columns-1 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 mx-24 lg:mx-28 xl:mx-32">
            <div class="h-20 mb-4 flex bg-secondary dark:bg-dark-secondary rounded-xl">
                <img v-if="filterSoftId"
                    class="flex-1/6 h-20 object-contain rounded-xl"
                    :key="filterSoftId + 'img'"
                    :src="getSoftware([filterSoftId])[0].iconImage"
                    :title="'soft.name'"
                />
                <div v-else class="flex-1/6 h-max text-center">
                    Filter:
                </div>
                <select v-model="select" class="w-full flex border-0 flex-3/6" @change="selectionChange" >
                    <option v-for="soft in data.software" :key="soft.id" :value="soft.id" class="text-dark text-xl rounded-xl">
                        {{soft.name}}
                    </option>
                </select>
                <div v-if="filterSoftId" class="flex flex-1/6 text-center self-center pl-4" v-on:click="clearFilter">
                    X
                </div>
                
            </div>
            <div v-if="filteredProjects[0] === undefined">
                Oops either someone lying on portfolio
                or havn't gotten around to adding project using {{ getSoftware([filterSoftId])[0]?.name }}
            </div>
            <div
                v-else
                v-for="project in filteredProjects"
                :key="project.id"
                class="bg-white rounded-xl shadow overflow-hidden break-inside-avoid mb-4"
                ref="element"
            >
                <ProjectCard :projectID="project.id"></ProjectCard>
            </div>
        </div>
    </div>
    

</template>