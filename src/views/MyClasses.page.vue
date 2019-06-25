<template>
  <div class="wrapper">
    <div class="box">
      <div class="Grade_entry">
        <div @click="goBack">
          <img class="_img" src="../assets/left.svg" alt />
        </div>
        <div class="Grade_entry_text">班级事务</div>
      </div>
    </div>
    <div class="class_show">
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

          <div>
            <v-rating
              v-model="rating"
              background-color="purple lighten-3"
              color="purple"
              small
            ></v-rating>
          </div>
        </div>
        <div class="class_Setting">
          <img class="_img" src="../assets/Setting.svg" alt />
        </div>
      </div>
      <div class="member_box pb-2">
        <div>老师</div>
        <div>学生</div>
        <div>家长</div>
        <div>成员</div>
      </div>
    </div>
    <div class="Class_display">
      <div class="Introduction">
        <span></span>
        <div>班级数据</div>
      </div>
      <div class="Introduction">
        <span></span>
        <div>班级照片</div>
      </div>
      <div class="Introduction">
        <span></span>
        <div>班级作品</div>
      </div>
      <div class="Introduction">
        <span></span>
        <div>班级荣誉</div>
      </div>
    </div>
    <div class="Class_transcript">
      <div class="flex pa-2" @click="goToClassDataPage" v-ripple>
        <div class="grow">班级成绩</div>
        <div class="shrink">
          <img class="_img" src="../assets/right.svg" alt />
        </div>
      </div>

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
    </div>
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

export default Vue.extend({
  name: 'MyClasses',
  components: {
    Chart
  },
  props: {
    initClassId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      tab: 0,
      rating: 2,
      currentClass: {} as ClassModel,
      briefGrade: {} as BriefGrade,
      chart: {} as ECharts,
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
    subjectList(): BriefSubjectGrade[] {
      const that: any = this
      const briefGrade: BriefGrade = that.briefGrade
      return (briefGrade && briefGrade.achievementVos) || []
    },
    currentSubject(): BriefSubjectGrade {
      console.log('TCL: this.subjectList', this.subjectList)

      return this.subjectList[this.tab]
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
        params: {
          classId: this.currentClass.classId.toString()
        }
      })
    },
    setInitClass() {
      const that: any = this

      if (!this.initClassId) {
        this.currentClass = that.classList[0]
      } else {
        this.currentClass = (that.classList as ClassModel[]).filter(
          aclass => aclass.classId === parseInt(this.initClassId)
        )[0]
      }
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
            data: this.currentSubject.achievements || [],
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
    this.setInitClass()
    this.loadBriefGrade(this.currentClass.classId)
  }
})
</script>

<style scoped lang="scss">
.wrapper {
  margin-bottom: 76px;
}

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
