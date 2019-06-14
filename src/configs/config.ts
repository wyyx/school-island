import { UserInfo } from '@/models/user.model'
import { SchoolInfo } from '@/models/school.model'

export const BASE_URL = process.env.VUE_APP_BASE_URL
export const YANG_BASE_URL = process.env.VUE_APP_YANG_BASE_URL
export const GUO_BASE_URL = process.env.VUE_APP_GUO_BASE_URL

export const COLORS = [
  '#2196F3',
  '#00BCD4',
  '#FFC107',
  '#E91E63',
  '#4CAF50',
  '9E9E9E',
  '9E9E9E',
  '9E9E9E',
  '9E9E9E',
  '9E9E9E'
]

export enum Role {
  Teacher = 'teacher',
  SchoolRun = 'school-run',
  Parents = 'parents'
}

export const mockUserInfo: UserInfo = {
  binding: 0,
  city: 'string',
  country: 'string',
  headImgUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  id: 0,
  idcard: 'string',
  language: 'string',
  loginErrorCount: 0,
  mobile: 'string',
  name: 'string',
  nickname: '刘老师的昵称',
  openId: 'string',
  privilege: 'string',
  province: 'string',
  pwd: 'string',
  refId: 0,
  roleCode: 0,
  roleName: 'string',
  salt: 'string',
  sex: 0,
  status: 0,
  unionId: 'string',
  userName: 'string',
  userType: 0,
  studentName: '王小明'
}

export const mockSchoolInfo: SchoolInfo = {
  code: 'aaabbbcccddd',
  name: '成都市希望小学',
  logo: ['string'],
  tel: 'string',
  email: 'string',
  address: 'string',
  history: 'string',
  idea: 'string',
  description: 'string',
  schoolId: 'string'
}
