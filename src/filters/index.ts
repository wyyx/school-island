import Vue from 'vue'
import { gradeTypeFilter } from './grade-type.filter'
import { gradeStateFilter } from './grade-state.filter'
import { dateFilter } from './date.filter'

Vue.filter('dateFilter', dateFilter)
Vue.filter('gradeTypeFilter', gradeTypeFilter)
Vue.filter('gradeStateFilter', gradeStateFilter)
