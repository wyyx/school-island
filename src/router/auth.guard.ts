import {
  authModulePath,
  isBinded,
  isTourist,
  showTabs,
  isFirstLoading
} from '@/store/auth/auth.paths'

import router from './router'
import { storeService } from '@/services/store.service'

export function authGuard(to, from, next) {
  // open when build
  const _isBinded = storeService.store.getters[authModulePath + isBinded]
  console.log('TCL: authGuard -> _isBinded', _isBinded)

  const _isTourist = storeService.store.getters[authModulePath + isTourist]
  console.log('TCL: authGuard -> _isTourist', _isTourist)

  const _isFirstLoading =
    storeService.store.getters[authModulePath + isFirstLoading]

  // go to binding page if binded and not tourist
  if (!_isBinded && !_isTourist && !_isFirstLoading) {
    return router.push({ name: 'binding' })
  }

  next()
}
