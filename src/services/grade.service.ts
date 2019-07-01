import {
  BriefGradeResponse,
  BriefStudentGradeForSchoolRunResponse,
  StudentGradeDetailResponse,
  StudentListResponse
} from '@/models/grade.model'
import { HttpConfigService, httpConfigService } from './http-config.service'
import { BriefStudentGradeForParentsResponse } from '@/models/parents-grade.model'
import {
  GradeInputGradeSubjectListResponse,
  GetAvaliableSubjectListResponse,
  AddGradeSubjectResponse,
  GetStudentListResponse,
  AddStudentGradeResponse,
  BatchAddStudentGradeResponse
} from '@/models/grade-input.model'

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

  getGradeInputGradeSubjectList(params: {
    classId: number
    pageNo: number
    pageSize: number
    teacherId: number
  }) {
    return this.httpConfigService.httpSercvice.post<
      GradeInputGradeSubjectListResponse
    >(this.baseUrl + '/w/exam-submit-record/list', params)
  }

  addGradeSubject(params: {
    classId: number
    grade: string
    subject: string
    subjectCode: number
    type: number
  }) {
    return this.httpConfigService.httpSercvice.post<AddGradeSubjectResponse>(
      this.baseUrl + '/w/exam-submit-record/add-subject',
      params
    )
  }

  getAvaliableSubjectList(params: { classId: number; teacherId: number }) {
    return this.httpConfigService.httpSercvice.post<
      GetAvaliableSubjectListResponse
    >(this.baseUrl + '/w/course/select_by_teacher_id', params)
  }

  getStudentList(gradeSubjectId: number) {
    return this.httpConfigService.httpSercvice.post<GetStudentListResponse>(
      this.baseUrl + '/w/exam-submit-record/detailed',
      { id: gradeSubjectId }
    )
  }

  addStudentGrade(params: {
    achievement: number
    comment: string
    examSubmitRecordId: number
    star: number
    studentId: number
    studentName: string
    studentNumber: string
  }) {
    return this.httpConfigService.httpSercvice.post<AddStudentGradeResponse>(
      this.baseUrl + '/w/exam-submit-record/add',
      params
    )
  }

  batchAddStudentGrade(params: {
    classId: number
    examAchievementParamList: [
      {
        achievement: number
        comment: string
        star: number
        studentId: number
        studentName: string
        studentNumber: string
      }
    ]
    grade: string
    state: number
    subject: string
    type: number
    year: string
  }) {
    return this.httpConfigService.httpSercvice.post<
      BatchAddStudentGradeResponse
    >(this.baseUrl + '/w/exam-submit-record/insert', params)
  }
}

export const gradeService = new GradeService()
