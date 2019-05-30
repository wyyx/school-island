import { BASE_URL } from '@/configs/config'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class HttpConfigService {
  httpSercvice: AxiosInstance
  config: AxiosRequestConfig

  constructor(config: AxiosRequestConfig) {
    this.config = config
    this.httpSercvice = axios.create(this.config)
  }

  setHeaders(headers: { [key: string]: string | number }) {
    this.config = {
      ...this.config,
      headers: { ...this.config.headers, ...headers }
    }

    this.httpSercvice = axios.create(this.config)
  }
}

export const httpConfigService = new HttpConfigService({
  baseURL: BASE_URL
})
