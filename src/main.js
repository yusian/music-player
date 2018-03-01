import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import axios from 'axios'
import '@/common/stylus/index.styl'
import VConsole from 'vconsole'

Vue.config.productionTip = false
FastClick.attach(document.body) // 去掉交互控件300ms延时
/* eslint-disable no-new */
Vue.use(VueLazyload, {
  loading: require('@/common/image/default.png')
})
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
new VConsole()
