<template>
  <div class="content-wrapper">
    <v-toolbar app height="48" class="px-0">
      <v-toolbar-title class="title text-uppercase">
        <v-layout row wrap>
          <v-flex>
            <div
              class="back-btn-wrapper pa-2 clickable"
              v-ripple
              @click="goBack"
            >
              <v-icon>arrow_back</v-icon>
            </div>
          </v-flex>
          <v-flex class="both-center subheading">
            <span>成绩录入</span>
          </v-flex>
        </v-layout>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div class="main-content-wrapper">
      <v-card class="primary lighten-3 pa-3 grade-title">
        <h3 class="title text-xs-center">
          {{ title }}
        </h3>
      </v-card>
      <v-card class=" lighten-3">
        <v-layout class="content">
          <!-- left -->
          <v-flex
            class="left student-list-wrapper pa-2"
            :style="{
              height: studentListWrapperHeight - 150 + 'px',
              'overflow-y': 'scroll'
            }"
          >
            <v-list :expand="true">
              <div v-for="student in studentList" :key="student.studentId">
                <v-list-tile
                  class="pa-0"
                  :class="{
                    'cyan lighten-5':
                      currentStudent.studentNumber === student.studentNumber
                  }"
                  @click="setCurrentStudent(student)"
                  color="primary"
                >
                  <v-list-tile-content color="primary ">
                    <v-list-tile-title
                      :class="{
                        'primary--text':
                          currentStudent.studentNumber === student.studentNumber
                      }"
                    >
                      <span
                        class="body-2"
                        :class="{ 'success--text': student.achievement > 0 }"
                      >
                        {{ student.studentName }}
                      </span>
                      <span class="app-pl-5">
                        <v-icon
                          :size="16"
                          v-if="student.achievement"
                          color="success"
                          >comment
                        </v-icon>
                      </span>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </div>
            </v-list>
          </v-flex>
          <!-- right -->
          <v-flex class="right pa-3">
            <v-layout row wrap class="py-3 text-xs-center">
              <v-flex class="title primary--text">
                {{ currentStudent.studentName }}
              </v-flex>
              <v-flex class="title primary--text">
                {{ currentStudent.studentNumber }}
              </v-flex>
            </v-layout>
            <!-- grade select -->
            <div class="pt-3 fill-width">
              <v-select
                class="fill-width grade-level-select"
                v-model="currentGradeLevel"
                :items="gradeLevels"
                item-text="name"
                :return-object="true"
                solo
                placeholder="请选择"
                v-validate="'required'"
                name="gradeLevel"
                data-vv-as="成绩"
                :error-messages="validated ? errors.collect('gradeLevel') : []"
              ></v-select>
            </div>
            <!-- rating -->
            <div v-if="showRating" class="py-2">
              <v-layout row nowrap>
                <v-flex>
                  <v-rating
                    x-large
                    clearable
                    color="accent"
                    background-color="grey darken-1"
                    v-model="rating"
                    :length="3"
                    medium
                  ></v-rating>
                </v-flex>
              </v-layout>
            </div>
            <!-- comment -->
            <div>
              <v-textarea
                class="comment-input"
                v-model="comment"
                name="input-7-4"
                label="评语"
                auto-grow
                :rows="4"
              ></v-textarea>
            </div>
            <!-- submit btn -->
            <v-layout row wrap>
              <v-flex class="text-xs-right">
                <v-btn
                  color="primary"
                  @click="submit"
                  :depressed="isPending ? true : false"
                >
                  <span v-if="isPending">
                    <v-progress-circular
                      :size="24"
                      :width="2"
                      indeterminate
                      color="white"
                    ></v-progress-circular
                  ></span>
                  <span v-else>保存</span>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
      <v-snackbar v-model="showSnackbar" :color="color" :timeout="2000">
        {{ message }}
        <v-btn dark flat @click="showSnackbar = false">
          关闭
        </v-btn>
      </v-snackbar>
    </div>
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
  StudentListContent,
  Student,
  GradeSubject
} from '../models/grade-input.model'
import {
  GRADE_LEVELS,
  GRADE_LEVELS_ARR,
  GradeLevelModel,
  GRADE_LEVEL_LENGTH
} from '../models/grade.model'
import { snackbarMixin } from '../mixins/snackbar.mixin'

