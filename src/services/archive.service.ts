import {
  AddStudentAndParentsInfoCollectionParams,
  AddStudentAndParentsInfoCollectionResponse,
  GetUnfinishedInfoCollectionResponse
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
    >(this.baseUrl + '/w/collect/child-and-parents')
  }
}

export const archiveService = new ArchiveService()
