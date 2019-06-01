import Vue from 'vue'
import App from './Mobile.vue'
import layer from 'vue-layer'
import router from './router/mobile'
import language from '@shared/language'
import * as api from '@/api'
// import 'babel-polyfill'

Vue.prototype.$layer = layer(Vue);

import '@shared/styles/mobile.styl'

Vue.use(language)
Vue.prototype.$api = api;

if (process.env.NODE_ENV == 'development'){
  require('./mock')
}

Vue.config.productionTip = false

language.load().then(()=>{
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})
