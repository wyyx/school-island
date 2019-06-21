<template>
  <div>
    <div class="box">
      <div class="Grade_entry">
        <div @click="GoBack">
          <img class="_img" src="../assets/left.svg" alt />
        </div>
        <div class="Grade_entry_text">成长档案</div>
      </div>
    </div>
    <div class="file_box">
      <div class="file_ion">
        <span></span>
      </div>
      <div class="file_class">
        <span>22号 王二娃子</span>
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
        <span class="Born">出生2011.11.11</span>
      </div>
      <div class="file_honor">
        <span>2017级3班</span>
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
    <div class="contribution_box">
      <div class="contribution_star">
        <div>8988</div>
        <span>星星</span>
      </div>
      <div class="contribution_energy">
        <div>8988</div>
        <span>星星</span>
      </div>
      <div class="contribution_raye"></div>
    </div>
    <div class="My_grades_box">
      <v-tabs v-model="active">
        <v-tab v-for="(item, index) in text" :key="index">{{
          item.title
        }}</v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <div class="MyGrades">
                <div>我的成绩</div>
                <div>2019.5.27</div>
                <div @click="GradeDetails">
                  <span>详情</span>
                  <span class="group pa-2">
                    <v-icon>chevron_right</v-icon>
                  </span>
                </div>
              </div>
              <!-- <GrowthFile-MyGrades></GrowthFile-MyGrades> -->
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>值周数据</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>我的荣誉</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'StudentGrade',
  components: {},
  props: {},
  data() {
    return {
      rating: 2,
      active: 0,
      text: [
        { title: '成长数据' },
        { title: '我的作品' },
        { title: '我的荣誉' }
      ]
    }
  },
  methods: {
    GoBack() {
      this.$router.push({
        name: 'class-data'
      })
    },
    //详情
    GradeDetails() {}
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
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
