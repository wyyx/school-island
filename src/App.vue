<template>
  <v-app>
    <!-- <v-toolbar app height="48">
      <v-toolbar-title class="title text-uppercase">
        <span>成都市xxx学校</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar> -->
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

export default {
  name: 'App',
  components: {
    AppTabs
  },
  data() {
    return {
      role: ''
    }
  },
  created() {
    const currentUrl = window.location.href
    console.log('TCL: created -> currentUrl', currentUrl)
    const url = new Url(currentUrl, true)
    console.log('TCL: created -> url', url)

    const roleCode = url.query['r']
    const s = url.query['s']
    const xyd = url.query['xyd']

    dutyService.setHeaders({
      xyd,
      s
    })

    console.log('TCL: created -> dutyService', dutyService)

    switch (parseInt(roleCode)) {
      case 1:
        this.role = 'teacher'
        console.log('TCL: created -> this.role', this.role)
        break
      case 2:
        this.role = 'school-run'
        break
      default:
        break
    }

    this.$router.push(`/workbench/${this.role}`)
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
