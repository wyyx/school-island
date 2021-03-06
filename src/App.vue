<template>
  <v-app>
    <div
      v-if="appIsLoading"
      class="loading-wrapper app-fill-height app-fill-width "
    >
      <div class="text-xs-center">
        <v-progress-circular indeterminate color="accent"></v-progress-circular>
      </div>
      <h3 class="subheading mt-1">正在加载数据...</h3>
    </div>

    <v-content v-else>
      <router-view></router-view>
      <AppTabs app v-if="showTabs" :role="roleRoute" class="tabs"></AppTabs>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppTabs from './components/Tabs.compoent.vue'
import Url from 'url-parse'
import { dutyService } from './services/duty.service'
import { httpConfigService } from './services/http-config.service'
import { userService } from './services/user.service'
import {
  BASE_URL,
  YANG_BASE_URL,
  GUO_BASE_URL,
  LOCAL_STORAGE_KEYS
} from './configs/config'
import { get } from 'vuex-pathify'
import {
  authModulePath,
  showTabs,
  user,
  roleRoute,
  firstRoleRoute,
  isTourist,
  isBinded,
  appIsLoading,
  currentRole,
  roleList,
  isFirstLoading
} from './store/auth/auth.paths'
import { developing } from '@/store/global.paths'
import {
  loadUserInfoAction,
  loadSchoolInfoAction,
  loadUserInfoSuccessAction,
  loadUserInfoFailAction
} from './store/auth/auth.actions'
import { storeService } from './services/store.service'
import { RoleVo } from './models/user.model'
import {
  UnfinishedInfoCollection,
  InfoCollectionUserTypes,
  AddStudentAndParentsInfoCollectionParams,
  AddTeacherInfoCollectionParams
} from './models/archive.model'
import { archiveService } from './services/archive.service'

