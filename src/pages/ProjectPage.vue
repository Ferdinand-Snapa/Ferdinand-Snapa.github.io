<script setup>
    import { data, getSoftware, isVideo } from '../components/store.vue';
    import { computed, onMounted, ref, onBeforeUnmount } from 'vue';
    import { useRoute } from 'vue-router';

    const modalOpen = ref(false)
    const modalImage = ref(null)

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

    const OpenModal = (src) => {
        modalImage.value = src
        modalOpen.value = true
    }

    const closeModal = () => {
        modalImage.value = null
        modalOpen.value = false
    }

    const handleKey = (e) => {
        if (e.key === "Escape") closeModal()
    }

    onMounted(() => {
        window.addEventListener("keydown", handleKey)
    })

    onBeforeUnmount(() => {
        window.removeEventListener("keydown", handleKey)
    })

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

            <!-- Banner -->
             <div v-if="project.banner" class="max-w-4xl mb-8 rounded-lg overflow-hidden shadow-lg">
                <img
                    @click="() => OpenModal(project.banner)"
                    class="w-full object-cover max-h-96"
                    :src="getImageURL(project.banner)"
                    :alt="projectTitle"
                />
            </div>
            <div v-else-if="project.thumbnail" class="max-w-4xl mb-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                    @click="() => OpenModal(project.thumbnail)"
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
                    <div
                        v-for="(media, index) in project.carousel"
                        :key="index" class="bg-white rounded-xl shadow overflow-hidden break-inside-avoid mb-4">
                        <video v-if="isVideo(media)"  :alt="`project video ${media}`" autoplay muted controls>
                            <source :src="getImageURL(media)" type="video/mp4"> Failed to laod video
                        </video>
                        <img v-else :src="getImageURL(media)" :alt="`project image ${media}`" @click="() => OpenModal(media)"/>
                    </div>
                    
                </div>
            </div>
        </div>

        <div v-else class="flex justify-center items-center min-h-screen">
            <p class="text-2xl dark:text-white">No project found</p>
        </div>
        <transition name="fade">
      <div
        v-if="modalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="relative max-w-4xl w-full p-4">

          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-2 right-2 bg-white rounded-full px-3 py-1 shadow-md hover:bg-gray-200"
          >
            ✕
          </button>

          <!-- Full Image -->
          <img
            v-if="modalImage"
            :src="getImageURL(modalImage)"
            class="w-full max-h-[80vh] object-contain rounded-xl"
          />
        </div>
      </div>
    </transition>
    </div>
</template>
