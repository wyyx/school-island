export interface DeductionHistoryByWeekResponse {
  content: DeductionHistoryByWeekItem
  status: string
  errorCode: string
}

export interface DeductionHistoryByWeekItem {
  weekScore: number
  scores: number[]
}
