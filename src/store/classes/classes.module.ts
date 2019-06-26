import { make } from 'vuex-pathify'
import { classesActions } from './classes.actions'
import { classesGetters } from './classes.getters'
import { ClassModel } from '@/models/class.model'
import { StudentInfoForDetail } from '@/models/grade.model'
import { GradeSubject } from '@/models/grade-input.model'

export interface classesState {
  classList: ClassModel[]
  currentClass: ClassModel
  currentStudentForTeacher: StudentInfoForDetail
  currentGradeSubject: GradeSubject
}

const initialClassesState: classesState = {
  classList: [],
  currentStudentForTeacher: {} as StudentInfoForDetail,
  currentClass: {} as ClassModel,
  currentGradeSubject: {} as GradeSubject
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
