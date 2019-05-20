<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="title text-uppercase">
        <span>成都市xxx学校</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
      <AppTabs class="tabs"></AppTabs>
    </v-content>
  </v-app>
</template>

<script>
import AppTabs from './components/Tabs'

export default {
  name: 'App',
  components: {
    AppTabs
  },
  data() {
    return {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
</style>
