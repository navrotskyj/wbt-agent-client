import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './plugins/store';
import './plugins/router';
import store from './store'
import router from './router'

import DefaultLayout from './layouts/default.vue'
Vue.component('default-layout', DefaultLayout);

Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
