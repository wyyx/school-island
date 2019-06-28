<template>
  <div>
    <div class="box">
      <div class="Grade_entry">
        <div @click="goBack">
          <img class="_img" src="../assets/left.svg" alt />
        </div>
        <div class="Grade_entry_text">数据中心</div>
      </div>
    </div>
    <div>
      <!-- categoryTab -->
      <v-tabs v-model="categoryTab" fixed-tabs slider-color="primary">
        <v-tab v-for="(item, index) in tabTextList" :key="index">{{
          item.title
        }}</v-tab>
        <!-- duty check tab content -->
        <v-tab-item>
          <v-card flat>
            <v-card-text><Developing></Developing></v-card-text>
          </v-card>
        </v-tab-item>

        <!-- studnet grade tab content -->
        <v-tab-item>
          <v-card class="content pa-2">
            <v-card-title primary-title>
              <h3>学生成绩</h3>
            </v-card-title>
            <!-- conditions select -->
            <v-layout row class="py-1">
              <v-flex xs6 class="px-1">
                <v-select
                  v-model="currentGrade"
                  :items="gradeList"
                  item-text="grade"
                  item-value="grade"
                  :return-object="true"
                  :hide-details="true"
                  solo
                ></v-select>
              </v-flex>
              <v-flex xs6 class="px-1">
                <v-select
                  :items="classListVo"
                  item-text="className"
                  item-value="classId"
                  :return-object="true"
                  v-model="currentClass"
                  :hide-details="true"
                  solo
                ></v-select>
              </v-flex>
            </v-layout>

            <!-- subject tabs -->
            <v-tabs v-model="subjectTab" slider-color="primary">
              <v-tab
                v-for="subject in subjectList"
                :key="subject.subject"
                ripple
              >
                {{ subject.subject }}
              </v-tab>
            </v-tabs>
            <div class="student-grade-wrapper">
              <Chart
                v-if="chartOption"
                width="100%"
                height="300px"
                :option="chartOption"
              ></Chart>
            </div>
          </v-card>
        </v-tab-item>
        <!-- teacher data tab content -->
        <v-tab-item>
          <v-card flat>
            <v-card-text><Developing></Developing></v-card-text>
          </v-card>
        </v-tab-item>
        <!-- school data tab content -->
        <v-tab-item>
          <v-card flat>
            <v-card-text><Developing></Developing></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { classesModulePath, classList } from '../store/classes/classes.paths'
import { ClassModel } from '../models/class.model'
import { get } from 'vuex-pathify'
import { authModulePath, user, currentStudent } from '../store/auth/auth.paths'
import Developing from '@/components/Developing.component.vue'
import { gradeService } from '../services/grade.service'
import {
  BriefGrade,
  StudentInfoForDetail,
  ClassModelForSchoolRun,
  BriefStudentGradeForSchoolRun,
  GradeVo,
  SubjectAchievement,
  GRADE_LEVEL_TEXTS
} from '../models/grade.model'
import { StudentVo } from '../models/user.model'
import { storeService } from '../services/store.service'
import { EChartOption } from 'echarts'
import Chart from '@/components/Chart.component.vue'

export default Vue.extend({
  name: 'ClassData',
  components: { Developing, Chart },
  props: {
    classId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      categoryTab: 1,
      subjectTab: 1,
      tabTextList: [
        { title: '值周数据' },
        { title: '学生数据' },
        { title: '老师数据' },
        { title: '校园数据' }
      ],
      gradeList: [] as GradeVo[],
      classListVo: [] as ClassModelForSchoolRun[],
      currentClass: {} as ClassModelForSchoolRun,
      currentGrade: {} as GradeVo,
      briefGrade: {} as BriefStudentGradeForSchoolRun,
      studentList: [] as StudentVo[],
      chartOption: null as EChartOption
    }
  },
  computed: {
    ...get(classesModulePath, {
      classList
    }),
    ...get(authModulePath, {
      user
    }),
    subjectList(): SubjectAchievement[] {
      const that: any = this
      const briefGrade: BriefStudentGradeForSchoolRun = that.briefGrade
      return (briefGrade && briefGrade.achievements) || []
    },
    currentSubject(): SubjectAchievement {
      return this.subjectList[this.subjectTab]
    }
  },
  watch: {
    currentGrade(newVal, oldVal) {
      const grade = newVal as GradeVo
      const that: any = this
      const allClassesItem = {
        classId: 0,
        className: '全部班级',
        grade: grade.grade
      } as ClassModelForSchoolRun

      that.classListVo = grade.classes || []
      const classListVo = that.classListVo as ClassModelForSchoolRun[]
      classListVo.unshift(allClassesItem)

      console.log('TCL: currentGrade -> classListVo', classListVo)
      that.currentClass = grade.classes && grade.classes[0]
      this.loadStudentGradeByCondition()
    },
    subjectTab() {
      this.updateChart()
    },
    currentClass(newVal, oldVal) {
      this.loadStudentGradeByCondition()
      this.updateChart()
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'school-run'
      })
    },
    updateChart() {
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
            data: GRADE_LEVEL_TEXTS,
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
            data: this.currentSubject
              ? this.currentSubject.achievements || []
              : [],

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
    loadStudentGrade() {
      gradeService.getBriefStudentGradeForSchoolRun().then(res => {
        console.log('TCL: res', res)

        // set init data
        this.briefGrade = res.data.content
        this.gradeList = this.briefGrade.gradeVos || []
        this.currentGrade = this.gradeList[0]
        this.updateChart()
      })
    },
    loadStudentGradeByCondition() {
      gradeService
        .getBriefStudentGradeForSchoolRunByCondition({
          classId: this.currentClass.classId,
          className: this.currentClass.className,
          grade: this.currentGrade.grade
        })
        .then(res => {
          console.log('TCL: res', res)

          // set init data
          this.briefGrade = res.data.content
          this.updateChart()
        })
    }
  },
  mounted() {},
  created() {
    this.loadStudentGrade()
    this.updateChart()
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
.v-tabs__div {
  font-size: 16px !important;
}
.Grade_box {
  border-top: 1px solid #cccccc;
  display: flex;
  padding: 10px 0 15px 0;
}
.Grade {
  .Grade_text {
    font-size: 18px;
    padding: 10px 0 20px 5px;
  }
  .Conversion_box {
    display: flex;
    justify-content: flex-end;
    span:nth-child(1) {
      color: #00ccff;
      margin-right: 10px;
    }
    span:nth-child(2) {
      color: #aeaeae;
    }
  }
}
.Grouping_box {
  padding-top: 17px;
  ._top {
    padding: 11px 0;
    border-bottom: 1px solid #eaeaea;
  }
  .git_style {
    background-color: #f2f2f2;
    span {
      font-size: 18px;
      padding: 5px;
    }
  }
  .Grouping {
    display: flex;
    justify-content: space-between;
    span {
      display: block;
      text-align: center;
    }
    span:nth-child(1) {
      width: 20%;
    }
    span:nth-child(2) {
      width: 20%;
    }
    span:nth-child(3) {
      width: 20%;
      opacity: 0;
    }
    span:nth-child(4) {
      width: 20%;
    }
  }
}

.search-btn-wrapper {
  width: 25px;
  margin-left: auto;
}


</style>
