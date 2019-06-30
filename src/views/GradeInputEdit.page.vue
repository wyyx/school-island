<template>
  <div class="content-wrapper">
    <Header title="成绩录入" @back="goBack"></Header>
    <div class="main-content-wrapper">
      <div class="primary lighten-3 pa-3 grade-title">
        <h3 class="title text-xs-center">
          {{ title }}
        </h3>
      </div>
      <v-card class="content">
        <!-- left -->
        <div class="left-content student-list-wrapper pa-2 ">
          <div app-h-center>
            <v-switch
              class="batch-switch app-shrink py-1"
              color="primary"
              v-model="batchMode"
              label="批量"
              :hide-details="true"
            ></v-switch>
          </div>
          <v-list :expand="true">
            <v-list-tile v-if="batchMode" @click="toggleSelectAll">
              <div class="app-flex">
                <v-checkbox
                  class="grade-input-edit-batch-selection"
                  :input-value="isSelectedAll()"
                  label="全选"
                  color="primary"
                ></v-checkbox>
              </div>
            </v-list-tile>
            <v-divider></v-divider>
            <div v-for="student in studentList" :key="student.studentId">
              <v-list-tile
                class="pa-0"
                :class="{
                  'cyan lighten-5':
                    currentStudent.studentNumber === student.studentNumber
                }"
                @click="
                  setCurrentStudent(student), toggleSelectStudent(student)
                "
                color="primary"
              >
                <div class="app-flex">
                  <div v-if="batchMode">
                    <v-checkbox
                      class="grade-input-edit-batch-selection"
                      :input-value="isSelected(student)"
                      value
                      color="primary"
                    ></v-checkbox>
                  </div>
                  <div
                    class="app-v-center"
                    :class="{
                      'primary--text':
                        currentStudent.studentNumber === student.studentNumber
                    }"
                  >
                    <span
                      class="body-2"
                      :class="{
                        'success--text': student.achievement > 0
                      }"
                    >
                      {{ student.studentName }}
                    </span>
                    <span class="app-pl-5">
                      <v-icon :size="16" v-if="student.comment" color="success"
                        >comment
                      </v-icon>
                    </span>
                  </div>
                </div>
              </v-list-tile>
              <v-divider></v-divider>
            </div>
          </v-list>
        </div>
        <!-- right -->
        <div class="right-content pa-3">
          <h3
            class="title primary--text text-xs-center py-3"
            v-if="selectedStudentList.length > 0"
          >
            已选择{{ selectedStudentList.length }}人
          </h3>
          <div v-if="batchMode" class="app-flex app-wrap">
            <div
              class="name-wrapper pa-1"
              v-for="student in selectedStudentList"
              :key="student.studentNumber"
            >
              <div
                class="first-letter subheading  lighten-3 app-both-center elevation-1"
              >
                {{ student.studentName[0] }}
              </div>
            </div>
          </div>
          <v-layout v-else row wrap class="py-3 text-xs-center">
            <v-flex class="title primary--text">
              {{ currentStudent.studentName }}
            </v-flex>
            <v-flex class="title primary--text">
              {{ currentStudent.studentNumber }}
            </v-flex>
          </v-layout>
          <!-- grade select -->
          <div class="pt-3 app-fill-width">
            <h3 class="input-title subheading grey--text text--darken-1 pb-2">
              成绩
            </h3>
            <v-select
              class="app-fill-width grade-level-select"
              v-model="currentGradeLevel"
              :items="gradeLevels"
              item-text="name"
              :return-object="true"
              solo
              placeholder="请选择成绩"
              v-validate="'required'"
              name="gradeLevel"
              data-vv-as="成绩"
              :error-messages="validated ? errors.collect('gradeLevel') : []"
            ></v-select>
          </div>
          <!-- rating -->
          <div v-if="showRating" class="pt-1">
            <v-layout row nowrap>
              <v-flex>
                <h3 class="input-title subheading grey--text text--darken-1">
                  星级
                </h3>
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
          <div class="pt-4">
            <h3 class="input-title subheading grey--text text--darken-1 pb-2">
              评语
            </h3>
            <v-textarea
              class="comment-input"
              v-model="comment"
              name="input-7-4"
              auto-grow
              :rows="4"
              outline
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
        </div>
      </v-card>
    </div>
    <v-snackbar v-model="showSnackbar" :color="color" :timeout="2000">
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
  StudentListContent,
  Student,
  GradeSubject,
  AddStudentGradeResponse
} from '../models/grade-input.model'
import {
  GRADE_LEVELS,
  GRADE_LEVELS_ARR,
  GradeLevelModel,
  GRADE_LEVEL_LENGTH
} from '../models/grade.model'
import { snackbarMixin } from '../mixins/snackbar.mixin'
import { AxiosPromise } from 'axios'

