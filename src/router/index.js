import { createRouter, createWebHistory } from 'vue-router'
import { loadProject } from '../components/store.vue'
import Home from '../pages/HomePage.vue'
import About from '../pages/AboutPage.vue'
import Contact from '../pages/ContactPage.vue'
import Collection from '../pages/CollectionPage.vue'
import Project from '../pages/ProjectPage.vue'

const routes = [
    {
        path:'/',
        name:'Home',
        component: Home
    },
    {
        path:'/about',
        name:'About',
        component: About
    },
    {
        path:'/contact',
        name:'Contact',
        component: Contact
    },
    {
        path:'/collection',
        name:'Collection',
        component: Collection
    },
    {
        path:'/project/:id',
        name:'Project',
        component: Project,
        beforeEnter: async (toString) => {
            console.log(toString.params.id)
            await loadProject(toString.params.id)
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