export default Vue.extend({
  name: 'App',
  components: {
    AppTabs
  },
  data() {
    return {
      unfinishedInfoCollectionList: [] as UnfinishedInfoCollection[]
    }
  },
  computed: {
    ...get(authModulePath, {
      showTabs,
      roleRoute,
      firstRoleRoute,
      isTourist,
      isBinded,
      currentRole,
      roleList
    }),
    ...get(authModulePath, {
      appIsLoading
    }),
    hasUnfinishedStudentInfoCollection() {
      const that: any = this
      const unfinishedInfoCollectionList = that.unfinishedInfoCollectionList as UnfinishedInfoCollection[]

      const studentInfoCollection = unfinishedInfoCollectionList.filter(
        studentInfo => studentInfo.userType === InfoCollectionUserTypes.Student
      )[0]

      const studentInfoList: AddStudentAndParentsInfoCollectionParams[] =
        (studentInfoCollection && studentInfoCollection.entity) || []

      return studentInfoList.length > 0 ? true : false
    },
    teacherInfo() {
      const that: any = this
      const unfinishedInfoCollectionList = that.unfinishedInfoCollectionList as UnfinishedInfoCollection[]

      const teacherInfoCollection = unfinishedInfoCollectionList.filter(
        info => info.userType === InfoCollectionUserTypes.Teacher
      )[0]

      const teacherInfo: AddTeacherInfoCollectionParams =
        teacherInfoCollection &&
        teacherInfoCollection.entity &&
        teacherInfoCollection.entity[0]

      return teacherInfo || ({} as AddTeacherInfoCollectionParams)
    },
    hasUnfinishedTeacherInfoCollection() {
      const that: any = this
      const teacherInfo =
        (that.teacherInfo as AddTeacherInfoCollectionParams) ||
        ({} as AddTeacherInfoCollectionParams)
      return teacherInfo.name ? true : false
    }
  },
  created() {
    // open when build
    this.showAppLoading()

    this.resolveInitUrl()
    this.logBaseStatus()

    // open when build
    this.checkBinding()
    // open when build
    this.loadSchoolInfo()
    // open when build
    this.saveCurrentState()

    // // close when build
    // setTimeout(() => {
    //   this.$router.push({
    //     name: 'create-archive-for-student'
    //   })
    // }, 2000)
  },
  destroyed() {
    console.log('TCL: destroyed -> destroyed')
    this.saveCurrentState()
  },
  watch: {
    firstRoleRoute(newVal, oldVal) {
      const that: any = this
      if (that.firstRoleRoute) {
        const targetUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.targetUrl)

        if (targetUrl) {
          // go to last page
          this.$router.push({
            path: targetUrl
          })
        } else {
          // go to workbench
          // have matched workbench route
          console.log('=== have matched workbench route')
          this.$router.push({ path: `/workbench/${that.firstRoleRoute}` })
        }
      }
    },
    hasUnfinishedStudentInfoCollection(newVal, oldVal) {
      console.log('TCL: hasUnfinishedStudentInfoCollection -> newVal', newVal)
      const that: any = this
      if (newVal) {
        that.$router.push({
          name: 'create-archive-for-student'
        })
      }
    },
    hasUnfinishedTeacherInfoCollection(newVal, oldVal) {
      console.log('TCL: hasUnfinishedTeacherInfoCollection -> newVal', newVal)
      const that: any = this
      if (newVal && !that.hasUnfinishedStudentInfoCollection) {
        that.$router.push({
          name: 'create-archive-for-teacher'
        })
      }
    }
  },

  methods: {
    getUnfinishedInfoCollection() {
      archiveService.getUnfinishedInfoCollection().then(res => {
        this.unfinishedInfoCollectionList = res.data.content || []

        const that: any = this
        that.firstStudentInfo
        console.log(
          'TCL: getUnfinishedInfoCollection -> that.firstStudentInfo',
          that.firstStudentInfo
        )
        that.teacherInfo
        console.log(
          'TCL: getUnfinishedInfoCollection -> that.teacherInfo',
          that.teacherInfo
        )
      })
    },
    resolveInitUrl() {
      // parse current url
      const currentUrl = window.location.href
      const url = new Url(currentUrl, true)
      console.log('TCL: resolveInitUrl -> url', url)

      // get query params
      let s = url.query['s']
      console.log('TCL: resolveInitUrl -> s', s)
      let xyd = url.query['xyd']
      console.log('TCL: resolveInitUrl -> xyd', xyd)

      // save or fetch s and xyd from localStorage
      if (s) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.schoolId, s)
      } else {
        s = localStorage.getItem(LOCAL_STORAGE_KEYS.schoolId)
      }

      if (xyd) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.xyd, xyd)
      } else {
        xyd = localStorage.getItem(LOCAL_STORAGE_KEYS.xyd)
      }

      // set global headers
      httpConfigService.setHeaders({
        s,
        xyd
      })
    },
    restoreRole() {
      const targetRoleCode = localStorage.getItem(
        LOCAL_STORAGE_KEYS.targetRoleCode
      )
      const that: any = this
      const roleList = (that.roleList as RoleVo[]) || []

      console.log('TCL: restoreRole -> roleList', roleList)
      const targetRole = roleList.filter(
        role => role.code === parseInt(targetRoleCode)
      )[0]

      console.log('TCL: restoreRole -> targetRole', targetRole)
      if (targetRole) {
        console.log('TCL: restoreRole ->  if (targetRole) {')

        storeService.store.set(authModulePath + currentRole, targetRole)
      }
    },
    saveCurrentState() {
      // save current url and role

      const that: any = this

      window.addEventListener('beforeunload', () => {
        const currentRole = that.currentRole as RoleVo

        const excludePathArr = [
          '/?s=',
          '/grade-input-edit',
          '/binding',
          '/create-archive-for-student',
          '/create-archive-for-teacher'
        ]

        let path = this.$route.fullPath

        let isExcludedPath = false
        excludePathArr.forEach(p => {
          if (path.includes(p)) {
            isExcludedPath = true
          }
        })

        if (isExcludedPath) {
          // to home page
          path = '/'
        }

        localStorage.setItem(LOCAL_STORAGE_KEYS.targetUrl, path)
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.targetRoleCode,
          currentRole.code.toString()
        )
      })
    },
    checkBinding() {
      const that: any = this

      storeService.store.set(authModulePath + isFirstLoading, true)

      userService
        .getUserInfo()
        .then(res => {
          const userInfo = res.data.content
          console.log('TCL: checkBinding -> userInfo', userInfo)

          if (userInfo) {
            // has userInfo
            this.$store
              .dispatch(authModulePath + loadUserInfoSuccessAction, userInfo)
              .then(() => {
                this.getUnfinishedInfoCollection()

                storeService.store.set(authModulePath + isFirstLoading, false)

                if (userInfo.roleVoList && userInfo.roleVoList.length > 0) {
                  // if binded

                  this.restoreRole()

                  if (that.firstRoleRoute) {
                    // have matched workbench route
                    const targetUrl = localStorage.getItem(
                      LOCAL_STORAGE_KEYS.targetUrl
                    )

                    if (targetUrl) {
                      console.log('TCL: checkBinding -> targetUrl', targetUrl)
                      // go to last page
                      this.$router.push({
                        path: targetUrl
                      })
                    } else {
                      // go to workbench
                      // have matched workbench route
                      console.log('=== have matched workbench route')
                      this.$router.push({
                        path: `/workbench/${that.firstRoleRoute}`
                      })
                    }
                  } else {
                    // not have matched workbench route
                    console.log('!!! not have matched workbench route')
                    this.$router.push({ name: 'home' })
                  }
                } else {
                  // if not binded
                  this.$router.push({
                    name: 'binding'
                  })
                }
              })

            this.hideAppLoading()
          } else {
            // no userInfo
            this.$store.dispatch(authModulePath + loadUserInfoFailAction)
            this.$router.push({
              name: 'binding'
            })

            this.hideAppLoading()
          }
        })
        .catch(error => {
          this.$router.push({
            name: 'binding'
          })

          this.hideAppLoading()
        })
    },
    showAppLoading() {
      const store: any = this.$store
      store.set(authModulePath + appIsLoading, true)
    },
    hideAppLoading() {
      const store: any = this.$store
      store.set(authModulePath + appIsLoading, false)
    },
    loadSchoolInfo() {
      this.$store
        .dispatch(authModulePath + loadSchoolInfoAction)
        .then(() => {})
        .catch(error => {})
    },
    logBaseStatus() {
      console.log('TCL: logBaseStatus -> BASE_URL', BASE_URL)
      console.log('TCL: logBaseStatus -> YANG_BASE_URL', YANG_BASE_URL)
      console.log('TCL: logBaseStatus -> GUO_BASE_URL', GUO_BASE_URL)
    }
  }
})
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  position: fixed;
  bottom: 0px;
}

.loading-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
</style>
