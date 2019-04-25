import Vue from 'vue'
import App from './index.vue'
// import 'babel-polyfill'
import language from '@shared/language'
import './index.styl'

Vue.use(language)

if (process.env.NODE_ENV == 'development') {
  require('../../mock')
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App />'
})