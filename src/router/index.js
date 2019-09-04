import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../components/Dashboard')
    },
    {
        path: '/hello',
        component: () => import('../components/Hello')
    },
    {
        path: '/helloWorld',
        component: () => import('../components/HelloWorld')
    },
    {
        path: '/sample',
        component: () => import('../components/Sample')
    },
    {
        path: '/todo',
        component: () => import('../components/List')
    },
    {
        path: '/three',
        component: () => import('../components/Three')
    },
    {
        path: '/style',
        component: () => import('../components/Style')
    },
    {
        path: '/topology',
        component: () => import('../components/Topology')
    },
    {
        path: '/chart',
        component: () => import('../components/Chart')
    }
]

export default new VueRouter({
    routes
})