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
      case 1:
        return 'teacher'
      case 2:
        return 'school-run'
      case 3:
        return 'parents'
      default:
        return ''
    }
  }
}