export default Vue.extend({
  components: {
    Header
  },
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
      showSnackbar: false,
      batchMode: false,
      selectedStudentList: [] as Student[]
    }
  },
  watch: {
    currentClass(newVal, oldVal) {},
    batchMode() {
      const that: any = this
      that.selectedStudentList = []
    }
  },
  computed: {
    ...get(authModulePath, {
      user
    }),
    ...get(classesModulePath, {
      classList,
      currentGradeSubject
    }),
    studentNameFirstLetterList() {
      const that: any = this
      const selectedStudentList = that.selectedStudentList as Student[]
      return selectedStudentList.map(name => name.studentName[0])
    },
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
    toggleSelectStudent(student: Student) {
      if (!this.batchMode) {
        return
      }

      const index = this.selectedStudentList.findIndex(
        s => s.studentId === student.studentId
      )

      if (index > -1) {
        this.selectedStudentList.splice(index, 1)
      } else {
        this.selectedStudentList.push(student)
      }
    },
    isSelected(student: Student) {
      const index = this.selectedStudentList.findIndex(
        s => s.studentId === student.studentId
      )
      if (index > -1) {
        return true
      } else {
        false
      }
    },
    isSelectedAll() {
      if (this.selectedStudentList.length === this.studentList.length) {
        return true
      } else {
        return false
      }
    },
    toggleSelectAll() {
      if (this.selectedStudentList.length === this.studentList.length) {
        this.selectedStudentList = []
      } else {
        this.selectedStudentList = this.studentList.slice()
      }
    },
    setInitClass() {
      const that: any = this
      this.currentClass = that.classList[0]
    },
    loadStudentList() {
      const that: any = this
      const currentGradeSubject: GradeSubject = that.currentGradeSubject

      gradeService.getStudentList(currentGradeSubject.id).then(res => {
        this.studentListContent = res.data.content || ({} as StudentListContent)
        this.studentList =
          this.studentListContent.studentExamAchievementVoList || []

        this.studentList = this.studentList.sort((a, b) => {
          return parseInt(a.studentNumber) - parseInt(b.studentNumber)
        })

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

          if (this.batchMode) {
            console.log('batchMode batchMode batchMode')
            const that: any = this
            const currentGradeSubject = that.currentGradeSubject as GradeSubject

            const paramsList = this.selectedStudentList.map(student => {
              return {
                achievement: this.currentGradeLevel.code,
                comment: this.comment,
                star: this.rating,
                studentId: student.studentId,
                studentName: student.studentName,
                studentNumber: student.studentNumber,
                examSubmitRecordId: currentGradeSubject.id
              }
            })

            const promiseList = [] as AxiosPromise<AddStudentGradeResponse>[]

            paramsList.forEach(params => {
              promiseList.push(gradeService.addStudentGrade(params))

              // gradeService
              //   .addStudentGrade(params)
              //   .then(res => {
              //     console.log('TCL: submit -> res', res)
              //     this.isPending = false

              //     if (res.data.content) {
              //       that.showSuccessMessage('保存成功！')
              //       this.updateStudent(
              //         this.selectedStudentList.filter(
              //           s => s.studentId === params.studentId
              //         )[0]
              //       )
              //     } else {
              //       const that: any = this

              //       const msg = res.data.errorMsg
              //       that.showFailMessage(msg ? msg : '保存失败！请稍后再试')
              //     }
              //   })
              //   .finally(() => {
              //     this.isPending = false
              //   })
              //   .catch(error => {
              //     this.isPending = false
              //     that.showFailMessage('保存失败！出现未知错误，请稍后再试')
              //   })

              // // clear current selections
              // setTimeout(() => {
              //   this.selectedStudentList = []
              // }, 100)
            })

            Promise.all(promiseList)
              .then(res => {
                console.log('TCL: submit -> res', res)

                this.isPending = false

                that.showSuccessMessage('保存成功！')

                // update students
                paramsList.forEach(params => {
                  this.updateStudent(
                    this.selectedStudentList.filter(
                      s => s.studentId === params.studentId
                    )[0]
                  )
                })

                // clear current selections
                setTimeout(() => {
                  this.selectedStudentList = []
                }, 50)
              })
              .finally(() => {
                this.isPending = false
              })
              .catch(error => {
                this.isPending = false
                that.showFailMessage('保存失败！出现未知错误，请稍后再试')
              })
          } else {
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
        }
      })
    },
    updateStudent(student: Student) {
      const index = this.studentList.findIndex(
        s => s.studentId === student.studentId
      )

      student = {
        ...student,
        comment: this.comment,
        achievement: this.currentGradeLevel.code,
        star: this.rating,
        studentId: student.studentId,
        studentName: student.studentName,
        studentNumber: student.studentNumber
      }

      this.studentList.splice(index, 1, student)
    }
  }
})
</script>

<style lang="scss" scoped>
.content-wrapper {
  height: 100%;
}

.main-content-wrapper {
  height: 100%;
}

.grade-title {
  top: 0px;
  width: 100%;
  position: absolute;
  z-index: 2;
}

.content {
  display: flex;
  height: 100%;
  padding-top: 52px;
}

.left-content {
  background: #f5f5f5 !important;
  flex: 1 0 auto;
  height: 100%;
  overflow-y: scroll;
}

.right-content {
  flex: 10 1 auto;
  height: 100%;
  overflow-y: scroll;
}

.v-list {
  background: #f5f5f5 !important;
}

.grade-level-select .v-text-field__details {
  margin-bottom: 0px !important;
}

.input-title {
  font-size: 1.2rem;
}

.comment-input {
  padding-top: 0px !important;
}

.batch-switch.v-input--switch {
  margin: 0px !important;
}

.first-letter {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
</style>
