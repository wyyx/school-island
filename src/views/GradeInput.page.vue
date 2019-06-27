<template>
  <div class="content-wrapper">
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
          <!-- add grade subject dialog -->
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
                        v-model="currentSubject"
                        :items="avaliableSubjectList"
                        item-text="name"
                        :hide-details="true"
                        :return-object="true"
                        solo
                      ></v-select>
                    </v-flex>
                    <v-flex class="pr-1">
                      <v-select
                        v-model="currentExam"
                        :items="examList"
                        item-text="name"
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
                  <v-btn color="primary darken-1" @click="addGradeSuject">
                    确定
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-data-table
        :disable-initial-sort="true"
        :headers="headers"
        :items="gradeSubjectList"
        class="elevation-0 grade-subject-table"
        hide-actions
        :search="search"
        no-data-text="暂无数据..."
        no-results-text="没有匹配的数据..."
      >
        <template v-slot:items="props">
          <td @click="goToGradeInputEditPage(props.item)">
            {{ props.item.grade }}
          </td>
          <td @click="goToGradeInputEditPage(props.item)">
            {{ props.item.subject }}
          </td>
          <td @click="goToGradeInputEditPage(props.item)">
            {{ props.item.type | gradeTypeFilter }}
          </td>
          <td class="text-xs-right" @click="goToGradeInputEditPage(props.item)">
            <div class="both-center">
              <span
                :class="{
                  'success--text': props.item.state === 1,
                  'red--text': props.item.state === 0
                }"
              >
                {{ props.item.state | gradeStateFilter }}
              </span>
              <span class="pl-4"> <v-icon>keyboard_arrow_right</v-icon> </span>
            </div>
          </td>
        </template>
      </v-data-table>
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
import Header from '../components/Header.component.vue'
import { ClassModel } from '../models/class.model'
import { get } from 'vuex-pathify'
import {
  classesModulePath,
  classList,
  currentGradeSubject
} from '../store/classes/classes.paths'
import { gradeService } from '../services/grade.service'
import { authModulePath, user } from '../store/auth/auth.paths'
import {
  EXAM_TYPES,
  Subject,
  GradeSubject,
  GRADE_STATE,
  GradeStateTypes
} from '../models/grade-input.model'
import { getYearSpan } from '../utils/date.util'
import { snackbarMixin } from '../mixins/snackbar.mixin'

const EXAM_LIST = [
  {
    code: 2,
    name: '上学期'
  },
  {
    code: 4,
    name: '下学期'
  }
]

const YEAR_LIST = getYearSpan(2019, 2, 1)
const CURRENT_YEAR = new Date().getFullYear()

export default Vue.extend({
  mixins: [snackbarMixin],
  data: function() {
    return {
      showSnackbar: false,
      currentClass: {} as ClassModel,
      headers: [
        {
          text: '年级',
          align: 'left',
          value: 'grade',
          width: '20%'
        },
        {
          text: '科目',
          align: 'left',
          sortable: true,
          value: 'subject',
          width: '20%'
        },
        {
          text: '名称',
          align: 'left',
          sortable: true,
          value: 'type',
          width: '20%'
        },
        {
          text: '状态',
          align: 'left',
          sortable: true,
          value: 'state',
          width: '40%'
        }
      ],
      search: '',
      gradeSubjectList: [] as GradeSubject[],
      examTypes: EXAM_TYPES,
      dialog: false,
      avaliableSubjectList: [] as Subject[],
      currentSubject: {} as Subject,
      examList: EXAM_LIST,
      currentExam: EXAM_LIST[1],
      yearList: YEAR_LIST
    }
  },
  watch: {
    currentClass(newVal, oldVal) {
      this.loadGradeSubjectList()
      this.loadAvaliableSubjectList()
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
    const that: any = this
    that.classList
    console.log('TCL: created -> that.classList', that.classList)
    this.setInitClass()
    this.loadGradeSubjectList()
    this.loadAvaliableSubjectList()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goToGradeInputEditPage(gradeSubject: GradeSubject) {
      const store: any = this.$store
      store.set(classesModulePath + currentGradeSubject, gradeSubject)

      this.$router.push({
        name: 'grade-input-edit'
      })
    },
    addGradeSuject() {
      const that: any = this

      this.dialog = false

      gradeService
        .addGradeSubject({
          classId: this.currentClass.classId,
          grade: this.currentClass.grade,
          subject: this.currentSubject.name,
          type: this.currentExam.code
        })
        .then(res => {
          console.log('TCL: addGradeSuject -> res', res)

          if (!res.data.content) {
            that.showFailMessage(res.data.errorMsg)
          } else {
            that.showSuccessMessage('添加成功!')
            const newGradeSubject: GradeSubject = {
              grade: this.currentClass.grade,
              id: res.data.content,
              state: GradeStateTypes.unfinished,
              subject: this.currentSubject.name,
              type: this.currentExam.code
            }
            console.log(
              'TCL: addGradeSuject -> newGradeSubject',
              newGradeSubject
            )

            this.gradeSubjectList.unshift(newGradeSubject)
            console.log(
              'TCL: addGradeSuject -> this.gradeSubjectList',
              this.gradeSubjectList
            )
          }
        })
    },
    setInitClass() {
      const that: any = this
      this.currentClass = that.classList[0]
    },
    loadGradeSubjectList() {
      const that: any = this

      gradeService
        .getGradeInputGradeSubjectList({
          classId: this.currentClass.classId,
          pageNo: 1,
          pageSize: 1000,
          teacherId: that.user.teacherId
        })
        .then(res => {
          console.log('TCL: loadGradeSubjectList -> res', res)

          this.gradeSubjectList = res.data.content || []
        })
    },
    loadAvaliableSubjectList() {
      const that: any = this
      gradeService
        .getAvaliableSubjectList({
          classId: this.currentClass.classId,
          teacherId: that.user.teacherId
        })
        .then(res => {
          console.log('TCL: loadAvaliableSubjectList -> res', res)
          this.avaliableSubjectList = res.data.content || []
          this.currentSubject = this.avaliableSubjectList[0]
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin-bottom: 76px;
}

.grade-subject-table {
  table-layout: fixed;
}

.box {
  background: #2db34a;
  transition-property: background;
  transition-duration: 0.3s;
  transition-timing-function: linear;
}
</style>
