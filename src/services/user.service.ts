import { HttpConfigService, httpConfigService } from './http-config.service'
import {
  BindingPost,
  UserInfoResponse,
  BindingResponse
} from '@/models/user.model'

export class UserService {
  httpConfigService: HttpConfigService = httpConfigService

  bind(data: BindingPost) {
    return this.httpConfigService.httpSercvice.post<BindingResponse>(
      '/w/user/binding',
      data
    )
  }

  getUserInfo() {
    return this.httpConfigService.httpSercvice.post<UserInfoResponse>(
      '/w/user/select-by-id'
    )
  }
}

export const userService = new UserService()
