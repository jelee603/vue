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
    }
]

export default new VueRouter({
    routes
})