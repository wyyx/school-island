import { HttpConfigService, httpConfigService } from './http-config.service'
import { GetCredentialsResponse } from '@/models/cos.model'

export class CosService {
  baseUrl: string = ''

  httpConfigService: HttpConfigService = httpConfigService

  getCredentials() {
    return this.httpConfigService.httpSercvice.post<GetCredentialsResponse>(
      this.baseUrl + '/cos/auth'
    )
  }
}

export const cosService = new CosService()
