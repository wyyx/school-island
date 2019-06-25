export interface StudentInfoResponse {
  content: StudentInfo
  errorCode: string
  errorMsg: string
  status: string
}

export interface StudentInfo {
  birthday: string
  className: string
  homeAddress: string
  idcard: string
  name: string
  nation: string
  nativePlace: string
  schoolName: string
  selfIntroduction: string
  studentNumber: string
}
