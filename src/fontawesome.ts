import Vue from 'vue'

// import fontawesome lib
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTree, faAppleAlt } from '@fortawesome/free-solid-svg-icons'

// add fontawesome icons
library.add(faTree)
library.add(faAppleAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
