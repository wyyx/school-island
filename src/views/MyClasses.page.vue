<template>
  <div class="wrapper">
    <Header title="班级成绩" @back="goBack"></Header>
    <v-card class="primary lighten-3 mb-2">
      <div class="class_box">
        <div class="class_box_log">
          <v-avatar size="64">
            <img :src="user.headImgUrl" alt="alt" />
          </v-avatar>
        </div>
        <div class="class_Rating">
          <v-select
            v-model="currentClass"
            :items="classList"
            item-text="className"
            item-value="classId"
            :return-object="true"
            :hide-details="true"
          ></v-select>
        </div>
      </div>
    </v-card>

    <v-card v-ripple class="pa-3 mb-2 clickable">
      <div class="app-flex " @click="goToClassDataPage">
        <div class="app-grow subheading">班级成绩详情</div>
        <div class="app-shrink app-both-center">
          <img class="_img" src="../assets/right.svg" alt />
        </div>
      </div>
    </v-card>

    <v-card class="pa-3 mb-2">
      <h3 class="subheading">
        {{ briefGrade.currentGrade + examTypeName }}成绩总览
      </h3>
      <v-tabs v-model="tab" slider-color="primary">
        <v-tab v-for="subject in subjectList" :key="subject.subject" ripple>
          {{ subject.subject }}
        </v-tab>
      </v-tabs>

      <div class="class-grade">
        <Chart
          v-if="chartOption"
          width="150%"
          height="300px"
          :option="chartOption"
        ></Chart>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import { classesModulePath, classList } from '../store/classes/classes.paths'
import { gradeService } from '../services/grade.service'
import { ClassModel } from '../models/class.model'
import { authModulePath, user } from '../store/auth/auth.paths'
import {
  BriefGrade,
  BriefSubjectGrade,
  GRADE_LEVEL_TEXTS
} from '../models/grade.model'
import echarts, { EChartOption, ECharts } from 'echarts'
import Chart from '@/components/Chart.component.vue'
import Header from '@/components/Header.component.vue'
import { EXAM_TYPES } from '../models/grade-input.model'
import { dutyService } from '../services/duty.service'
import { UserInfo } from '../models/user.model'

export default Vue.extend({
  name: 'MyClasses',
  components: {
    Chart,
    Header
  },
  props: {
    classId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      tab: 0,
      rating: 2,
      classList: [] as ClassModel[],
      currentClass: {} as ClassModel,
      briefGrade: {} as BriefGrade,
      chartOption: null as EChartOption,
      examTypes: EXAM_TYPES
    }
  },
  computed: {
    ...get(authModulePath, {
      user
    }),
    subjectList(): BriefSubjectGrade[] {
      const that: any = this
      const briefGrade: BriefGrade = that.briefGrade
      return (briefGrade && briefGrade.achievementVos) || []
    },
    currentSubject(): BriefSubjectGrade {
      console.log('TCL: this.subjectList', this.subjectList)

      return this.subjectList[this.tab]
    },
    examTypeName() {
      const that: any = this
      const briefGrade = that.briefGrade as BriefGrade
      const exam = EXAM_TYPES.filter(
        type => type.code === briefGrade.examType
      )[0]
      return exam && exam.exam
    }
  },
  watch: {
    tab() {
      this.updateChart()
    },
    currentClass(newVal, oldVal) {
      const aclass = newVal as ClassModel
      this.loadBriefGrade(aclass.classId)
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'teacher'
      })
    },
    goToClassDataPage() {
      this.$router.push({
        name: 'class-data',
        query: {
          classId: this.currentClass.classId.toString()
        }
      })
    },
    loadClassList(teacherId: number) {
      dutyService.getClassList(teacherId).then(res => {
        this.classList = res.data.content || []
        console.log('TCL: loadClassList -> res.data.content', res.data.content)

        this.setInitClass()
      })
    },
    setInitClass() {
      if (!this.classId) {
        // show first class default
        const firstClass =
          this.classList.length > 0 ? this.classList[0] : ({} as ClassModel)

        this.currentClass = firstClass
      } else {
        // set to target class
        const targetClass = this.classList.filter(
          aclass => aclass.classId === parseInt(this.classId)
        )[0]

        this.currentClass = targetClass || ({} as ClassModel)
      }

      if (this.currentClass.classId) {
        this.loadBriefGrade(this.currentClass.classId)
      }
    },
    updateChart() {
      const data = this.currentSubject.achievements || []

      const filterdGradeLevelTexts = []
      let filterdData = []

      for (let index = 0; index < data.length; index++) {
        const element = data[index]

        if (element !== 0) {
          filterdData.push(element)
          filterdGradeLevelTexts.push(GRADE_LEVEL_TEXTS[index])
        }
      }

      this.chartOption = {
        color: ['#3398DB'],
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
            show: false,
            type: 'category',
            data: filterdGradeLevelTexts,
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
            name: '班级成绩',
            type: 'bar',
            barWidth: '70%',
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: '{c} 人\n{b}',
                lineHeight: 18
              }
            },
            data: filterdData || [],
            itemStyle: {
              color: function(params) {
                var colorList = [
                  '#909090',
                  '#F86E6E',
                  '#E591E5',
                  '#33CCFF',
                  '#33CCFF',
                  '#33CCFF',
                  '#33CCFF',
                  '#33CCFF',
                  '#33CCFF',
                  '#33CCFF',
                  '#33CCFF',
                  '#33CCFF',
                  '#33CCFF',
                  '#33CCFF'
                ]
                return colorList[params.dataIndex]
              }
            }
          }
        ]
      }
    },
    loadBriefGrade(classId: number) {
      gradeService.getBriefGrade(classId).then(res => {
        console.log('TCL: loadBriefGrade -> res', res)
        this.briefGrade = res.data.content
        this.updateChart()
      })
    }
  },
  mounted() {},
  created() {
    const that: any = this
    this.loadClassList((that.user as UserInfo).teacherId)
  }
})
</script>

<style scoped lang="scss">
.class-grade {
  width: 100%;
  overflow-x: scroll;
}

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
}

.class_show {
  background-color: #66ccff;
}
.class_box {
  padding: 15px;
  display: flex;
}
.class_box_log {
  width: 30%;
  > span {
    display: block;
    width: 70px;
    height: 70px;
    background-color: #ffff;
    border-radius: 50%;
  }
}
.class_Rating {
  width: 50%;
}
.class_Setting {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}
.member_box {
  display: flex;
  justify-content: space-around;
}
.Class_display {
  padding: 12px 15px;
  display: flex;
  justify-content: space-around;
  border-bottom: 17px solid #f2f2f2;
  .Introduction > span {
    width: 50px;
    height: 50px;
    display: block;
    background-color: #66ccff;
    border-radius: 50%;
  }
}
.Class_transcript {
  padding: 10px;
  .Grade_text {
    padding: 5px 10px 8px 10px;
    display: flex;
    > div:nth-child(1) {
      width: 35%;
      font-size: 18px;
    }
    > div:nth-child(2) {
      width: 55%;
      color: #c2bccb;
    }
    > div:nth-child(3) {
      width: 10%;
    }
  }
  .Number_box {
    > span {
      margin-right: 25px;
      color: #bcbcbc;
    }
    span:nth-child(1) {
      color: #52ccff;
    }
  }
  .total_ranking {
    > span {
      display: block;
      padding-top: 10px;
    }
  }
}

#chart {
  height: 300px;
  width: 100%;
}
</style>
