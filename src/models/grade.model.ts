import { Student } from './user.model'

// brief grade
export interface BriefGradeResponse {
  content: BriefGrade
  errorCode: string
  errorMsg: string
  status: string
}

export interface BriefGrade {
  currentSemester: string
  examTime: string
  list: BriefSubjectGrade[]
  name: number
  semester: string[]
}

export interface BriefSubjectGrade {
  achievements: number[]
  subject: string
}

// detail grade
export interface DetailGradeResponse {
  content: DetailGrade
  errorCode: string
  errorMsg: string
  status: string
}

export interface DetailGrade {
  currentSemester: string
  examTime: string
  list: DetailSubjectGrade[]
  name: number
  semester: string[]
}

export interface DetailSubjectGrade {
  achievements: number[]
  subject: string
}

// student grade detail
export interface StudentGradeDetailResponse {
  content: StudentGradeDetail
  errorCode: string
  errorMsg: string
  status: string
}

export interface StudentGradeDetail {
  currentSemester: string
  examTime: string
  latestGradeVos: LatestSubjectGradeVo[]
  semesters: string[]
}

export interface LatestSubjectGradeVo {
  achievement: number
  comment: string
  star: number
  subject: string
  teacherName: string
}

export interface StudentListResponse {
  content: Student[]
  errorCode: string
  errorMsg: string
  status: string
}
