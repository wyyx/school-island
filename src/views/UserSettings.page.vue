<template>
  <div class="app-relative app-fill-height app-scroll-y">
    <Header title="用户设置" @back="goBack"></Header>
    <v-list>
      <!-- nickname -->
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            <v-layout row wrap>
              <v-flex xs4 class="grey--text">
                昵称
              </v-flex>
              <v-flex>
                {{ user.nickname }}
              </v-flex>
            </v-layout>
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>keyboard_arrow_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
      <!-- school name -->
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            <v-layout row wrap>
              <v-flex xs4 class="grey--text">
                学校
              </v-flex>
              <v-flex>
                {{ school.name }}
              </v-flex>
            </v-layout>
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>keyboard_arrow_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import { get } from 'vuex-pathify'
import { authModulePath, user, school } from '../store/auth/auth.paths'

export default Vue.extend({
  name: 'explore',
  components: {
    Header
  },
  computed: {
    ...get(authModulePath, {
      user,
      school
    })
  },
  created() {
    this.changeTitle()
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'my'
      })
    },
    changeTitle() {
      document.title = '个人中心'
    }
  }
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
