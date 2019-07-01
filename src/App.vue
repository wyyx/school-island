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
      <ul v-if="false">
        <li>isBinded:{{ isBinded }}</li>
        <li>isTourist:{{ isTourist }}</li>
        <li>roleRoute:{{ roleRoute }}</li>
      </ul>
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
  roleList
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

export default Vue.extend({
  name: 'App',
  components: {
    AppTabs
  },
  data() {
    return {}
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
    })
  },
  created() {
    this.showAppLoading()

    this.resolveInitUrl()
    this.logBaseStatus()

    // open when build
    this.checkBinding()
    // open when build
    this.loadUserInfo()
    // open when build
    this.loadSchoolInfo()

    this.saveCurrentState()

    // setTimeout(() => {
    //   console.log('to home 333333333333333333333333333333')

    //   this.$router.push({
    //     name: 'home'
    //   })
    // }, 5000)
  },
  watch: {
    firstRoleRoute(newVal, oldVal) {
      const that: any = this
      if (that.firstRoleRoute) {
        const targetUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.targetUrl)

        if (targetUrl) {
          // go to last page
          this.$router.push(
            {
              path: targetUrl
            },
            () => {
              this.hideAppLoading()
            }
          )
        } else {
          // go to workbench
          // have matched workbench route
          console.log('=== have matched workbench route')
          this.$router.push(
            { path: `/workbench/${that.firstRoleRoute}` },
            () => {
              this.hideAppLoading()
            }
          )
        }
      }
    }
  },

  methods: {
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

      const targetRole = roleList.filter(
        role => role.code === parseInt(targetRoleCode)
      )[0]

      if (targetRole) {
        storeService.store.set(authModulePath + currentRole, targetRole)
      }
    },
    saveCurrentState() {
      // save current url and role

      const that: any = this

      window.addEventListener('beforeunload', () => {
        const currentRole = that.currentRole as RoleVo

        const partInitPath = '/?s='

        let path = this.$route.fullPath

        // don't save init path
        if (path.includes(partInitPath)) {
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
                if (userInfo.roleVoList && userInfo.roleVoList.length > 0) {
                  // if binded

                  this.restoreRole()

                  storeService.store.set(authModulePath + showTabs, true)

                  if (that.firstRoleRoute) {
                    const targetUrl = localStorage.getItem(
                      LOCAL_STORAGE_KEYS.targetUrl
                    )

                    if (targetUrl) {
                      console.log('TCL: checkBinding -> targetUrl', targetUrl)
                      // go to last page
                      this.$router.push(
                        {
                          path: targetUrl
                        },
                        () => {
                          console.log('9999999999999999999999')
                          this.hideAppLoading()
                        },
                        () => {
                          console.log('555555555555555555555555555555555555')
                          this.hideAppLoading()

                          this.$router.push({
                            name: 'home'
                          })
                        }
                      )

                      // this.hideAppLoading()
                    } else {
                      // go to workbench
                      // have matched workbench route
                      console.log('=== have matched workbench route')
                      this.$router.push(
                        { path: `/workbench/${that.firstRoleRoute}` }
                        // () => {
                        //   this.hideAppLoading()
                        // },
                        // () => {
                        //   this.hideAppLoading()
                        // }
                      )

                      // this.hideAppLoading()
                    }
                  } else {
                    // not have matched workbench route
                    console.log('!!! not have matched workbench route')
                    this.$router.push({ name: 'home' })
                  }
                } else {
                  // if not binded
                  this.$router.push(
                    {
                      name: 'binding'
                    },
                    () => {
                      this.hideAppLoading()
                    }
                  )

                  // this.hideAppLoading()
                }
              })
          } else {
            // no userInfo
            this.$store.dispatch(authModulePath + loadUserInfoFailAction)
            this.$router.push(
              {
                name: 'binding'
              },
              () => {
                this.hideAppLoading()
              }
            )

            // this.hideAppLoading()
          }
        })
        .catch(error => {
          this.$router.push(
            {
              name: 'binding'
            },
            () => {
              this.hideAppLoading()
            }
          )

          // this.hideAppLoading()
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
    loadUserInfo() {
      this.$store
        .dispatch(authModulePath + loadUserInfoAction)
        .then(() => {})
        .catch(error => {})
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
  z-index: 999;
}

.loading-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
</style>
