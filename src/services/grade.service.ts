import {
  BriefGradeResponse,
  BriefStudentGradeForSchoolRunResponse,
  StudentGradeDetailResponse,
  StudentListResponse
} from '@/models/grade.model'
import { HttpConfigService, httpConfigService } from './http-config.service'
import { BriefStudentGradeForParentsResponse } from '@/models/parents-grade.model'

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

  getStudentGradeDetail(condition: {
    grade: string
    studentId: number
    type: number
  }) {
    return this.httpConfigService.httpSercvice.post<StudentGradeDetailResponse>(
      this.baseUrl + '/w/achievement/teacher-one-student-achievement',
      condition
    )
  }

  getBriefStudentGradeForSchoolRun() {
    return this.httpConfigService.httpSercvice.post<
      BriefStudentGradeForSchoolRunResponse
    >(this.baseUrl + '/w/achievement/school-latest-achievement')
  }

  getBriefStudentGradeForSchoolRunByCondition(condition: {
    classId: number
    className: string
    grade: string
  }) {
    return this.httpConfigService.httpSercvice.post<
      BriefStudentGradeForSchoolRunResponse
    >(this.baseUrl + '/w/achievement/school-condition-achievement', condition)
  }

  getBriefStudentGradeForParents(studentId: number) {
    return this.httpConfigService.httpSercvice.post<
      BriefStudentGradeForParentsResponse
    >(this.baseUrl + '/w/achievement/parent-achievement-brief', {
      studentId
    })
  }

  getBriefStudentGradeDetailForParents(studentId: number) {
    return this.httpConfigService.httpSercvice.post<
      BriefStudentGradeForParentsResponse
    >(this.baseUrl + '/w/achievement/parent-achievement-detail', {
      studentId
    })
  }

  getBriefStudentGradeDetailForParentsByCondition(condition: {
    grade: string
    studentId: number
    type: number
  }) {
    return this.httpConfigService.httpSercvice.post<
      BriefStudentGradeForParentsResponse
    >(this.baseUrl + '/w/achievement/parent-condition-achievement', condition)
  }
}

export const gradeService = new GradeService()
