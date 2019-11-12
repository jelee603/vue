import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../views/chartSample')
    },
    {
        path: '/hello',
        component: () => import('../views/hello')
    },
    {
        path: '/helloWorld',
        component: () => import('../views/helloWorld')
    },
    {
        path: '/sample',
        component: () => import('../views/sample')
    },
    {
        path: '/todo',
        component: () => import('../views/list')
    },
    {
        path: '/three',
        component: () => import('../views/three')
    },
    {
        path: '/style',
        component: () => import('../views/style')
    },
    {
        path: '/topology',
        component: () => import('../views/topology')
    },
    {
        path: '/chart',
        component: () => import('../views/chartSample')
    },
    {
        path: '/eChart',
        component: () => import('../views/eChartSample')
    },
    {
        path: '/Scroll',
        component: () => import('../views/infinityScroll')
    }
]

export default new VueRouter({
    routes
})
