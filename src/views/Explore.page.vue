<template>
  <div class="app-fill-height">
    <Developing v-if="false"></Developing>
    <div v-if="false" class="container pa-0">
      <!-- <Header :showBack="false" title="发现"></Header> -->
      <v-list class="list">
        <v-list-tile class="elevation-1 mb-2 list-item">
          <v-list-tile-action>
            <v-icon color="primary">send</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>学友圈</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="elevation-1 mb-2 list-item">
          <v-list-tile-action>
            <v-icon color="primary">school</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>学长大学</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="elevation-1 mb-2 list-item">
          <v-list-tile-action>
            <v-icon color="primary">book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>阅读王</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="elevation-1 mb-2 list-item">
          <v-list-tile-action>
            <v-icon color="primary">location_on</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <span class="pr-2">校园岛</span>
                    <span>
                      <v-icon>arrow_drop_down</v-icon>
                    </span>
                  </div>
                </template>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>校园岛</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>培训机构</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>儿童医院</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>亲子游玩</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>

    <div class="text-xs-center">
      <v-dialog v-model="showDevelopingDialog" width="500" persistent>
        <v-card>
          <v-card-title class="subheading">
            <v-icon>info</v-icon>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            此页面正在开发中，敬请期待...
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="_onClose">
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import { get } from 'vuex-pathify'
import { developing } from '../store/global.paths'
import Developing from '../components/Developing.component.vue'
import { authModulePath, isTourist, roleRoute } from '@/store/auth/auth.paths'

export default Vue.extend({
  name: 'explore',
  data: function() {
    return {
      showDevelopingDialog: false
    }
  },
  computed: {
    ...get({
      developing
    }),
    ...get(authModulePath, { isTourist, roleRoute })
  },
  components: { Developing },
  created() {
    this.showDevelopingDialog = true
    this.changeTitle()
  },
  destroyed() {
    this.showDevelopingDialog = false
  },
  methods: {
    changeTitle() {
      document.title = '发现'
    },

    _onClose() {
      this.showDevelopingDialog = false

      const that: any = this
      const route = that.isTourist
        ? '/account/tourist'
        : `/workbench/${that.roleRoute}`

      this.$router.push({
        path: route
      })
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
