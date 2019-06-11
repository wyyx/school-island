import { HttpConfigService, httpConfigService } from './http-config.service'
import {
  BindingPost,
  UserInfoResponse,
  BindingResponse
} from '@/models/user.model'
import { YANG_BASE_URL, GUO_BASE_URL } from '@/configs/config'
import { SchoolInfoResponse, SchoolInfo } from '@/models/school.model'

export class UserService {
  baseUrl: string = GUO_BASE_URL ? GUO_BASE_URL : ''

  httpConfigService: HttpConfigService = httpConfigService

  schoolInfo: SchoolInfo = {} as SchoolInfo

  bind(data: BindingPost) {
    return this.httpConfigService.httpSercvice.post<BindingResponse>(
      this.baseUrl + '/w/user/binding',
      data
    )
  }

  getUserInfo() {
    return this.httpConfigService.httpSercvice.post<UserInfoResponse>(
      this.baseUrl + '/w/user/select-by-id'
    )
  }

  getSchoolInfo(schoolId: number) {
    return this.httpConfigService.httpSercvice
      .post<SchoolInfoResponse>(this.baseUrl + '/w/school/id', {
        id: schoolId
      })
      .then(res => {
        if (res.data.content) {
          this.schoolInfo = res.data.content
        }

        console.log(
          'TCL: UserService -> getSchoolInfo -> this.schoolInfo',
          this.schoolInfo
        )

        return res
      })
  }
}

export const userService = new UserService()
