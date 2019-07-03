<template>
  <div class="container pa-0">
    <v-card color="primary" class="mb-2">
      <v-layout class="teachers py-4" row wrap>
        <v-flex xs3>
          <v-layout row wrap app-fill-height justify-center align-center>
            <v-flex app-shrink>
              <v-avatar :tile="false" :size="64" color="grey lighten-4">
                <img :src="user.headImgUrl" alt="avatar" />
              </v-avatar>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="white--text" xs9>
          <v-layout column wrap>
            <v-flex class="title">
              <v-layout row wrap>
                <v-flex class="app-v-center app-shrink pr-2">
                  <!-- when teache -->
                  <span
                    v-if="
                      currentRole.code === roleType.Teacher ||
                        currentRole.code === roleType.HeadTeacher
                    "
                    class="pr-2"
                  >
                    {{ user.name }}{{ currentRole.name }}
                  </span>
                  <!-- when parents -->
                  <span
                    v-if="currentRole.code === roleType.Parents"
                    class="pr-2"
                  >
                    {{ currentStudent.name }}的{{
                      getRelationName(currentStudent)
                    }}
                  </span>
                  <!-- when schoolRun -->
                  <span
                    v-if="currentRole.code === roleType.SchoolRun"
                    class="pr-2"
                  >
                    {{ user.name }}{{ currentRole.name }}
                  </span>
                </v-flex>
                <v-flex class="app-shrink app-v-center">
                  <v-icon color="white">swap_horiz</v-icon>
                </v-flex>
                <v-flex class="app-shrink">
                  <!-- switch role -->
                  <v-menu offset-y v-if="roleList.length > 0">
                    <template v-slot:activator="{ on }">
                      <v-btn flat dark v-on="on" class="ma-0">
                        <span class="title">切换</span>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-tile
                        :class="{
                          'grey lighten-3': currentRole.code === role.code,
                          'accent--text': currentRole.code === role.code
                        }"
                        v-for="role in roleList || []"
                        :key="role.code"
                        @click="switchRole(role)"
                      >
                        <span class="pr-1">{{ role.name }} </span>
                        <v-icon
                          v-if="currentRole.code === role.code"
                          :color="
                            currentRole.code === role.code
                              ? 'accent'
                              : 'grey lighten-3'
                          "
                        >
                          check
                        </v-icon>
                      </v-list-tile>
                      <v-list-tile @click="goToBindingPage()">
                        <v-icon>add</v-icon> <span>添加</span>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout row wrap>
                <v-flex class="app-v-center">
                  <span class="pr-1">昵称：</span
                  ><span>{{ user.nickname }}</span>
                </v-flex>
                <v-flex
                  app-shrink
                  class="px-2 text-xs-right"
                  @click="goToUserSettingsPage"
                >
                  <v-btn flat icon color="white">
                    <v-icon>keyboard_arrow_right</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>

    <v-card class="pa-2">
      <v-btn color="accent" @click="goToStudentInfoCollectionPage">
        学生信息采集
      </v-btn>
      <v-btn color="accent" @click="goToTeacherInfoCollectionPage">
        老师信息采集
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import { get } from 'vuex-pathify'
import {
  authModulePath,
  user,
  roleList,
  currentRole,
  currentStudent
} from '../store/auth/auth.paths'
import { RoleVo, Student, RoleType, parentsTypes } from '../models/user.model'
import { storeService } from '../services/store.service'
import { archiveService } from '../services/archive.service'
import {
  UnfinishedInfoCollection,
  InfoCollectionUserTypes,
  AddStudentAndParentsInfoCollectionParams
} from '../models/archive.model'

export default Vue.extend({
  name: 'my',
  data: function() {
    return {
      roleType: RoleType,
      unfinishedInfoCollectionList: [] as UnfinishedInfoCollection[]
    }
  },
  components: {},
  computed: {
    ...get(authModulePath, {
      user,
      roleList,
      currentRole,
      currentStudent
    }),
    studentList() {
      const that: any = this
      return that.user.studentVoList || []
    },
    firstStudentInfo() {
      const that: any = this
      const unfinishedInfoCollectionList = that.unfinishedInfoCollectionList as UnfinishedInfoCollection[]

      const studentInfoCollection = unfinishedInfoCollectionList.filter(
        studentInfo => studentInfo.userType === InfoCollectionUserTypes.Student
      )[0]

      const firstStudentInfo: AddStudentAndParentsInfoCollectionParams =
        studentInfoCollection &&
        studentInfoCollection.entity &&
        studentInfoCollection.entity[0]

      return (
        firstStudentInfo || ({} as AddStudentAndParentsInfoCollectionParams)
      )
    },
    teacherInfo() {
      const that: any = this
      const unfinishedInfoCollectionList = that.unfinishedInfoCollectionList as UnfinishedInfoCollection[]

      const teacherInfoCollection = unfinishedInfoCollectionList.filter(
        info => info.userType === InfoCollectionUserTypes.Teacher
      )[0]

      const teacherInfo: AddStudentAndParentsInfoCollectionParams =
        teacherInfoCollection &&
        teacherInfoCollection.entity &&
        teacherInfoCollection.entity[0]

      return teacherInfo || ({} as AddStudentAndParentsInfoCollectionParams)
    }
  },
  created() {
    this.changeTitle()
    this.getUnfinishedInfoCollection()
  },
  methods: {
    changeTitle() {
      document.title = '账号'
    },
    goToUserSettingsPage() {
      this.$router.push({
        name: 'user-settings'
      })
    },
    goToStudentInfoCollectionPage() {
      this.$router.push({
        name: 'create-archive-for-student'
      })
    },
    goToTeacherInfoCollectionPage() {
      this.$router.push({
        name: 'create-archive-for-teacher'
      })
    },
    goToBindingPage() {
      this.$router.push({
        name: 'binding'
      })
    },
    switchRole(role: RoleVo) {
      storeService.store.set(authModulePath + currentRole, role)
    },
    getRelationName(student: Student) {
      const parentsType = parentsTypes.filter(
        p => p.value === student.parentType
      )[0]

      return parentsType ? parentsType.text : ''
    },
    getUnfinishedInfoCollection() {
      archiveService.getUnfinishedInfoCollection().then(res => {
        this.unfinishedInfoCollectionList = res.data.content || []
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.teachers {
  position: relative;
}
.scores {
  text-align: center;
}
.check-in-btn {
  position: absolute;
  right: 0px;
  bottom: 15px;
  margin: 0px;
  border-top-left-radius: 100px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 100px;
}

.v-btn {
  min-width: unset !important;
}
</style>
