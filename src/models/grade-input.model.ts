export interface GradeInputGradeSubjectListResponse {
  content: GradeSubject[]
  errorCode: string
  errorMsg: string
  status: string
}

export interface GradeSubject {
  grade: string
  id: number
  state: number
  subject: string
  type: number
}

export const EXAM_TYPES = [
  {
    code: 2,
    exam: '上学期'
  },
  {
    code: 4,
    exam: '下学期'
  }
]

export enum GradeStateTypes {
  unfinished = 0,
  finished = 1
}

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

export interface AddGradeSubjectResponse {
  content: number
  errorCode: string
  errorMsg: string
  status: string
}

export interface GetAvaliableSubjectListResponse {
  content: Subject[]
  errorCode: string
  errorMsg: string
  status: string
}

export interface Subject {
  code: number
  name: string
}

export interface GetStudentListResponse {
  content: StudentListContent
  errorCode: string
  errorMsg: string
  status: string
}

export interface StudentListContent {
  classId: number
  className: string
  studentExamAchievementVoList: Student[]
  subject: string
  type: number
  year: string
}

export interface Student {
  achievement: number
  comment: string
  star: number
  studentId: number
  studentName: string
  studentNumber: string
}

export interface AddStudentGradeResponse {
  content: number
  errorCode: string
  errorMsg: string
  status: string
}
