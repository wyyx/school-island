<template>
  <div class="content-wrapper">
    <v-btn color="white" @click="goToGradeInputEditPage"
      >go to grade-input-edit-page</v-btn
    >
    <v-card class="pa-3">
      <div class="header-wrapper">
        <v-toolbar app height="48" class="px-0">
          <v-toolbar-title class="title text-uppercase">
            <v-layout row wrap>
              <v-flex>
                <div class="back-btn-wrapper pa-2" v-ripple @click="goBack">
                  <v-icon>arrow_back</v-icon>
                </div>
              </v-flex>
              <v-flex class="pl-2 both-center">
                <span>成绩单</span>
              </v-flex>
            </v-layout>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </div>
      <v-layout row nowrap>
        <v-flex xs6>
          <!-- <div>{{ currentClass }}</div> -->
          <v-select
            v-model="currentClass"
            :items="classList"
            item-text="className"
            :hide-details="true"
            :return-object="true"
            solo
          ></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex>
          <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent>
              <template v-slot:activator="{ on }">
                <v-btn color="success" dark v-on="on">新建成绩</v-btn>
              </template>
              <v-card>
                <v-card-title class="title">新建成绩</v-card-title>
                <v-card-text>
                  <v-layout row nowrap>
                    <v-flex class="pr-1">
                      <v-select
                        v-model="currentClass"
                        :items="[]"
                        item-text="className"
                        :hide-details="true"
                        :return-object="true"
                        solo
                      ></v-select>
                    </v-flex>
                    <v-flex class="pr-1">
                      <v-select
                        v-model="currentClass"
                        :items="[]"
                        item-text="className"
                        :hide-details="true"
                        :return-object="true"
                        solo
                      ></v-select>
                    </v-flex>
                    <v-flex class="pr-1">
                      <v-select
                        v-model="currentClass"
                        :items="[]"
                        item-text="className"
                        :hide-details="true"
                        :return-object="true"
                        solo
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="darken-1" flat @click="dialog = false">
                    取消
                  </v-btn>
                  <v-btn color="primary darken-1" @click="dialog = false">
                    确定
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-card-title class="pa-1">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="搜索"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="studentList"
        class="elevation-0"
        hide-actions
        :search="search"
        no-data-text="暂无数据..."
        no-results-text="没有匹配的数据..."
      >
        <template v-slot:items="props">
          <td>
            {{ props.item.grade }}
          </td>
          <td>{{ props.item.subject }}</td>
          <td>{{ props.item.type | gradeTypeFilter }}</td>
          <td class="text-xs-right">
            <div>
              <v-icon :color="props.item.state === 1 ? 'primary' : 'grey'"
                >cloud_done</v-icon
              >
              {{ props.item.state | gradeStateFilter }}

              <v-btn fab small color="white"> <v-icon>edit</v-icon></v-btn>
            </div>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import { ClassModel } from '../models/class.model'
import { get } from 'vuex-pathify'
import { classesModulePath, classList } from '../store/classes/classes.paths'
import { gradeService } from '../services/grade.service'
import { authModulePath, user } from '../store/auth/auth.paths'
import { Student, EXAM_TYPES } from '../models/grade-input.model'

export default Vue.extend({
  data: function() {
    return {
      currentClass: {} as ClassModel,
      headers: [
        {
          text: '年级',
          align: 'left',
          value: 'grade'
        },
        { text: '科目', align: 'left', sortable: true, value: 'subject' },
        { text: '名称', align: 'left', sortable: true, value: 'type' },
        { text: '状态', align: 'left', sortable: true, value: 'state' }
      ],
      search: '',
      studentList: [] as Student[],
      examTypes: EXAM_TYPES,
      dialog: false
    }
  },
  watch: {
    currentClass(newVal, oldVal) {
      this.loadStudentList()
    }
  },
  computed: {
    ...get(authModulePath, {
      user
    }),
    ...get(classesModulePath, {
      classList
    })
  },
  created() {
    this.setInitClass()
    this.loadStudentList()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goToGradeInputEditPage() {
      console.log('xxxxxxxxxxxxxxxxxxxx')
      this.$router.push({
        name: 'grade-input-edit'
      })
    },
    setInitClass() {
      const that: any = this
      this.currentClass = that.classList[0]
      console.log('TCL: setInitClass -> that.classList', that.classList)
    },
    loadStudentList() {
      const that: any = this
      gradeService
        .getGradeInputStudentListResponse({
          classId: this.currentClass.classId,
          pageNo: 1,
          pageSize: 1000,
          teacherId: that.user.teacherId
        })
        .then(res => {
          console.log('TCL: res', res)

          this.studentList = res.data.content || []
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin-bottom: 76px;
}
</style>
