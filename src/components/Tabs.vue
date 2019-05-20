<template>
  <v-tabs
    class="tabs"
    centered
    color="cyan"
    dark
    icons-and-text
    :hide-slider="true"
  >
    <v-tab to="/">
      首页
      <v-icon>home</v-icon>
    </v-tab>

    <v-tab to="/workbench">
      工作台
      <v-icon>laptop</v-icon>
    </v-tab>

    <v-tab to="/explore">
      发现
      <v-icon>search</v-icon>
    </v-tab>

    <v-tab to="/my">
      我的
      <v-icon>account_circle</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppTabs'
})
</script>

<style lang="scss" scoped></style>
