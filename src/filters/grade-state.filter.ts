import { GRADE_STATE } from '@/models/grade-input.model'

export const gradeStateFilter = (gradeState: number) => {
  return GRADE_STATE.filter(state => state.code === gradeState)[0].state
}
