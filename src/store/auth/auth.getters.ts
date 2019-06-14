import { AuthState } from './auth.module'
import { isBinded, roleRoute } from './auth.paths'

export const authGetters = {
  [isBinded](state: AuthState, getters): boolean {
    if (!state.user) {
      return false
    }

    return state.user.binding === 0 ? false : true
  },
  [roleRoute](state: AuthState, getters): string {
    if (!state.user) {
      return ''
    }

    // convert role to path
    switch (state.user.roleCode) {
      case 100:
        return 'school-run'
      case 200:
        return 'teacher'
      case 300:
        return 'parents'
      case 500:
        return 'teacher'
      default:
        return ''
    }
  }
}
