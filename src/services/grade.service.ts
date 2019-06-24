import { HttpConfigService, httpConfigService } from './http-config.service'
import {
  BriefGradeResponse,
  StudentListResponse,
  StudentGradeDetailResponse
} from '@/models/grade.model'

export class GradeService {
  baseUrl: string = ''
  httpConfigService: HttpConfigService = httpConfigService

  getBriefGrade(classId: number) {
    return this.httpConfigService.httpSercvice.post<BriefGradeResponse>(
      this.baseUrl + '/w/achievement/teacher-latest-achievement',
      {
        classId
      }
    )
  }

  getHistoryGradeStudentList(classId: number) {
    return this.httpConfigService.httpSercvice.post<StudentListResponse>(
      this.baseUrl + '/w/achievement/teacher-latest-student-list',
      {
        classId
      }
    )
  }

  getHistoryGradeStudentListByCondition(condition: {
    classId: number
    grade: string
    type: number
  }) {
    return this.httpConfigService.httpSercvice.post<StudentListResponse>(
      this.baseUrl + '/w/achievement/teacher-condition-student-list',
      condition
    )
  }

  getStudentGradetDetail(condition: {
    grade: string
    studentId: number
    type: number
  }) {
    return this.httpConfigService.httpSercvice.post<StudentGradeDetailResponse>(
      this.baseUrl + '/w/achievement/teacher-one-student-achievement',
      condition
    )
  }
}

export const gradeService = new GradeService()
