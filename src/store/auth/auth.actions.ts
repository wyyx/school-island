import { userService } from '@/services/user.service'
import { UserInfo } from '@/models/user.model'
import {
  user,
  school,
  currentRole,
  authModulePath,
  currentStudent
} from './auth.paths'
import router from '@/router/router'
import { storeService } from '@/services/store.service'
// import store from '../store'

// user info actions
export const loadUserInfoAction = 'loadUserInfoAction'
export const loadUserInfoSuccessAction = 'loadUserInfoSuccessAction'
export const loadUserInfoFailAction = 'loadUserInfoFailAction'

// school info actions
export const loadSchoolInfoAction = 'loadSchoolInfoAction'
export const loadSchoolInfoSuccessAction = 'loadSchoolInfoSuccessAction'
export const loadSchoolInfoFailAction = 'loadSchoolInfoFailAction'

export const authActions = {
  // load user info
  [loadUserInfoAction]({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      console.log('loadUserInfoAction xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      userService
        .getUserInfo()
        .then(res => {
          console.log('TCL: userInfo', res)
          const userInfo = res.data.content

          if (userInfo) {
            dispatch(loadUserInfoSuccessAction, res.data.content)

            // set first role as default
            const firstRole = userInfo.roleVoList && userInfo.roleVoList[0]
            storeService.store.set(authModulePath + currentRole, firstRole)

            const firstStudent =
              userInfo.studentVoList && userInfo.studentVoList[0]
            storeService.store.set(
              authModulePath + currentStudent,
              firstStudent
            )
          } else {
            dispatch(loadUserInfoFailAction)
            reject()
          }

          resolve()
        })
        .catch(error => {
          dispatch(loadUserInfoFailAction)
          reject()
        })
    })
  },
  [loadUserInfoSuccessAction]({ dispatch, commit }, payload: UserInfo) {
    return new Promise((resolve, reject) => {
      commit(user, payload)
      resolve()
    })
  },
  [loadUserInfoFailAction]({ dispatch, commit }) {
    commit(user, {})
  },
  // load school info
  [loadSchoolInfoAction]({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      userService
        .getSchoolInfo()
        .then(res => {
          const schoolInfo = res.data.content
          if (schoolInfo) {
            dispatch(loadSchoolInfoSuccessAction, schoolInfo)

            // change html title
            setPageTitle(schoolInfo.name)

            // save schoolInfo to userService
            userService.schoolInfo = { ...res.data.content }
            resolve()
            console.log('TCL: userService.schoolInfo', userService.schoolInfo)
          } else {
            dispatch(loadSchoolInfoFailAction)
            reject()
          }
        })
        .catch(error => {
          dispatch(loadSchoolInfoFailAction)
          reject()
        })
    })
  },
  [loadSchoolInfoSuccessAction]({ dispatch, commit }, payload: UserInfo) {
    commit(school, payload)
  },
  [loadSchoolInfoFailAction]({ dispatch, commit }) {
    commit(school, {})
  }
}

function setPageTitle(title: string) {
  document.title = title
}
