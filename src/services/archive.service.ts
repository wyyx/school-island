import {
  AddStudentAndParentsInfoCollectionParams,
  AddStudentAndParentsInfoCollectionResponse,
  GetUnfinishedInfoCollectionResponse,
  AddTeacherInfoCollectionParams,
  AddTeacherInfoCollectionResponse,
  GetSubjectListForTeacherResponse
} from '@/models/archive.model'
import { HttpConfigService, httpConfigService } from './http-config.service'

export class ArchiveService {
  baseUrl: string = ''
  httpConfigService: HttpConfigService = httpConfigService

  getUnfinishedInfoCollection() {
    return this.httpConfigService.httpSercvice.post<
      GetUnfinishedInfoCollectionResponse
    >(this.baseUrl + '/w/collect/unfinished')
  }

  addStudentAndParentsInfoCollection(
    params: AddStudentAndParentsInfoCollectionParams
  ) {
    return this.httpConfigService.httpSercvice.post<
      AddStudentAndParentsInfoCollectionResponse
    >(this.baseUrl + '/w/collect/child-and-parents', params)
  }

  addTeacherInfoCollection(params: AddTeacherInfoCollectionParams) {
    return this.httpConfigService.httpSercvice.post<
      AddTeacherInfoCollectionResponse
    >(this.baseUrl + '/w/collect/teacher', params)
  }

  getSubjectListForTeacher() {
    return this.httpConfigService.httpSercvice.post<
      GetSubjectListForTeacherResponse
    >(this.baseUrl + '/w/collect/teacher-course')
  }
}

export const archiveService = new ArchiveService()
