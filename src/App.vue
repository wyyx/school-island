<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <AppTabs :role="role" class="tabs"></AppTabs>
    </v-content>
  </v-app>
</template>

<script>
import AppTabs from './components/Tabs.compoent.vue'
import Url from 'url-parse'
import { dutyService } from './services/duty.service'
import { httpConfigService } from './services/http-config.service'

export default {
  name: 'App',
  components: {
    AppTabs
  },
  data() {
    return {
      role: 'teacher'
    }
  },
  created() {
    this.resolveCurrentUser()
  },
  methods: {
    resolveCurrentUser() {
      // parse current url
      const currentUrl = window.location.href
      const url = new Url(currentUrl, true)

      // get query params
      const roleCode = url.query['r']
      const s = url.query['s']
      const xyd = url.query['xyd']

      // set global headers
      httpConfigService.setHeaders({
        xyd: 'aa',
        s: 'bbb'
      })

      // get current role
      switch (parseInt(roleCode)) {
        case 1:
          this.role = 'teacher'
          break
        case 2:
          this.role = 'school-run'
          break
        default:
          break
      }

      // //  switch route
      // if (this.role) {
      //   console.log('TCL: created -> this.role', this.role)
      //   this.$router.push(`/workbench/${this.role}`)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 999;
}
</style>
