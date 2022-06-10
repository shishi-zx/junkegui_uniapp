import Vue from 'vue'
import App from './App'
import {router,RouterMount} from './router.js' 
import Mylink from '../node_modules/uni-simple-router/dist/link.vue'   

import Toast from './wxcomponents/toast/toast';

import store from './store/index'

import utils from './utils/index'


Vue.component('my-link',Mylink)
Vue.use(router)

Vue.prototype.toast = Toast
Vue.prototype.utils = utils

Vue.config.productionTip = false

App.mpType = 'app'

Vue.filter('dateFormat', function (value) {
  const dt = new Date(value)
  const y = dt.getFullYear() //年
  const m = (dt.getMonth() + 1 + '').padStart(2,'0') //月
  const d = (dt.getDate() + '').padStart(2,'0') //日
  // const hh = (dt.getHours() + '').padStart(2,'0') //时
  // const mm = (dt.getMinutes() + '').padStart(2,'0') //分
  // const ss = (dt.getSeconds() + '').padStart(2,'0') //秒
  
  return `${y}年${m}月${d}日`
})


const app = new Vue({
  ...App,
  store
})
app.$mount()
