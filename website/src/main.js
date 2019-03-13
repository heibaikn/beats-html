import Vue from 'vue'
import App from './App'
import 'babel-polyfill'

import './styles/main.styl'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
