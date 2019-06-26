<template>
  <v-app>
    <div
      v-if="appIsLoading"
      class="loading-wrapper fill-height fill-width both-center column"
    >
      <v-progress-circular indeterminate color="accent"></v-progress-circular>
      <h3 class="subheading mt-1">正在加载数据...</h3>
    </div>
    <v-content v-else>
      <ul v-if="false">
        <li>isBinded:{{ isBinded }}</li>
        <li>isTourist:{{ isTourist }}</li>
        <li>roleRoute:{{ roleRoute }}</li>
      </ul>
      <router-view></router-view>
      <AppTabs v-if="showTabs" :role="roleRoute" class="tabs"></AppTabs>
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
import { BASE_URL, YANG_BASE_URL, GUO_BASE_URL } from './configs/config'
import { get } from 'vuex-pathify'
import {
  authModulePath,
  showTabs,
  user,
  roleRoute,
  isTourist,
  isBinded,
  appIsLoading
} from './store/auth/auth.paths'
import { developing } from '@/store/global.paths'
import {
  loadUserInfoAction,
  loadSchoolInfoAction,
  loadUserInfoSuccessAction,
  loadUserInfoFailAction
} from './store/auth/auth.actions'
import { storeService } from './services/store.service'

export default Vue.extend({
  name: 'App',
  components: {
    AppTabs
  },
  data() {
    return {}
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
  },
  computed: {
    ...get(authModulePath, {
      showTabs,
      roleRoute,
      isTourist,
      isBinded
    }),
    ...get(authModulePath, {
      appIsLoading
    })
  },
  methods: {
    resolveInitUrl() {
      // parse current url
      const currentUrl = window.location.href
      const url = new Url(currentUrl, true)
      console.log('TCL: resolveInitUrl -> url', url)

      // get query params
      const s = url.query['s']
      console.log('TCL: resolveInitUrl -> s', s)
      const xyd = url.query['xyd']

      // set global headers
      httpConfigService.setHeaders({
        xyd,
        s
      })

      // // open when build
      // this.$router.push({ name: 'home' })
    },
    checkBinding() {
      userService
        .getUserInfo()
        .then(res => {
          const userInfo = res.data.content
          console.log('TCL: checkBinding -> userInfo', userInfo)

          // save user info
          if (userInfo) {
            this.$store.dispatch(
              authModulePath + loadUserInfoSuccessAction,
              userInfo
            )
          } else {
            this.$store.dispatch(authModulePath + loadUserInfoFailAction)
          }

          if (
            userInfo &&
            userInfo.roleVoList &&
            userInfo.roleVoList.length > 0
          ) {
            // show tabs if binded
            storeService.store.set(authModulePath + showTabs, true)

            const that: any = this

            // go to workbench page, setTimeout for waiting roleRoute to be ready
            setTimeout(() => {
              if (that.roleRoute) {
                this.$router.push(
                  { path: `/workbench/${that.roleRoute}` },
                  () => {
                    this.hideAppLoading()
                  }
                )
              } else {
                this.$router.push({ name: 'home' })
                this.hideAppLoading()
              }
            }, 10)
          } else {
            // if not binded
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
</style>
