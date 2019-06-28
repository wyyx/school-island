<template>
  <div>
    <v-bottom-nav
      app
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="white"
    >
      <v-btn color="primary" flat value="home" @click="_showDialog">
        <span class="in-developing">首页</span>
        <v-icon class="in-developing">home</v-icon>
      </v-btn>

      <!-- teacher tab -->
      <v-btn
        v-if="role === teacher && !isTourist"
        color="primary"
        flat
        value="workbench"
        :to="`/workbench/${role}`"
      >
        <span>老师助手</span>
        <v-icon>assignment_turned_in</v-icon>
      </v-btn>

      <!-- school-run tab -->
      <v-btn
        v-if="role === schoolRun && !isTourist"
        color="primary"
        flat
        value="workbench"
        :to="`/workbench/${role}`"
      >
        <span>校办助手</span>
        <v-icon>assessment</v-icon>
      </v-btn>

      <!-- parents tab -->
      <v-btn
        v-if="role === parents && !isTourist"
        color="primary"
        flat
        value="workbench"
        :to="`/workbench/${role}`"
      >
        <span>{{ currentStudent.name }}</span>
        <v-icon>face</v-icon>
      </v-btn>

      <v-btn color="primary" flat value="explore" @click="_showDialog">
        <span class="in-developing">发现</span>
        <v-icon class="in-developing">search</v-icon>
      </v-btn>
      <v-btn color="primary" flat value="my" :to="myRoute">
        <span>{{ isTourist ? '游客' : '账号' }}</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-nav>

    <div class="text-xs-center">
      <v-dialog v-model="showDialog" width="500">
        <v-card>
          <!-- <v-card-title class="subheading">
            提示
          </v-card-title> -->
          <v-divider></v-divider>

          <v-card-text>
            <v-icon>info</v-icon> 此页面正在开发中，敬请期待...
          </v-card-text>

          <v-divider></v-divider>

          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="showDialog = false">
              确定
            </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import {
  authModulePath,
  user,
  isTourist,
  currentStudent
} from '../store/auth/auth.paths'
import { UserInfo, Role } from '../models/user.model'

export default Vue.extend({
  name: 'AppTabs',
  props: {
    role: {
      type: String
    }
  },
  components: {},
  data: function() {
    return {
      showDialog: false,
      bottomNav: 'workbench',
      teacher: Role.Teacher,
      schoolRun: Role.SchoolRun,
      parents: Role.Parents
    }
  },
  computed: {
    ...get(authModulePath, {
      user,
      isTourist,
      currentStudent
    }),
    myRoute() {
      const that: any = this
      return that.isTourist ? '/account/tourist' : '/account/my'
    }
  },
  methods: {
    _showDialog() {
      this.showDialog = true
      setTimeout(() => {
        this.showDialog = false
      }, 2000)
    }
  }
})
</script>

<style lang="scss" scoped>
.v-card-title {
  padding-top: 0px;
}

.in-developing {
  color: #757575 !important;
}
</style>
