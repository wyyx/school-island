<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <AppTabs v-if="showTabs" :role="role" class="tabs"></AppTabs>
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
import { BindingStatus } from './models/user.model'

export default Vue.extend({
  name: 'App',
  components: {
    AppTabs
  },
  data() {
    return {
      role: 'teacher',
      showTabs: userService.userInfo.binding === 0
    }
  },
  created() {
    this.showTabs = true
    this.resolveInitUrl()
    this.checkBinding()
  },
  methods: {
    resolveInitUrl() {
      // parse current url
      const currentUrl = window.location.href
      const url = new Url(currentUrl, true)
      console.log('TCL: resolveInitUrl -> url', url)

      // get query params
      const roleCode = url.query['r']
      const s = url.query['s']
      const xyd = url.query['xyd']

      // set global headers
      httpConfigService.setHeaders({
        xyd,
        s,
        r: roleCode
      })

      // get current role
      switch (parseInt(roleCode || '')) {
        case 1:
          this.role = 'teacher'
          break
        case 2:
          this.role = 'school-run'
          break
        default:
          break
      }

      this.getSchoolInfo(parseInt(s || ''))
    },
    checkBinding() {
      userService.getUserInfo().then(res => {
        console.log('TCL: checkBinding -> res', res)
        if (res.data.content.binding === BindingStatus.NotBinding) {
          this.$router.push({
            name: 'binding'
          })
        } else {
          this.$router.push({
            name: 'home'
          })
        }
      })
    },
    getUserInfo() {
      userService.getUserInfo()
    },
    getSchoolInfo(schoolId: number) {
      userService.getSchoolInfo(schoolId)
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
