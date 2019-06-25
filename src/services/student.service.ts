import { StudentInfoResponse } from '@/models/student.model'
import { HttpConfigService, httpConfigService } from './http-config.service'

export class StudentService {
  baseUrl: string = ''
  httpConfigService: HttpConfigService = httpConfigService

  getStudentInfo(studentId: number) {
    return this.httpConfigService.httpSercvice.post<StudentInfoResponse>(
      this.baseUrl + '/w/student/student-file-info',
      {
        studentId
      }
    )
  }
}

export const studentService = new StudentService()
