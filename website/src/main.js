import Vue from 'vue'
import App from './App'
import 'babel-polyfill'

import './styles/main.styl'

if (process.env.NODE_ENV == 'development'){
  require('./mock')
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