export default Vue.extend({
  mixins: [snackbarMixin],
  data: function() {
    return {
      isPending: false,
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
      examTypes: EXAM_TYPES,
      studentListContent: {} as StudentListContent,
      studentList: [] as Student[],
      currentGradeLevel: null as GradeLevelModel,
      gradeLevels: GRADE_LEVELS_ARR,
      currentStudent: {} as Student,
      rating: 0,
      comment: '',
      validated: false,
      showSnackbar: false
    }
  },
  watch: {
    currentClass(newVal, oldVal) {}
  },
  computed: {
    ...get(authModulePath, {
      user
    }),
    ...get(classesModulePath, {
      classList,
      currentGradeSubject
    }),
    showRating() {
      const that: any = this
      const currentGradeLevel = that.currentGradeLevel as GradeLevelModel
      const gradeLevelCode = currentGradeLevel && currentGradeLevel.code

      return (
        gradeLevelCode === GRADE_LEVELS.good.code ||
        gradeLevelCode === GRADE_LEVELS.excellent.code
      )
    },
    studentListWrapperHeight() {
      console.log(
        'TCL: studentListWrapperHeight -> window.innerHeight',
        window.innerHeight
      )

      return window.innerHeight
    },
    title() {
      const that: any = this
      const currentGradeSubject = that.currentGradeSubject as GradeSubject
      return `${currentGradeSubject.grade}, ${currentGradeSubject.subject}, ${
        currentGradeSubject.type === 2
          ? '上学期期末成绩考评'
          : '下学期期末成绩考评'
      }`
    }
  },
  created() {
    this.setInitClass()
    const that: any = this

    that.currentGradeSubject
    console.log(
      'TCL: created ->  that.currentGradeSubject',
      that.currentGradeSubject
    )

    this.loadStudentList()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    setInitClass() {
      const that: any = this
      this.currentClass = that.classList[0]
      console.log('TCL: setInitClass -> that.classList', that.classList)
    },
    loadStudentList() {
      const that: any = this
      const currentGradeSubject: GradeSubject = that.currentGradeSubject

      gradeService.getStudentList(currentGradeSubject.id).then(res => {
        this.studentListContent = res.data.content || ({} as StudentListContent)
        this.studentList =
          this.studentListContent.studentExamAchievementVoList || []

        this.setCurrentStudent(this.studentList[0] || ({} as Student))
      })
    },
    setCurrentStudent(student: Student) {
      this.validated = false
      console.log('TCL: setCurrentStudent -> student', student)
      this.currentStudent = student
      this.fillForm()
    },
    fillForm() {
      this.currentGradeLevel = GRADE_LEVELS_ARR.filter(
        gradeLevel => gradeLevel.code === this.currentStudent.achievement
      )[0]
      this.comment = this.currentStudent.comment
      this.rating = this.currentStudent.star
    },
    submit() {
      const that: any = this
      const currentGradeSubject: GradeSubject = that.currentGradeSubject

      this.$validator.validate().then(valid => {
        this.validated = true
        console.log('TCL: submit -> valid', valid)

        if (valid && !this.isPending) {
          this.isPending = true

          gradeService
            .addStudentGrade({
              achievement: this.currentGradeLevel.code,
              comment: this.comment,
              star: this.rating,
              studentId: this.currentStudent.studentId,
              studentName: this.currentStudent.studentName,
              studentNumber: this.currentStudent.studentNumber,
              examSubmitRecordId: currentGradeSubject.id
            })
            .then(res => {
              console.log('TCL: submit -> res', res)
              this.isPending = false

              if (res.data.content) {
                that.showSuccessMessage('保存成功！')
                this.updateStudent(this.currentStudent)
              } else {
                const that: any = this

                const msg = res.data.errorMsg
                that.showFailMessage(msg ? msg : '保存失败！请稍后再试')
              }
            })
            .finally(() => {
              this.isPending = false
            })
            .catch(error => {
              this.isPending = false
              that.showFailMessage('保存失败！出现未知错误，请稍后再试')
            })
        }
      })
    },

    updateStudent(student: Student) {
      const index = this.studentList.findIndex(
        student => student.studentId === this.currentStudent.studentId
      )

      this.currentStudent = {
        ...this.currentStudent,
        comment: this.comment,
        achievement: this.currentGradeLevel.code,
        star: this.rating,
        studentId: this.currentStudent.studentId,
        studentName: this.currentStudent.studentName,
        studentNumber: this.currentStudent.studentNumber
      }

      console.log(
        'TCL: updateStudent -> this.currentStudent',
        this.currentStudent
      )

      this.studentList.splice(index, 1, this.currentStudent)
    }
  }
})
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin-bottom: 76px;
}

.content {
  display: flex;
}

.left {
  background: #f5f5f5 !important;
  flex: 0 0 auto;
}

.right {
  flex: 1 0 auto;
}

.v-list {
  background: #f5f5f5 !important;
}

.v-rating {
  font-size: 48px !important;
}
</style>
