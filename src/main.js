import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/tailwind.css'

import VuePaginate from 'vue-paginate'
import Interceptor from './interceptor'

Interceptor();


Vue.config.productionTip = false
Vue.use(VuePaginate)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
