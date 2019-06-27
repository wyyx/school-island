<template>
  <div class="content-wrapper">
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
              <span>成绩录入</span>
            </v-flex>
          </v-layout>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
    <v-card class="primary lighten-3 pa-3 grade-title">
      <h3 class="title text-xs-center">
        一年级3班，语文，上学期成绩考评
      </h3>
    </v-card>
    <v-card class=" lighten-3 pa-3">
      <div class="content">
        <!-- left -->
        <div
          class="left student-list-wrapper"
          :style="{
            height: studentListWrapperHeight - 150 + 'px',
            'overflow-y': 'scroll'
          }"
        >
          <v-list>
            <div v-for="student in studentList" :key="student.studentId">
              <v-list-tile class="pa-0" @click="setCurrentStudent(student)">
                <v-list-tile-content>
                  <v-list-tile-title
                    :class="{
                      'primary--text':
                        currentStudent.studentNumber === student.studentNumber
                    }"
                  >
                    {{ student.studentName }}
                    <v-icon
                      v-if="currentStudent.comment"
                      small
                      :color="
                        currentStudent.studentNumber === student.studentNumber
                          ? 'primary'
                          : 'grey'
                      "
                    >
                      mode_comment
                    </v-icon>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </div>
          </v-list>
        </div>
        <!-- right -->
        <div class="right pa-2">
          <v-layout row wrap class="pb-3 text-xs-center">
            <v-flex class="title primary--text">
              {{ currentStudent.studentName }}
            </v-flex>
            <v-flex class="title primary--text">
              {{ currentStudent.studentNumber }}
            </v-flex>
          </v-layout>
          <!-- grade select -->
          <div class="py-3">
            <v-select
              v-model="currentGradeLevel"
              :items="gradeLevels"
              item-text="name"
              :return-object="true"
              solo
              placeholder="请选择"
              v-validate="'required'"
              name="gradeLevel"
              data-vv-as="成绩"
              :error-messages="errors.collect('gradeLevel') || []"
            ></v-select>
          </div>
          <!-- rating -->
          <div v-if="showRating" class="py-2">
            <v-layout row nowrap>
              <v-flex>
                <v-rating
                  color="accent"
                  background-color="grey darken-1"
                  v-model="rating"
                  :length="3"
                  medium
                ></v-rating>
              </v-flex>
              <v-flex>
                <v-btn color="white" @click="rating = 0">清空</v-btn>
              </v-flex>
            </v-layout>
          </div>
          <!-- comment -->
          <div class="">
            <v-textarea
              box
              name="input-7-4"
              label="评语"
              clearable
              :height="300"
            ></v-textarea>
          </div>
          <!-- submit btn -->
          <v-layout row wrap>
            <v-flex class="text-xs-right">
              <v-btn color="primary" @click="submit">保存</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </v-card>
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
  GradeLevelModel
} from '../models/grade.model'

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
      examTypes: EXAM_TYPES,
      studentListContent: {} as StudentListContent,
      studentList: [] as Student[],
      currentGradeLevel: null as GradeLevelModel,
      gradeLevels: GRADE_LEVELS_ARR.reverse(),
      currentStudent: {} as Student,
      rating: 0
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
      console.log('TCL: setCurrentStudent -> student', student)
      this.currentStudent = student
    },
    submit() {
      this.$validator.validate().then(valid => {
        console.log('TCL: submit -> valid', valid)
      })
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
  flex: 0 1 auto !important;
  box-shadow: rgba(0, 0, 0, 0.8) 3px 3px 10px inset !important;
}

.right {
  flex: 1 1 auto !important;
}
</style>
