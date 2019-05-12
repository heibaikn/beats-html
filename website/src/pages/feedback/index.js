import Vue from 'vue'
import App from './index.vue'
import layer from 'vue-layer'
import language from '@shared/language'
// import 'babel-polyfill'

Vue.prototype.$layer = layer(Vue);
Vue.use(language)

import './index.styl'

if (process.env.NODE_ENV == 'development') {
  require('../../mock')
}

Vue.config.productionTip = false

language.load().then(() => {
  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
  })
})