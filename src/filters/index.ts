import Vue from 'vue'
import { gradeTypeFilter } from './grade-type.filter'
import { gradeStateFilter } from './grade-state.filter'

Vue.filter('gradeTypeFilter', gradeTypeFilter)
Vue.filter('gradeStateFilter', gradeStateFilter)
