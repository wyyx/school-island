<template>
  <div class="wrapper">
    <div class="box">
      <div class="Grade_entry">
        <div @click="goBack">
          <img class="_img" src="../assets/left.svg" alt />
        </div>
        <div class="Grade_entry_text">{{ title }}</div>
      </div>
    </div>
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
        <h4 class="subheading mb-2 primary--text">
          {{ achievement.teacherName }}老师
        </h4>
        <p>
          {{ achievement.comment }}
        </p>
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
  StudentGradeDetail
} from '../models/grade.model'
import { get } from 'vuex-pathify'
import {
  classesModulePath,
  currentStudent
} from '../store/classes/classes.paths'
import { gradeService } from '../services/grade.service'

export default Vue.extend({
  name: 'StudentGradeDetail',
  components: { Chart },
  props: {},
  data() {
    return {
      chartOption: null as EChartOption,
      studentGradeDetail: {} as StudentGradeDetail
    }
  },
  computed: {
    ...get(classesModulePath, {
      currentStudent
    }),
    title() {
      const that: any = this
      const student = that.currentStudent as StudentInfoForDetail
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
      const student = that.currentStudent as StudentInfoForDetail

      this.$router.push({
        name: 'class-data',
        params: {
          classId: student.classId.toString()
        }
      })
    },
    loadStudentGrade() {
      const that: any = this
      const student = that.currentStudent as StudentInfoForDetail

      gradeService
        .getStudentGradetDetail({
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
            achievementVos: this.studentGradeDetail.achievementVos.reverse()
          }

          this.updateChart()
        })
    },
    updateChart() {
      const subjectList = this.studentGradeDetail.achievementVos || []
      const xAxisData = subjectList.map(subject => subject.subject)
      const seriesData1 = subjectList.map(subject => subject.achievement)

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
            name: '直接访问',
            type: 'bar',
            barWidth: '70%',
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function({
                  componentType,
                  seriesType,
                  seriesIndex,
                  seriesName,
                  name,
                  dataIndex,
                  data,
                  value,
                  color
                }) {
                  return data[dataIndex]
                }
              }
            },
            data: seriesData1,
            itemStyle: {
              color: function(params) {
                var colorList = ['#F86E6E', '#E591E5', '#33CCFF']
                return colorList[params.dataIndex]
              }
            }
          }
        ]
      }
    }
  },
  created() {
    const that: any = this
    console.log('this.currentStudent', that.currentStudent)
    this.loadStudentGrade()
  },
  mounted() {}
})
</script>

<style scoped lang="scss">
.wrapper {
  margin-bottom: 76px;
}

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
