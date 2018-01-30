import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'

import '@/common/stylus/index.styl'
Vue.config.productionTip = false
FastClick.attach(document.body) // 去掉交互控件300ms延时
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
