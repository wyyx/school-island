import Vue from 'vue'
import VCharts from 'v-charts'

import VeHistogram from 'v-charts/lib/line.common'

Vue.use(VCharts)

Vue.component(VeHistogram.name, VeHistogram)
