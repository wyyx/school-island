import Vue from 'vue'
import gallery from 'img-vuer'

Vue.use(gallery, {
  // default 100 ,new in 0.12.0
  swipeThreshold: 150
})
