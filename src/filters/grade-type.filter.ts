import { EXAM_TYPES } from '@/models/grade-input.model'

export const gradeTypeFilter = (gradeType: number) => {
  return EXAM_TYPES.filter(type => type.code === gradeType)[0].exam
}
