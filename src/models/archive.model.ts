export interface GetUnfinishedInfoCollectionResponse {
  content: UnfinishedInfoCollection[]
  errorCode: string
  errorMsg: string
  status: string
}

export interface UnfinishedInfoCollection {
  entity: AddStudentAndParentsInfoCollectionParams
  userType: number
}

export interface AddStudentAndParentsInfoCollectionParams {}

export interface AddStudentAndParentsInfoCollectionParams {
  characterChild: number
  childIdCard: string
  childName: string
  cleanToy: number
  committeePosition: number
  extraTutoringContent: string
  eyesight: number
  familyConstruction: number
  fatherAccompany: number
  foodAndMedicineAllergy: string
  getUpTime: number
  height: number
  homeAddress: string
  homeworkFinish: number
  hope: string
  kindergarten: string
  leftEye: string
  lunchAtSchool: number
  majorConvoy: number
  nation: string
  nativePlace: string
  onlyChild: number
  parentCommittee: number
  parents: Parent[]
  readHabit: number
  resource: string
  rightEye: string
  sickenIllness: string
  sleepTime: number
  stayHomeChild: number
  touchPhoneTime: number
  trait: string
  weight: number
  studentType?: number
}

export interface Parent {
  educationDiploma: number
  papersType: string
  parentsIdCard: string
  parentsName: string
  phone: string
  professionPosition: string
  withStudentRelation: number
}

export interface AddStudentAndParentsInfoCollectionResponse {
  content: number
  errorCode: string
  errorMsg: string
  status: string
}

export enum InfoCollectionUserTypes {
  Student = 1,
  Teacher = 2
}

export enum InfoCollectionStudentTypes {
  NewStudent = 1,
  OldStudent = 2
}
