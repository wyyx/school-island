import { HttpConfigService, httpConfigService } from './http-config.service'
import { BriefGradeResponse } from '@/models/grade.model'

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
}

export const gradeService = new GradeService()
