<template>
  <div class="app-relative app-fill-height app-scroll-y">
    <Header title="成长档案" @back="goBack"></Header>
    <v-card class="pa-3 mb-2">
      <v-layout row wrap>
        <v-flex xs3 class="app-v-center">
          <v-avatar :size="64" :tile="true">
            <img v-if="avatarUrl" src="" alt="头像" />
            <v-icon :size="64" color="grey lighten-1">account_box</v-icon>
          </v-avatar>
        </v-flex>
        <v-flex xs9>
          <v-layout column wrap justify-center>
            <v-flex class="title py-2">
              {{ studentInfo.name }}
            </v-flex>
            <v-flex class="py-1">
              生日：<span class="Born">
                {{ studentInfo.birthday | dateFilter }}
              </span>
            </v-flex>
            <v-flex class="py-1">
              年级：<span>{{ studentInfo.className }}</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <div></div>
    </v-card>
    <v-card class="pa-3">
      <v-tabs v-model="active">
        <v-tab v-for="(item, index) in tabTexts" :key="index">{{
          item.title
        }}</v-tab>
        <v-tab-item>
          <v-card flat>
            <div>
              <div class="app-flex py-2">
                <div class="app-grow app-v-center ">
                  {{ studentGrade.currentGrade
                  }}{{ getExamType(studentGrade.type) }}成绩
                </div>
                <div
                  @click="goToStudentGradeDetailForParentsPage"
                  class="app-shrink text-xs-right clickable"
                >
                  <span>详情</span>
                  <span class="group pa-2 ">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { gradeService } from '../services/grade.service'
import { get } from 'vuex-pathify'
import { authModulePath, currentStudent } from '../store/auth/auth.paths'
import {
  GRADE_LEVELS_FOR_CHART,
  StudentGradeDetail
} from '../models/grade.model'
import { BriefStudentGradeForParents } from '../models/parents-grade.model'
import { EChartOption } from 'echarts'
import Chart from '@/components/Chart.component.vue'
import { studentService } from '@/services/student.service'
import { Student } from '../models/user.model'
import { StudentInfo } from '../models/student.model'
import Header from '../components/Header.component.vue'
import { EXAM_TYPES } from '../models/grade-input.model'

export default Vue.extend({
  name: 'MyArchiveForStudent',
  computed: {
    ...get(authModulePath, {
      currentStudent
    })
  },
  components: { Chart, Header },
  props: {},
  data() {
    return {
      rating: 2,
      active: 0,
      tabTexts: [{ title: '成长数据' }],
      studentGrade: {} as BriefStudentGradeForParents,
      chartOption: null as EChartOption,
      studentInfo: {} as StudentInfo,
      avatarUrl: '',
      examTypes: EXAM_TYPES
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'parents'
      })
    },
    goToStudentGradeDetailForParentsPage() {
      this.$router.push({ name: 'student-grade-detail-for-parents' })
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
    getExamType(code: number) {
      const exam = this.examTypes.filter(type => type.code === code)[0]
      return exam && exam.exam
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
    },
    loadStudentInfo() {
      const that: any = this
      const currentStudent = that.currentStudent as Student

      studentService.getStudentInfo(currentStudent.id).then(res => {
        console.log('TCL: loadStudentInfo -> res', res)
        this.studentInfo = res.data.content || ({} as StudentInfo)

        console.log(
          'TCL: loadStudentInfo -> this.studentInfo',
          this.studentInfo
        )
      })
    }
  },
  mounted() {},
  created() {
    this.loadStudentGrade()
    this.loadStudentInfo()
  }
})
</script>

<style scoped lang="scss">
._img {
  width: 20px;
  height: 20px;
}
.Grade_entry {
  display: flex;
}
.Grade_entry_text {
  font-size: 18px;
  margin-left: 20px;
}
.box {
  padding: 15px 15px 7px 15px;
  border-bottom: 1px solid #cccccc;
}
.file_box {
  padding: 10px 0;
  display: flex;
  border-bottom: 5px solid #f2f2f2;
  .file_ion {
    width: 23%;
    padding: 12px;
    > span {
      display: block;
      height: 80px;
      border: 1px solid seagreen;
    }
  }
  .file_class {
    width: 35%;
    span:nth-child(1) {
      font-size: 20px;
      font-weight: 900;
    }
    .Born {
      display: block;
      color: #cccccc;
      padding: 5px 0;
    }
  }
  .file_honor {
    width: 22%;
    > span {
      display: block;
      color: #cccccc;
      padding-left: 10px;
    }
  }
  .file_recommend {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    .recommend {
      padding-right: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      > span {
        display: block;
        padding: 2px 10px;
        background-color: #68cdff;
      }
    }
  }
}
.contribution_box {
  padding: 30px;
  display: flex;
  border-bottom: 5px solid #f2f2f2;
  .contribution_star {
    width: 20%;
  }
  .contribution_energy {
    width: 20%;
  }
  .contribution_raye {
    width: 60%;
  }
}

.My_grades_box {
  .MyGrades {
    display: flex;
    div:nth-child(1) {
      width: 30%;
    }
    div:nth-child(2) {
      width: 55%;
      color: #cccccc;
    }
    div:nth-child(3) {
      width: 25%;
    }
  }
}
</style>
