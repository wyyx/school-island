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
  extraTutoringContent: string[]
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
  sickenIllness: string[]
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

function reverseKeyMap(obj) {
  let reverseObj = {}

  Object.keys(obj).forEach(key => {
    reverseObj[obj[key]] = key
  })

  return reverseObj
}

export const firstGuardianVoToApiMap = {
  guardianName: 'parentsName',
  phone: 'phone',
  certificateType: 'papersType',
  certificateTypeName: 'papersType',
  certificateNumber: 'parentsIdCard',
  educationBackground: 'educationDiploma',
  profession: 'professionPosition',
  relation: 'withStudentRelation'
}

export const apiTofirstGuardianVoMap = reverseKeyMap(firstGuardianVoMap)

export const secondGuardianVoToApiMap = {
  guardianName2: 'parentsName',
  phone2: 'phone',
  certificateType2: 'papersType',
  certificateTypeName2: 'papersType',
  certificateNumber2: 'parentsIdCard',
  educationBackground2: 'educationDiploma',
  profession2: 'professionPosition',
  relation2: 'withStudentRelation'
}

export const apiToSecondGuardianVoMap = reverseKeyMap(secondGuardianVoToApiMap)

export const studentInfoVoToApiMap = {
  studentIdCard: 'childIdCard',
  studentName: 'childName',
  birthplace: 'nativePlace',
  nation: 'nation',
  isOnlyChild: 'onlyChild',
  isLeftoverChild: 'stayHomeChild',
  address: 'homeAddress',
  pickupPerson: 'majorConvoy',
  familyStructure: 'familyConstruction',
  readingBehaviour: 'readHabit',
  fatherCompanyTime: 'fatherAccompany',
  isWillingJoinInParentsCommittee: 'parentCommittee',
  parentsCommitteeRole: 'committeePosition',
  guardianResource: 'resource',
  height: 'height',
  weight: 'weight',
  visionLevel: 'eyesight',
  visionScoreLeftEye: 'leftEye',
  visionScoreRightEye: 'rightEye',
  sleepAtTime: 'sleepTime',
  getUpAtTime: 'getUpTime',
  personality: 'characterChild',
  doUp: 'cleanToy',
  homeworkFinishTime: 'homeworkFinish',
  trainingSubject: 'extraTutoringContent',
  touchElectronicDeviceTime: 'touchPhoneTime',
  kindergarten: 'kindergarten',
  isEatLunchAtSchool: 'lunchAtSchool',
  disease: 'sickenIllness',
  allergy: 'foodAndMedicineAllergy',
  speciality: 'trait',
  expectation: 'hope'
}

export const apiToStudentInfoVoMap = reverseKeyMap(studentInfoVoToApiMap)
