<template>
  <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="white">
    <v-btn color="primary" flat value="home" to="/">
      <span>首页</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn color="primary" flat value="workbench" :to="`/workbench/${role}`">
      <span>工作台</span>
      <v-icon>laptop_mac</v-icon>
    </v-btn>

    <v-btn color="primary" flat value="explore" to="/explore">
      <span>发现</span>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn color="primary" flat value="my" to="/my">
      <span>我的</span>
      <v-icon>account_circle</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    role: {
      type: String,
      default: 'teacher'
    }
  },
  data: function() {
    return {
      bottomNav: 'home'
    }
  },
  name: 'AppTabs'
})
</script>

<style lang="scss" scoped></style>
