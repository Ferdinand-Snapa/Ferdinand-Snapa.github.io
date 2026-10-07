<script setup>
    import ProjectCard from '../components/ProjectCard.vue';
    import { data, getSoftware } from '../components/store.vue'
    import { computed, ref, onMounted } from 'vue';

    const select = ref(data.value.filterSoft ?? '')

    const filteredProjects = computed(() => {
        if (data.value.filterSoft) {
            console.log("test filter projects: " + data.value.filterSoft)
            return data.value.projects.filter((project) => {return project.software.includes(data.value.filterSoft)})
        }
        else {
            console.log("test no filter projects")
            return data.value.projects
        }
    })

    function selectionChange(event) {
        data.value.filterSoft = event.target.value
        console.log("lenght of filtered Projects: ")

    }

    function clearFilter() {
        data.value.filterSoft = null
        select.value = ''
    }
</script>

<template>
  <div class="w-full mt-[12vh] px-4 sm:px-12 lg:px-28 xl:px-32">
    <!-- Filter bar: outside the column layout so it spans full width -->
    <div
      class="mb-4 flex h-14 sm:h-20 w-full sm:max-w-md items-center gap-2 sm:gap-3
             rounded-xl bg-secondary dark:bg-dark-secondary px-2 sm:px-3"
    >
      <img
        v-if="data.filterSoft"
        :key="data.filterSoft + 'img'"
        class="h-10 w-10 sm:h-16 sm:w-16 shrink-0 object-contain rounded-lg"
        :src="getSoftware([data.filterSoft])[0].iconImage"
        :title="getSoftware([data.filterSoft])[0].name"
      />
      <span v-else class="shrink-0 text-base sm:text-xl">Filter:</span>

      <select
        v-model="select"
        @change="selectionChange"
        class="min-w-0 flex-1 border-0 bg-transparent text-base sm:text-xl"
      >
        <option
          v-for="soft in data.software"
          :key="soft.id"
          :value="soft.id"
          class="text-dark"
        >
          {{ soft.name }}
        </option>
      </select>

      <button
        v-if="data.filterSoft"
        type="button"
        @click="clearFilter"
        aria-label="Clear filter"
        class="shrink-0 p-2 text-lg leading-none"
      >
        ✕
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="filteredProjects.length === 0"
      class="text-sm sm:text-base text-gray-600 dark:text-background"
    >
      <p v-if="data.prefLang === 'no'">
        Ups, enten lyver noen på porteføljen,
        eller så har de ikke fått lagt til prosjektet ved hjelp av
        {{ getSoftware([select])[0]?.name }}
      </p>
      <p v-else>
        Oops, either someone's lying on their portfolio,
        or they haven't gotten around to adding a project using
        {{ getSoftware([select])[0]?.name }}
      </p>
    </div>

    <!-- Masonry grid -->
    <div
      v-else
      class="columns-1 min-[480px]:columns-2 sm:columns-3 lg:columns-4 xl:columns-5
             gap-2 sm:gap-4 mb-16"
    >
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        ref="element"
        class="mb-2 sm:mb-4 break-inside-avoid overflow-hidden rounded-xl bg-white shadow"
      >
        <ProjectCard :projectID="project.id" />
      </div>
    </div>
  </div>
</template>
