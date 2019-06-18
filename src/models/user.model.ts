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
  city: string
  country: string
  headImgUrl: string
  id: number
  language: string
  name: string
  nickname: string
  province: string
  roleVoList: RoleVo[]
  sex: number
  studentVoList: Student[]
}

export interface RoleVo {
  code: number
  name: string
}

export interface Student {
  age: number
  classId: number
  id: number
  idcard: string
  mobile: string
  name: string
  nickname: string
  parentType: number
  rainAmount: number
  schoolId: number
  sex: string
  studentNumber: string
  userName: string
}

export enum Role {
  Teacher = 'teacher',
  SchoolRun = 'school-run',
  Parents = 'parents'
}

export enum RoleType {
  SchoolRun = 100,
  HeadTeacher = 200,
  Parents = 300,
  Student = 400,
  Teacher = 500,
  ParentsCommittee = 600
}

export const parentTypes = [
  {
    value: 1,
    text: '爸爸'
  },
  {
    value: 2,
    text: '妈妈'
  },
  {
    value: 3,
    text: '爷爷'
  },
  {
    value: 4,
    text: '奶奶'
  },
  {
    value: 5,
    text: '外公'
  },
  {
    value: 6,
    text: '外婆'
  }
]
