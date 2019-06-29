import {
  authModulePath,
  isBinded,
  isTourist,
  showTabs
} from '@/store/auth/auth.paths'

import router from './router'
import { storeService } from '@/services/store.service'

export function authGuard(to, from, next) {
  const _isBinded = storeService.store.getters[authModulePath + isBinded]
  console.log('TCL: authGuard -> _isBinded', _isBinded)

  const _isTourist = storeService.store.getters[authModulePath + isTourist]
  console.log('TCL: authGuard -> _isTourist', _isTourist)

  // show tabs if binded
  if (_isBinded) {
    storeService.store.set(authModulePath + showTabs, true)
  }

  // go to binding page if binded and not tourist
  if (!_isBinded && !_isTourist) {
    console.log('yyyyyyyyyyyyyyyyyyyyyy', )
    return router.push({ name: 'binding' })
  }

  next()
}
