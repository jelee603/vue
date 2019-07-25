import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        component: () => import('../components/Dashboard')
    },
    {
        path: '/sample',
        component: () => import('../components/Sample')
    },
]

export default new VueRouter({
    routes
})