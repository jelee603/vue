import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
    { path: '/sample', component: () => import('./components/sample')},
    { path: '*', component: () => import('./components/dashboard')},
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
