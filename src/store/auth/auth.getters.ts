import { AuthState } from './auth.module'
import { isBinded, roleRoute, currentRole } from './auth.paths'
import { RoleVo, RoleType } from '@/models/user.model'

export const authGetters = {
  [isBinded](state: AuthState, getters): boolean {
    if (!state.user) {
      return false
    }

    const roleList = state.user && state.user.roleVoList

    if (roleList) {
      return roleList.length > 0 ? true : false
    } else {
      return false
    }
  },
  [roleRoute](state: AuthState, getters): string {
    const role = getters[currentRole] as RoleVo
    const roleCode = role && role.code

    // convert role to path
    switch (roleCode) {
      // 校办
      case RoleType.SchoolRun:
        return 'school-run'
      // 班主任 -> 显示老师界面
      case RoleType.HeadTeacher:
        return 'teacher'
      // 家长
      case RoleType.Parents:
        return 'parents'
      // 学生
      case RoleType.Student:
        return 'student'
      // 老师
      case RoleType.Teacher:
        return 'teacher'
      // 家委会
      case RoleType.ParentsCommittee:
        return 'parents-committee'
      default:
        return ''
    }
  }
}
