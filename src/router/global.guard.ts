import router from './router'
import VueRouter from 'vue-router'
import { storeService } from '@/services/store.service'
import { authModulePath, showTabs, isBinded } from '@/store/auth/auth.paths'
;(router as VueRouter).beforeEach((to, from, next) => {
  const fullPath = to.fullPath

  const outerPathList = [
    '/',
    '/workbench/teacher',
    '/workbench/parents',
    '/workbench/school-run',
    '/account/my',
    '/account/tourist',
    '/explore'
  ]

  const isOuterPath = outerPathList.includes(fullPath)

  console.log('TCL: isOuterPath', isOuterPath)
  if (isOuterPath) {
    // show tabs
    storeService.store.set(authModulePath + showTabs, true)
  } else {
    // hide tabs
    storeService.store.set(authModulePath + showTabs, false)
  }

  next()
})
