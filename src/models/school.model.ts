export interface SchoolInfoResponse {
  content: SchoolInfo
  errorCode: string
  errorMsg: string
  status: string
}

export interface SchoolInfo {
  code: string
  name: string
  logo: string[]
  tel: string
  email: string
  address: string
  history: string
  idea: string
  description: string
  schoolId: string
}
