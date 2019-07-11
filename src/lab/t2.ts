const firstGuardianVoMap = {
  guardianName: 'parentsName',
  phone: 'phone',
  certificateType: 'papersType',
  certificateTypeName: 'papersType',
  certificateNumber: 'parentsIdCard',
  educationBackground: 'educationDiploma',
  profession: 'professionPosition',
  relation: 'withStudentRelation'
}
console.log('TCL: firstGuardianVoMap', firstGuardianVoMap)

let aa = {}
Object.keys(firstGuardianVoMap).forEach(key => {
  aa[firstGuardianVoMap[key]] = key
})
console.log('TCL: aa', aa)
