import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './plugins/store';
import './plugins/router';
import store from './store';
import router from './router';
import DefaultLayout from './layouts/default.vue';
Vue.component('default-layout', DefaultLayout);
Vue.config.productionTip = false;
// router.beforeEach(async(to, from, next) => {
//     if (to.params.callId) {
//         const exists = await store.dispatch('existsCall', to.params.callId)
//         if (!exists) {
//             return next({name: "dashboard"})
//         }
//     }
//     next()
// })
new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
//# sourceMappingURL=main.js.map