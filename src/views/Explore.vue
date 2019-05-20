<template>
  <v-list class="list">
    <v-list-tile class="elevation-1 mb-2 list-item">
      <v-list-tile-action>
        <v-icon color="teal">send</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>学友圈</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile class="elevation-1 mb-2 list-item">
      <v-list-tile-action>
        <v-icon color="teal">school</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>学长大学</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile class="elevation-1 mb-2 list-item">
      <v-list-tile-action>
        <v-icon color="teal">book</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>阅读王</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile class="elevation-1 mb-2 list-item">
      <v-list-tile-action>
        <v-icon color="teal">location_on</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>校园岛</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'explore',
  components: {}
})
</script>

<style lang="scss" scoped>
.list {
  background-color: transparent;
}

.list-item {
  background-color: white;
}
</style>
