import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins'
import './fontawesome'
import './ttt.js'
import './router/global.guard'
// import filters
import '@/filters'

// styles
import './styles/main.scss'

// global components
import VuePictureSwipe from 'vue-picture-swipe'
Vue.component('vue-picture-swipe', VuePictureSwipe)

// toggle when build
// vconsole
import VConsole from 'vconsole'

// set moment
import moment from 'moment'
import { storeService } from './services/store.service'
moment.locale('zh-CN')

// toggle when build
if (process.env.NODE_ENV === 'production') {
  var vConsole = new VConsole()
}

Vue.config.productionTip = false

storeService.store = store

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
