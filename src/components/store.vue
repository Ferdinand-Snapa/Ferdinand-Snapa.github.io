<script>
import pocketbase from 'pocketbase'

import { ref } from 'vue'

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL
const projectRecordName = import.meta.env.VITE_POCKETBASE_PROJECTS
const softwareRecordName = import.meta.env.VITE_POCKETBASE_SOFTWARE
const frontPageRecordName = import.meta.env.VITE_POCKETBASE_FRONT_PAGE
const timeLineRecordName = import.meta.env.VITE_POCKETBASE_TIMELINE

if (!(pocketbaseUrl || projectRecordName || softwareRecordName)) {
    throw new Error(`Missing .anv variables: ${pocketbaseUrl ? "" : "POCKETBASE_URL "}${projectRecordName ? "" : "POCKETBASE_PROJECTS "}${softwareRecordName ? "" : "VITE_POCKETBASE_SOFTWARE"}`)
}

export const pb = new pocketbase(pocketbaseUrl)

export const data = ref({
    prefLang: null,
    frontPage: [],
    software: [],
    loading: true,
    projects: [],
    timeLine: [],
    projectsLoading: true,
    currentProject: null,
    currentProjectLoading: true,
    error: null
})

export const getProject = (id) => {
        return data.value.projects.find(project => project.id === id)
    }


export const getSoftware = (ids) => {
    return ids.map(id => 
        data.value.software.find(soft => soft.id === id)
    )
}

const getImageURL = (collectionName, id, fileName) => {
    return `${pocketbaseUrl}/api/files/${collectionName}/${id}/${fileName}`
}



export const isVideo = (fileName) => {
    
    const fileExtension = fileName.split('.').pop();
    const videExtensions = ['mp4']
    console.log(fileExtension)
    return videExtensions.includes(fileExtension)
}

const getPreferredLanguage = () => {
const preferredLangs = navigator.languages.map(lang => lang.split('-')[0]);
const supportedLangs = ['en', 'no'];
const matched = preferredLangs.find(lang => supportedLangs.includes(lang)) || 'en';
console.log(`user preffered lang: ${matched}`)
setPrefLang(matched)
return matched
}

export const setPrefLang = (newLang) => {
    data.value.prefLang = newLang
    switch (newLang) {
        case 'en':
            data.value.frontPage = {
                ...data.value.frontPage,
                header: data.value.frontPage.header_en,
                intro: data.value.frontPage.intro_en
            };
            data.value.projects = data.value.projects.map(project => ({
                ...project,
                title: project.title_en,
                short_desc: project.short_desc_en,
                description : description_en,
            }))
            data.value.timeLine = data.value.timeLine.map(event => ({
                ...event,
                header: event.header_en,
                description: event.description_en
            }))
        break; 
        case 'no':
            data.value.frontPage = {
                ...data.value.frontPage,
                header: data.value.frontPage.header_no,
                intro: data.value.frontPage.intro_no
            };
            data.value.projects = data.value.projects.map(project => ({
                ...project,
                title: project.title_no,
                short_desc: project.short_desc_no,
                description : description_no,
            }))
            data.value.timeLine = data.value.timeLine.map(event => ({
                ...event,
                header: event.header_no,
                description: event.description_no
            }))
        break;
    }
            
}


export const fetchData = async() => {
    try {
        const frontPageRecord = await pb.collection(frontPageRecordName).getFirstListItem(
            'route="DEFAULT"' 
        )

        const timeLineRecord = await pb.collection(timeLineRecordName).getFullList({
            sort: '-from'
        })

        //fetch a partial record of projects
        const projectsRecords = await pb.collection(projectRecordName).getFullList({
            sort: '-created',
            fields: 'id, title_no, title_en, thumbnail, software, short_desc_no, short_desc_en, grid_width, grid_height'
        });

        const softwareRecords = await pb.collection(softwareRecordName).getFullList({
            sort: '-created'
        })

        data.value = {
            frontPage:
                frontPageRecord ? frontPageRecord : await pb.collection(frontPageRecordName).getFirstListItem('route="DEFAULT"'),

            projects:
                projectsRecords.map(project => ({
                    ...project,
                    thumbnail_img: project.thumbnail ? getImageURL(projectRecordName, project.id, project.thumbnail) : null
                })),

            software:
                softwareRecords.map(software => ({
                    ...software,
                    iconImage: software.icon ? pb.files.getURL(software, software.icon) : null
                })),
            timeLine:
                timeLineRecord.map(event => ({
                    ...event,
                    eventImages: event.images.map(img => (
                        getImageURL(timeLineRecordName, event.id, img)
                    ))
                }))
        }
        if (!data.prefLang){
            await getPreferredLanguage()
        }
    } catch (err) {
        data.value.error = 'Failed to fetch From PocketBase'
        console.log(err)
    } finally {
        console.log(data)
        data.value.loading = false
    }
}

export const loadProject = async(projectID) => {
    try {
        data.value.currentProjectLoading = true
        data.value.currentProject = await pb.collection(projectRecordName).getOne(projectID)
        data.value.error = null
        console.log(`loading project: ${projectID}`)
    } catch (err) {
        data.value.error = 'Failed to load project'
        console.error('Error loading project:', err)
    } finally {
        data.value.currentProjectLoading = false
        console.log(`finsihed loading: ${projectID}`)
    }
}
</script>

