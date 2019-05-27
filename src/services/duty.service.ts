import { BASE_URL } from '@/configs/config'
import { httpService } from './http.service'
import { DeductionListResponse } from '@/models/deduction-list.model'
import { DeductionHistoryByWeekResponse } from '@/models/deduction-history-by-week.model'
import { ClasslistResponse } from '@/models/class.model'
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

export class DutyService {
  httpService: AxiosInstance
  config: AxiosRequestConfig

  constructor(baseUrl: string, config?: AxiosRequestConfig) {
    this.config = config || {}
    this.httpService = axios.create(config)
  }

  setHeaders(headers: { [key: string]: string | number }) {
    this.config = {
      ...this.config,
      headers: {
        ...this.config.headers,
        ...headers
      }
    }
    this.httpService = axios.create(this.config)
  }

  getDeductionList(classId: number, offset: number = 0, size: number = 10) {
    return this.httpService.post<DeductionListResponse>(
      BASE_URL + '/w/score/list-page',
      {
        classId: classId,
        pageNo: offset,
        pageSize: size
      }
    )
  }

  getDeductionHistoryByWeek(classId: number) {
    return this.httpService.post<DeductionHistoryByWeekResponse>(
      BASE_URL + '/w/score/report-froms',
      {
        classId
      }
    )
  }

  getClassList(schoolId: number) {
    return this.httpService.post<ClasslistResponse>(
      BASE_URL + '/w/class/list',
      {
        schoolId
      }
    )
  }
}

export const dutyService = new DutyService(BASE_URL)
