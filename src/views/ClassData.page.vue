<template>
  <div>
    <div class="box">
      <div class="Grade_entry">
        <div @click="goBack">
          <img class="_img" src="../assets/left.svg" alt />
        </div>
        <div class="Grade_entry_text">班级数据</div>
      </div>
    </div>
    <div>
      <v-tabs v-model="active" fixed-tabs slider-color="primary">
        <v-tab v-for="(item, index) in text" :key="index">{{
          item.title
        }}</v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text><Developing></Developing></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text><Developing></Developing></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="content">
            <v-card-text>
              <div>
                <v-layout row wrap>
                  <v-flex xs4 class="px-2">
                    <v-select
                      v-model="currentGrade"
                      :items="gradeList"
                      :hide-details="true"
                      solo
                    ></v-select>
                  </v-flex>
                  <v-flex xs8 class="px-2">
                    <v-select
                      :items="semisterlist"
                      item-text="name"
                      item-value="value"
                      :return-object="true"
                      v-model="currentSemister"
                      solo
                    ></v-select>
                  </v-flex>
                </v-layout>
              </div>
              <div></div>
              <div class="Grade">
                <v-card flat>
                  <v-card-title class="pa-1">
                    <v-text-field
                      v-model="search"
                      append-icon="search"
                      label="搜索"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="headers"
                    :items="studentList"
                    class="elevation-0"
                    hide-actions
                    :search="search"
                    no-data-text="暂无数据..."
                    no-results-text="没有匹配的数据..."
                    :pagination.sync="pagination"
                  >
                    <template v-slot:items="props">
                      <td class="text-xs-right">
                        {{ props.item.studentNumber }}
                      </td>
                      <td class="text-xs-right">
                        {{ props.item.studentName }}
                      </td>
                      <td
                        class="text-xs-right"
                        @click="goToStudentGradeDetailPage(props.item)"
                      >
                        <div class="search-btn-wrapper" v-ripple>
                          <v-icon>search</v-icon>
                        </div>
                      </td>
                    </template>
                  </v-data-table>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
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
import { BriefGrade, StudentInfoForDetail } from '../models/grade.model'
import { StudentVo } from '../models/user.model'
import { storeService } from '../services/store.service'

export default Vue.extend({
  name: 'ClassData',
  components: { Developing },
  props: {
    classId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      active: 2,
      text: [
        { title: '能量表现' },
        { title: '值周数据' },
        { title: '班级成绩' },
        { title: '基础数据' }
      ],
      currentClass: {} as ClassModel,
      semisterlist: [
        { name: '上学期期末考评', value: 1 },
        { name: '下学期期末考评', value: 2 }
      ],
      currentSemister: { name: '下学期期末考评', value: 2 },
      currentGrade: '',
      briefGrade: {} as BriefGrade,
      headers: [
        {
          text: '学号',
          align: 'right',
          sortable: true,
          value: 'studentNumber',
          sort: 'asc'
        },
        { text: '姓名', align: 'right', sortable: false, value: 'name' },
        { text: '详情', align: 'right', sortable: true, value: '' }
      ],
      pagination: { sortBy: 'createTime', descending: true, rowsPerPage: -1 },
      search: '',
      studentList: [] as StudentVo[]
    }
  },
  computed: {
    ...get(classesModulePath, {
      classList
    }),
    ...get(authModulePath, {
      user
    }),
    gradeList() {
      const that: any = this
      //  const studentList = ( that.briefGrade as BriefGrade ).students
      console.log(
        'TCL: gradeList -> (that.briefGrade as BriefGrade).grades',
        (that.briefGrade as BriefGrade).grades
      )

      return (that.briefGrade as BriefGrade).grades || []
    }
  },
  watch: {
    currentGrade(newVal, oldVal) {
      const that: any = this

      console.log(
        'TCL: currentGrade -> that.currentSemister.value',
        that.currentSemister.value
      )

      const condition = {
        classId: that.currentClass.classId,
        grade: that.currentGrade,
        type: that.currentSemister.value
      } as any

      console.log('TCL: currentGrade -> condition', condition)
      this.loadHistoryGradeStudentListByConditon(condition)
    },
    currentSemister(newVal, oldVal) {
      const that: any = this

      const condition = {
        classId: that.currentClass.classId,
        grade: that.currentGrade,
        type: that.currentSemister.value
      } as any

      console.log('TCL: condition', condition)
      this.loadHistoryGradeStudentListByConditon(condition)
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'my-classes'
      })
    },
    goToStudentGradeDetailPage(student: StudentVo) {
      console.log('TCL: goToStudentGradeDetailPage -> student', student)
      storeService.store.set(classesModulePath + currentStudent, {
        name: student.studentName,
        grade: this.currentGrade,
        classId: parseInt(this.classId),
        semister: this.currentSemister.name,
        studentId: student.studentId,
        type: this.currentSemister.value
      } as StudentInfoForDetail)
      this.$router.push({
        name: 'student-grade-detail'
      })
    },
    loadHistoryGradeStudentList(classId: number) {
      gradeService.getHistoryGradeStudentList(classId).then(res => {
        console.log(
          'TCL: loadHistoryGradeStudentList -> res xxxxxxxxxxxxx',
          res
        )

        this.briefGrade = res.data.content || ({} as BriefGrade)

        this.studentList = this.briefGrade.students
        // set current grade
        this.currentGrade = this.briefGrade.currentGrade
        // set current semister
        this.currentSemister = {
          name: '上学期期末考评',
          value: this.briefGrade.examType
        }
      })
    },
    loadHistoryGradeStudentListByConditon(classId: number) {
      gradeService
        .getHistoryGradeStudentListByCondition({
          classId: this.currentClass.classId,
          grade: this.currentGrade,
          type: this.currentSemister.value
        })
        .then(res => {
          this.briefGrade = res.data.content || ({} as BriefGrade)
          this.studentList = this.briefGrade.students
        })
    },
    setInitClass() {
      const that: any = this
      this.currentClass = that.classList[0]
    }
  },
  mounted() {},
  created() {
    this.setInitClass()
    this.loadHistoryGradeStudentList(parseInt(this.classId))
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

.content {
  margin-bottom: 76px;
}
</style>
