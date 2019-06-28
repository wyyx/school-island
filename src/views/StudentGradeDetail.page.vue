<template>
  <div class="wrapper">
    <Header :title="title" @back="goBack"></Header>
    <v-card class="mb-3">
      <Chart
        v-if="chartOption"
        width="100%"
        height="300px"
        :option="chartOption"
      ></Chart>
    </v-card>
    <v-card class="pa-3">
      <h3 class="mb-3">老师评语</h3>
      <div
        class="comment"
        v-for="achievement in achievementList"
        :key="achievement.subject"
      >
        <div v-if="achievement.comment">
          <h4 class="mb-2 primary--text">{{ achievement.teacherName }}老师</h4>
          <p>
            {{ achievement.comment }}
          </p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from '@/components/Chart.component.vue'
import { EChartOption } from 'echarts'
import {
  GradeLevel,
  StudentInfoForDetail,
  StudentGradeDetail,
  GRADE_LEVELS_FOR_CHART
} from '../models/grade.model'
import { get } from 'vuex-pathify'
import {
  classesModulePath,
  currentStudentForTeacher
} from '../store/classes/classes.paths'
import { gradeService } from '../services/grade.service'
import Header from '@/components/Header.component.vue'

export default Vue.extend({
  name: 'StudentGradeDetail',
  components: { Chart, Header },
  props: {},
  data() {
    return {
      chartOption: null as EChartOption,
      studentGradeDetail: {} as StudentGradeDetail
    }
  },
  computed: {
    ...get(classesModulePath, {
      currentStudentForTeacher
    }),
    title() {
      const that: any = this
      const student = that.currentStudentForTeacher as StudentInfoForDetail
      return student.name + student.grade + student.semister
    },
    achievementList() {
      const that: any = this
      const studentGradeDetail = that.studentGradeDetail as StudentGradeDetail
      return (studentGradeDetail && studentGradeDetail.achievementVos) || []
    }
  },
  methods: {
    goBack() {
      const that: any = this
      const student = that.currentStudentForTeacher as StudentInfoForDetail

      this.$router.push({
        name: 'class-data',
        params: {
          classId: student.classId.toString()
        }
      })
    },
    loadStudentGrade() {
      const that: any = this
      const student = that.currentStudentForTeacher as StudentInfoForDetail

      gradeService
        .getStudentGradeDetail({
          grade: student.grade,
          studentId: student.studentId,
          type: student.type
        })
        .then(res => {
          console.log('TCL: loadStudentGrade -> res', res)
          this.studentGradeDetail =
            res.data.content || ({} as StudentGradeDetail)
          this.studentGradeDetail = {
            ...this.studentGradeDetail,
            achievementVos: this.studentGradeDetail.achievementVos
          }

          this.updateChart()
        })
    },
    updateChart() {
      const that: any = this
      const subjectList = this.studentGradeDetail.achievementVos || []
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

                  const studentGradeDetail = that.studentGradeDetail as StudentGradeDetail

                  const star = studentGradeDetail.achievementVos[dataIndex].star

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
  },
  created() {
    const that: any = this
    console.log('this.currentStudentForTeacher', that.currentStudentForTeacher)
    this.loadStudentGrade()
  },
  mounted() {}
})
</script>

<style scoped lang="scss">

._img {
  width: 20px;
  height: 20px;
}

.box {
  padding: 15px 15px 7px 15px;
  border-bottom: 1px solid #cccccc;
}

.Grade_entry {
  display: flex;
}

.Grade_entry_text {
  font-size: 18px;
  margin-left: 20px;
}
</style>
