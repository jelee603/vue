import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App.vue'
import router from './router'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import Element from 'element-ui'
import './element-variables.scss'

Vue.use(VueMaterial)
Vue.use(Element, { size: 'small', zIndex: 3000 })

new Vue({ router, render: h => h(App) }).$mount('#app')
