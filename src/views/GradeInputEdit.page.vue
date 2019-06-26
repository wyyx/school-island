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
        一年级3班，语文，成绩录入
      </h3>
    </v-card>
    <v-card class=" lighten-3 pa-3">
      <v-layout row wrap>
        <v-flex xs4>
          <v-list>
            <div v-for="item in items" :key="item.title">
              <v-list-tile class="pa-0">
                <v-list-tile-content>
                  <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </div>
          </v-list>
        </v-flex>
        <v-flex xs8>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis unde
          praesentium iure facere numquam eum vero doloremque similique
          voluptatibus! Quibusdam non quos repudiandae voluptates aperiam
          laudantium suscipit tempore voluptas, consectetur ullam voluptatem
          blanditiis quae, quas eligendi veniam doloribus eius officia fuga
          aliquam provident nobis, commodi laborum ut! Corporis rem quod
          obcaecati facere? Nostrum sint iste saepe exercitationem repudiandae
          ducimus unde corrupti dolores accusantium voluptas expedita ipsum hic,
          eum tempora ea corporis perferendis rerum quam labore voluptatem
          blanditiis nam culpa. Vero adipisci architecto doloremque voluptatum
          dolores ullam officiis esse obcaecati veritatis blanditiis nihil
          distinctio laborum tempora voluptas at iste, ad repellat.
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import { ClassModel } from '../models/class.model'
import { get } from 'vuex-pathify'
import { classesModulePath, classList } from '../store/classes/classes.paths'
import { gradeService } from '../services/grade.service'
import { authModulePath, user } from '../store/auth/auth.paths'
import { Student, EXAM_TYPES } from '../models/grade-input.model'

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
      studentList: [] as Student[],
      examTypes: EXAM_TYPES,
      items: [
        {
          icon: true,
          title: '李一',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
        },
        {
          title: '李二',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
        },
        {
          title: '王三三',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
        },
        {
          icon: true,
          title: '李一1',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
        },
        {
          title: '李二2',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
        },
        {
          title: '王三三3',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
        },
        {
          icon: true,
          title: '李一4',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
        },
        {
          title: '李二5',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
        },
        {
          title: '王三三6',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
        },
        {
          icon: true,
          title: '李一7',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
        },
        {
          title: '李二8',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
        },
        {
          title: '王三三9',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
        },
        {
          icon: true,
          title: '李一10',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
        },
        {
          title: '李二11',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
        },
        {
          title: '王三三12',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
        }
      ]
    }
  },
  watch: {
    currentClass(newVal, oldVal) {
      this.loadStudentList()
    }
  },
  computed: {
    ...get(authModulePath, {
      user
    }),
    ...get(classesModulePath, {
      classList
    })
  },
  created() {
    this.setInitClass()
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
      gradeService
        .getGradeInputStudentListResponse({
          classId: this.currentClass.classId,
          pageNo: 1,
          pageSize: 1000,
          teacherId: that.user.teacherId
        })
        .then(res => {
          console.log('TCL: res', res)

          this.studentList = res.data.content || []
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.content-wrapper {
  margin-bottom: 76px;
}

// .header-wrapper {
//   z-index: 1200;
// }

// .grade-title {
//   z-index: 100;
// }
</style>
