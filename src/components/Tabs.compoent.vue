<template>
  <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="white">
    <v-btn color="teal" flat value="home" to="/">
      <span>首页</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn color="teal" flat value="workbench" to="/workbench">
      <span>数据中心</span>
      <v-icon>laptop</v-icon>
    </v-btn>

    <v-btn color="teal" flat value="explore" to="/explore">
      <span>发现</span>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn color="teal" flat value="my" to="/my">
      <span>我的</span>
      <v-icon>account_circle</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: function() {
    return {
      bottomNav: 'home'
    }
  },
  name: 'AppTabs'
})
</script>

<style lang="scss" scoped></style>
