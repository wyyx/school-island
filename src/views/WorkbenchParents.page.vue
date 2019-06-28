<template>
  <div class="container pa-0">
    <!-- header -->
    <v-card class="mb-2">
      <v-layout column wrap>
        <v-flex class="class-selector">
          <v-layout row wrap class="primary lighten-3 pa-2">
            <v-flex xs6>
              <!-- <div class="class-selection-box primary lighten-4 py-1 px-2">
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
              </div> -->

              <div class="class-selection-box primary lighten-4 pa-2">
                <v-select
                  v-model="student"
                  :items="studentList"
                  item-text="name"
                  item-value="studentNumber"
                  :return-object="true"
                  :hide-details="true"
                ></v-select>
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

    <v-card class="grade-wrapper pa-3">
      <v-tabs v-model="active">
        <v-tab v-for="(item, index) in tabTexts" :key="index">{{
          item.title
        }}</v-tab>
        <v-tab-item>
          <v-card flat>
            <div>
              <div class="app-flex">
                <div class="grow v-center">
                  {{
                    studentGrade.currentGrade + examTypeName
                      ? studentGrade.currentGrade + examTypeName
                      : ''
                  }}成绩
                </div>
                <div
                  class="shrink both-center clickable"
                  @click="goToStudentGradeDetailForParentsPage"
                >
                  <span>详情</span>
                  <span class="group pa-2">
                    <v-icon>chevron_right</v-icon>
                  </span>
                </div>
              </div>
              <Chart
                v-if="chartOption"
                width="100%"
                height="300px"
                :option="chartOption"
              ></Chart>
            </div>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>

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
import { get } from 'vuex-pathify'
import { authModulePath, user, currentStudent } from '../store/auth/auth.paths'
import Developing from '../components/Developing.component.vue'
import { developing } from '../store/global.paths'
import { Student, UserInfo } from '../models/user.model'
import { snackbarMixin } from '../mixins/snackbar.mixin'
import { BriefStudentGradeForParents } from '../models/parents-grade.model'
import { EChartOption } from 'echarts'
import Chart from '@/components/Chart.component.vue'
import { studentService } from '../services/student.service'
import {
  GRADE_LEVELS_FOR_CHART,
  StudentGradeDetail
} from '../models/grade.model'
import { gradeService } from '../services/grade.service'
import { EXAM_TYPES } from '../models/grade-input.model'

export default Vue.extend({
  mixins: [snackbarMixin],
  data: function() {
    return {
      student: {} as Student,
      rating: 2,
      active: 0,
      tabTexts: [{ title: '成长数据' }],
      studentGrade: {} as BriefStudentGradeForParents,
      chartOption: null as EChartOption
    }
  },
  watch: {
    student(newVal, oldVal) {
      this.switchStudent(this.student)
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
    },
    examTypeName() {
      const that: any = this
      const studentGrade = that.studentGrade as BriefStudentGradeForParents
      const exam = EXAM_TYPES.filter(type => type.code === studentGrade.type)[0]

      return exam && exam.exam
    }
  },
  components: { Chart },
  created() {
    const that: any = this
    // that.currentStudent
    console.log('TCL: created -> that.currentStudent', that.currentStudent)
    this.student = that.currentStudent || ({} as Student)
    this.loadStudentGrade()
  },
  methods: {
    goToStudentGradeDetailForParentsPage() {
      this.$router.push({ name: 'student-grade-detail-for-parents' })
    },
    switchStudent(student: Student) {
      console.log('TCL: student', student)
      const store: any = this.$store
      store.set(authModulePath + currentStudent, student)
      this.loadStudentGrade()
    },
    goToMyArchivePage() {
      this.$router.push({
        name: 'my-archieve-for-student'
      })
    },
    inDeveloping() {
      const that: any = this
      that.showMessage('此功能正在开发中，敬请期待...')
    },
    loadStudentGrade() {
      const that: any = this
      gradeService
        .getBriefStudentGradeForParents(that.currentStudent.id)
        .then(res => {
          console.log('TCL: created -> res', res)

          this.studentGrade =
            res.data.content || ({} as BriefStudentGradeForParents)
          this.updateChart()
        })
    },
    updateChart() {
      const that: any = this
      const subjectList = this.studentGrade.achievementVos || []
      const xAxisData = subjectList.map(subject => subject.subject)
      // reverse grade level to code map
      const seriesData1 = subjectList.map(subject => 6 - subject.achievement)

      this.chartOption = {
        color: ['rgb(229, 145, 229)', '#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            show: true,
            type: 'category',
            data: subjectList.map(subject => subject.subject),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '成绩',
            type: 'bar',
            barWidth: '70%',
            label: {
              normal: {
                lineHeight: 18,
                show: true,
                position: 'top',
                formatter: ({
                  componentType,
                  seriesType,
                  seriesIndex,
                  seriesName,
                  name,
                  dataIndex,
                  data,
                  value,
                  color
                }) => {
                  // get level name

                  const studentGrade = that.studentGrade as StudentGradeDetail

                  const star = studentGrade.achievementVos[dataIndex].star

                  const startText = star === 0 ? '' : `\n${star}星`

                  return (
                    Object.keys(GRADE_LEVELS_FOR_CHART)
                      .map(key => GRADE_LEVELS_FOR_CHART[key])
                      .filter(
                        (e: { name: string; code: number }) => e.code === data
                      )[0].name + startText
                  )
                }
              }
            },
            data: seriesData1,
            itemStyle: {
              color: function(params) {
                let absentColor = '#909090'
                let prequalified = '#F86E6E'
                let qualified = '#E591E5'
                let normal = '#33CCFF'

                console.log('TCL: updateChart -> params.data', params.data)

                switch (params.data) {
                  case GRADE_LEVELS_FOR_CHART.absent.code:
                    return absentColor
                  case GRADE_LEVELS_FOR_CHART.prequalified.code:
                    return prequalified
                  case GRADE_LEVELS_FOR_CHART.qualified.code:
                    return qualified
                  default:
                    return normal
                }
              }
            }
          }
        ]
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.class-selection-box {
  border-radius: 2px;
}
</style>
