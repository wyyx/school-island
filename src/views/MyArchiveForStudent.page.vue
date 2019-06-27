<template>
  <div>
    <div class="box">
      <div class="Grade_entry">
        <div @click="goBack">
          <img class="_img" src="../assets/left.svg" alt />
        </div>
        <div class="Grade_entry_text">成长档案</div>
      </div>
    </div>
    <div class="file_box">
      <div class="avatar-wrapper pl-3">
        <v-avatar :size="64" :tile="true">
          <img v-if="avatarUrl" src="" alt="头像" />
          <v-icon :size="64">account_box</v-icon>
        </v-avatar>
      </div>
      <div class="file_class">
        <span>{{ studentInfo.name }}</span>
        <div>
          <v-rating
            v-model="rating"
            full-icon="local_florist"
            empty-icon="local_florist"
            background-color="purple lighten-3"
            color="purple"
            small
          ></v-rating>
        </div>
        <span class="Born">{{ studentInfo.birthday }}</span>
      </div>
      <div class="file_honor">
        <span>{{ studentInfo.className }}</span>
      </div>
      <div class="file_recommend">
        <div class="recommend">
          <span>推荐为</span>
          <div>
            <span class="group pa-2">
              <v-icon>chevron_right</v-icon>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="contribution_box">
      <div class="contribution_star">
        <div>8988</div>
        <span>星星</span>
      </div>
      <div class="contribution_energy">
        <div>8988</div>
        <span>星星</span>
      </div>
      <div class="contribution_raye"></div>
    </div> -->
    <div class="My_grades_box">
      <v-tabs v-model="active">
        <v-tab v-for="(item, index) in tabTexts" :key="index">{{
          item.title
        }}</v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <div class="MyGrades">
                <div>我的成绩</div>
                <div @click="goToStudentGradeDetailForParentsPage">
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
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
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

export default Vue.extend({
  name: 'MyArchiveForStudent',
  computed: {
    ...get(authModulePath, {
      currentStudent
    })
  },
  components: { Chart },
  props: {},
  data() {
    return {
      rating: 2,
      active: 0,
      tabTexts: [{ title: '成长数据' }],
      studentGrade: {} as BriefStudentGradeForParents,
      chartOption: null as EChartOption,
      studentInfo: {} as StudentInfo,
      avatarUrl: ''
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
