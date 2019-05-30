import { ClasslistResponse } from '@/models/class.model'
import { DeductionHistoryByWeekResponse } from '@/models/deduction-history-by-week.model'
import { DeductionListResponse } from '@/models/deduction-list.model'
import { httpConfigService, HttpConfigService } from './http-config.service'
import { DutyTopResponse } from '@/models/duty-top.model'

export class DutyService {
  httpConfigService: HttpConfigService = httpConfigService

  getDeductionList(classId: number, offset: number = 0, size: number = 10) {
    return this.httpConfigService.httpSercvice.post<DeductionListResponse>(
      '/w/score/list-page',
      {
        classId: classId,
        pageNo: offset,
        pageSize: size
      }
    )
  }

  getDeductionHistoryByWeek(classId: number) {
    return this.httpConfigService.httpSercvice.post<
      DeductionHistoryByWeekResponse
    >('/w/score/report-froms', {
      classId
    })
  }

  getClassList(schoolId: number) {
    return this.httpConfigService.httpSercvice.post<ClasslistResponse>(
      '/w/class/list',
      {
        schoolId
      }
    )
  }

  getDutyTop(schoolId: number) {
    return this.httpConfigService.httpSercvice.post<DutyTopResponse>(
      '/w/score-week/list-page',
      {
        schoolId
      }
    )
  }
}

export const dutyService = new DutyService()
