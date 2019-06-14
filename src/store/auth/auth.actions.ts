import { userService } from '@/services/user.service'
import { UserInfo } from '@/models/user.model'
import { user, school } from './auth.paths'
import router from '@/router/router'

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
      userService
        .getUserInfo()
        .then(res => {
          console.log('TCL: userInfo', res)
          dispatch(loadUserInfoSuccessAction, res.data.content)

          console.log(
            'TCL: res.data.content && res.data.content.binding',
            res.data.content && res.data.content.binding
          )
          // if (res.data.content && res.data.content.binding) {
          //   router.push({ name: 'home' })
          // }

          resolve()
        })
        .catch(error => {
          dispatch(loadUserInfoFailAction)
          reject()
        })
    })
  },
  [loadUserInfoSuccessAction]({ dispatch, commit }, payload: UserInfo) {
    commit(user, payload)
  },
  [loadUserInfoFailAction]({ dispatch, commit }) {
    commit(user, null)
  },
  // load school info
  [loadSchoolInfoAction]({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      userService.getSchoolInfo().then(res => {
        if (res.data.content) {
          dispatch(loadSchoolInfoSuccessAction, res.data.content)

          // save schoolInfo to userService
          userService.schoolInfo = { ...res.data.content }
          resolve()
          console.log('TCL: userService.schoolInfo', userService.schoolInfo)
        } else {
          dispatch(loadSchoolInfoFailAction)
          reject()
        }
      })
    })
  },
  [loadSchoolInfoSuccessAction]({ dispatch, commit }, payload: UserInfo) {
    commit(school, payload)
  },
  [loadSchoolInfoFailAction]({ dispatch, commit }) {
    commit(school, null)
  }
}
