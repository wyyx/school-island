<template>
  <div>
    <div class="box">
      <div class="Grade_entry">
        <div @click="GoBack">
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
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn outline light flat v-on="on" class="subheading">
                <span>{{ currentClass.className }}</span>
                <v-icon>arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="(aclass, index) in classList"
                :key="index"
                @click="switchClass(aclass)"
              >
                <v-list-tile-title>{{ aclass.className }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

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
      <div class="member_box">
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
      <div class="Grade_text" @click="goToClassDataPage">
        <div>班级成绩</div>
        <div>2019.5.27</div>
        <div>
          <img class="_img" src="../assets/right.svg" alt />
        </div>
      </div>
      <div class="Number_box">
        <span v-for="(item, index) in textA" :key="index">{{
          item.title
        }}</span>
      </div>
      <div class="total_ranking">
        <ClassWorkClass-Transcript></ClassWorkClass-Transcript>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClassWorkClassTranscript from '../components/ClassWorkClassTranscript.component.vue'
import { get } from 'vuex-pathify'
import { classesModulePath, classList } from '../store/classes/classes.paths'
import { gradeService } from '../services/grade.service'
import { ClassModel } from '../models/class.model'
import { authModulePath, user } from '../store/auth/auth.paths'
import { BriefGrade } from '../models/grade.model'

export default Vue.extend({
  name: 'MyClasses',
  components: {
    ClassWorkClassTranscript
  },
  props: {
    currentClassId: {
      type: String,
      required: false
    }
  },
  computed: {
    ...get(classesModulePath, {
      classList
    }),
    ...get(authModulePath, {
      user
    })
  },
  data() {
    return {
      rating: 2,
      textA: [
        { title: '语文' },
        { title: '数学' },
        { title: '英语' },
        { title: '美术' },
        { title: '美术' }
      ],
      currentClass: {} as ClassModel,
      briefGrade: {} as BriefGrade
    }
  },
  methods: {
    GoBack() {
      this.$router.back()
    },
    goToClassDataPage() {
      this.$router.push({ name: 'class-grade' })
    },
    switchClass(aclass: ClassModel) {
      this.currentClass = aclass
    },
    setInitClass() {
      const that: any = this

      this.currentClass = (that.classList as ClassModel[]).filter(
        aclass => aclass.classId === parseInt(this.currentClassId)
      )[0]
    }
  },
  created() {
    this.setInitClass()
    gradeService.getBriefGrade(this.currentClass.classId).then(res => {
      this.briefGrade = res.data.content
    })
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
</style>
