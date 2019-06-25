export interface BriefStudentGradeForParentsResponse {
  content: BriefStudentGradeForParents
  errorCode: string
  errorMsg: string
  status: string
}

export interface BriefStudentGradeForParents {
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
