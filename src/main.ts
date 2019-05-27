import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VeeValidate from 'vee-validate'
import './plugins/vuetify'
import './plugins/img-vuer'
import './fontawesome'
import VuePictureSwipe from 'vue-picture-swipe'

import VConsole from 'vconsole'
var vConsole = new VConsole()

Vue.component('vue-picture-swipe', VuePictureSwipe)

import './styles/main.scss'

Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
