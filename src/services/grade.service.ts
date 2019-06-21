import { HttpConfigService, httpConfigService } from './http-config.service'
import { BriefGradeResponse, StudentListResponse } from '@/models/grade.model'

export class GradeService {
  baseUrl: string = ''
  httpConfigService: HttpConfigService = httpConfigService

  getBriefGrade(classId: number) {
    return this.httpConfigService.httpSercvice.post<BriefGradeResponse>(
      this.baseUrl + '/w/achievement/teacher-grade-brief',
      {
        classId
      }
    )
  }

  getStudentList(classId: number) {
    return this.httpConfigService.httpSercvice.post<StudentListResponse>(
      this.baseUrl + '/w/student-list',
      {
        classId
      }
    )
  }
}

export const gradeService = new GradeService()
