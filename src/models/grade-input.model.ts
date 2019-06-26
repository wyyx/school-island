export interface GradeInputStudentListResponse {
  content: Student[]
  errorCode: string
  errorMsg: string
  status: string
}

export interface Student {
  grade: string
  id: number
  state: number
  subject: string
  type: number
}

export const EXAM_TYPES = [
  {
    code: 2,
    exam: '上学期期末考评'
  },
  {
    code: 4,
    exam: '下学期期末考评'
  }
]

export const GRADE_STATE = [
  {
    code: 0,
    state: '未完成'
  },
  {
    code: 1,
    state: '已完成'
  }
]

// export interface AddGradeSubjectResponse {
//   classId: 0
//   grade: string
//   subject: string
//   type: number
//   year: string
// }

export interface AddGradeSubjectResponse {
  content: number
  errorCode: string
  errorMsg: string
  status: string
}
