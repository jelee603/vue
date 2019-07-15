import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter)

const Foo = {template: '<div>foo</div>'}
const routes = [
    { path: '/sample', component: () => import('./components/sample')},
    { path: '*', component: () => import('./components/dashboard')},
]

const router = new VueRouter({
    routes
})

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
