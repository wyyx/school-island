import { Student, StudentVo } from './user.model'

// brief grade
export interface BriefGradeResponse {
  content: BriefGrade
  errorCode: string
  errorMsg: string
  status: string
}

export interface BriefGrade {
  achievementVos: BriefSubjectGrade[]
  currentGrade: string
  examType: number
  grades: string[]
  students: StudentVo[]
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

export interface LatestSubjectGradeVo {
  achievement: number
  comment: string
  star: number
  subject: string
  teacherName: string
}

export interface StudentListResponse {
  content: BriefGrade
  errorCode: string
  errorMsg: string
  status: string
}

export enum GradeLevel {
  Absent = '缺考',
  Prequalified = '待合格',
  Qualified = '合格',
  Good = '良好',
  Excellent = '优秀'
}

export interface StudentInfoForDetail {
  name: string
  grade: string
  classId: number
  semister: string
  studentId: 0
  type: 0
}

// student grade detail
export interface StudentGradeDetailResponse {
  content: StudentGradeDetail
  errorCode: string
  errorMsg: string
  status: string
}

export interface StudentGradeDetail {
  achievementVos: AchievementVo[]
  currentGrade: string
  grades: string[]
  type: number
}

export interface AchievementVo {
  achievement: number
  comment: string
  star: number
  subject: string
  teacherName: string
}

export const GRADE_LEVEL_TEXTS = [
  '缺考',
  '待合格',
  '合格',
  '良好1星',
  '良好2星',
  '良好3星',
  '优秀1星',
  '优秀2星',
  '优秀3星'
]

export interface GradeLevelModel {
  name: string
  code: number
}

export const GRADE_LEVEL_LENGTH = 5

export const GRADE_LEVELS_FOR_CHART = {
  absent: {
    name: '缺考',
    code: 1
  },
  prequalified: {
    name: '待合格',
    code: 2
  },
  qualified: {
    name: '合格',
    code: 3
  },
  good: {
    name: '良好',
    code: 4
  },
  excellent: {
    name: '优秀',
    code: 5
  }
}

export const GRADE_LEVELS = {
  absent: {
    name: '缺考',
    code: 5
  },
  prequalified: {
    name: '待合格',
    code: 4
  },
  qualified: {
    name: '合格',
    code: 3
  },
  good: {
    name: '良好',
    code: 2
  },
  excellent: {
    name: '优秀',
    code: 1
  }
}

export const GRADE_LEVELS_ARR: GradeLevelModel[] = [
  {
    name: '缺考',
    code: 5
  },
  {
    name: '待合格',
    code: 4
  },
  {
    name: '合格',
    code: 3
  },
  {
    name: '良好',
    code: 2
  },
  {
    name: '优秀',
    code: 1
  }
]

// student grade for school run
export interface BriefStudentGradeForSchoolRunResponse {
  content: BriefStudentGradeForSchoolRun
  errorCode: string
  errorMsg: string
  status: string
}

export interface BriefStudentGradeForSchoolRun {
  achievements: SubjectAchievement[]
  className: string
  currentChineseGrade: string
  gradeVos: GradeVo[]
}

export interface SubjectAchievement {
  achievements: number[]
  subject: string
}

export interface GradeVo {
  classes: ClassModelForSchoolRun[]
  grade: string
}

export interface ClassModelForSchoolRun {
  classId: number
  className: string
  grade: string
}
