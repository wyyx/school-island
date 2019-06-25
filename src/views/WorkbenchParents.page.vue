<template>
  <div class="container pa-0">
    <!-- header -->
    <v-card class="mb-2">
      <v-layout column wrap>
        <v-flex class="class-selector">
          <v-layout row wrap class="primary lighten-3 pa-2">
            <v-flex xs6>
              <div class="class-selection-box primary lighten-4 py-1 px-2">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn light flat v-on="on" class="subheading">
                      {{ currentStudent.name }}
                      <v-icon>swap_horiz</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(student, index) in studentList"
                      :key="index"
                      @click="switchStudent(student)"
                    >
                      <v-list-tile-title>{{ student.name }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex shrink class="pr-2">
              <v-layout :align-center="true" fill-height wrap="false">
                <v-flex class="">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        depressed
                        color="transparent"
                        fab
                        light
                        v-on="on"
                        class="subheading"
                      >
                        <v-icon>add_circle_outline</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-tile @click="inDeveloping">
                        <v-list-tile-title>
                          <v-icon>aspect_ratio</v-icon>
                          <span class="menu-text pl-2">扫一扫</span>
                        </v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile @click="inDeveloping">
                        <v-list-tile-title>
                          <v-icon>assignment</v-icon>
                          <span class="menu-text pl-2">任务中心</span>
                        </v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-title @click="inDeveloping">
                          <v-icon>vertical_split</v-icon>
                          <span class="menu-text pl-2">我的班级</span>
                        </v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile @click="goToMyArchivePage">
                        <v-list-tile-title>
                          <v-icon>folder_shared</v-icon>
                          <span class="menu-text pl-2">我的档案</span>
                        </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
    <v-snackbar v-model="showSnackbar" :color="color" :timeout="3000">
      {{ message }}
      <v-btn dark flat @click="showSnackbar = false">
        关闭
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import { authModulePath, user, currentStudent } from '../store/auth/auth.paths'
import Developing from '../components/Developing.component.vue'
import { developing } from '../store/global.paths'
import { Student, UserInfo } from '../models/user.model'
import { snackbarMixin } from '../mixins/snackbar.mixin'

export default Vue.extend({
  mixins: [snackbarMixin],
  data: function() {
    return {
      student: {} as Student
    }
  },
  computed: {
    ...get(authModulePath, {
      user,
      currentStudent
    }),
    ...get({ developing }),
    studentList() {
      const that: any = this
      return (that.user as UserInfo).studentVoList || []
    }
  },
  components: {},
  created() {
    const that: any = this
    // that.currentStudent
    console.log('TCL: created -> that.currentStudent', that.currentStudent)
  },
  methods: {
    onAutocompleteChanged() {
      console.log('this.student', this.student)
      this.switchStudent(this.student)
    },
    switchStudent(student: Student) {
      console.log('TCL: student', student)

      const store: any = this.$store
      store.set(authModulePath + currentStudent, student)
    },
    goToMyArchivePage() {
      this.$router.push({
        name: 'my-archieve-for-student'
      })
    },
    inDeveloping() {
      const that: any = this
      that.showMessage('此功能正在开发中，敬请期待...')
    }
  }
})
</script>

<style lang="scss" scoped>
.class-selection-box {
  border-radius: 2px;
}
</style>
