import { make } from 'vuex-pathify'
import { classesActions } from './classes.actions'
import { classesGetters } from './classes.getters'
import { ClassModel } from '@/models/class.model'

export interface classesState {
  classList: ClassModel[]
}

const initialClassesState: classesState = {
  classList: []
}

const autoMutations = make.mutations(initialClassesState)
const autoGetters = make.getters(initialClassesState)

export const classes = {
  namespaced: true,
  state: initialClassesState,
  mutations: { ...autoMutations },
  actions: classesActions,
  getters: { ...autoGetters, ...classesGetters }
}
