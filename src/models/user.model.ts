export interface BindingPost {
  idcard: string
  name: string
  parentType: number
  userType: number
}

export interface BindingResponse {
  content: number
  errorCode: string
  errorMsg: string
  status: string
}

export interface UserInfoResponse {
  content: UserInfo
  errorCode: string
  errorMsg: string
  status: string
}

export interface UserInfo {
  binding: number
  city: string
  country: string
  headImgUrl: string
  id: number
  idcard: string
  language: string
  loginErrorCount: number
  mobile: string
  name: string
  nickname: string
  openId: string
  privilege: string
  province: string
  pwd: string
  refId: number
  roleCode: number
  roleName: string
  salt: string
  sex: number
  status: number
  unionId: string
  userName: string
  userType: number
  studentName?: string
}

export enum BindingStatus {
  NotBinding = 0,
  Binded = 1,
  Tourist = 3
}
