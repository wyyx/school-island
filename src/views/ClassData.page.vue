<template>
  <div>
    <div class="box">
      <div class="Grade_entry">
        <div @click="GoBack">
          <img class="_img" src="../assets/left.svg" alt />
        </div>
        <div class="Grade_entry_text">班级数据</div>
      </div>
    </div>
    <div>
      <v-tabs v-model="active" fixed-tabs>
        <v-tab v-for="(item, index) in text" :key="index">{{
          item.title
        }}</v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>能量表现</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>值周数据</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <div class="Grade_box">
                <div>
                  <v-flex xs11 sm6 d-flex>
                    <v-select :items="itemsA" label="三年级下" solo></v-select>
                  </v-flex>
                </div>
                <div>
                  <v-flex xs11 sm6 d-flex>
                    <v-select :items="itemsB" label="期末考评" solo></v-select>
                  </v-flex>
                </div>
                <div>2019.5.27</div>
              </div>
              <div>
                <!-- <ClassDataClassGrade></ClassDataClassGrade> -->
              </div>
              <div class="Grade">
                <div class="Grade_text">个人成绩</div>
                <div class="Conversion_box">
                  <div class="Conversion">
                    <span>
                      学号
                      <img class="_img" src="../assets/ConversionA.svg" alt />
                    </span>
                    <span>
                      综合
                      <img class="_img" src="../assets/ConversionB.svg" alt />
                    </span>
                  </div>
                </div>
              </div>
              <div class="Grouping_box">
                <div class="Grouping git_style">
                  <span>学号</span>
                  <span>姓名</span>
                  <span>小组</span>
                  <span>详情</span>
                </div>
                <div class="Grouping _top">
                  <span>1</span>
                  <span>李小龙</span>
                  <span>一组</span>
                  <span @click="DetailsA">
                    <img class="_img" src="../assets/View.svg" alt />
                  </span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>基础数据</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ClassData',
  components: {},
  props: {},
  data() {
    return {
      active: 2,
      text: [
        { title: '能量表现' },
        { title: '值周数据' },
        { title: '班级成绩' },
        { title: '基础数据' }
      ],
      itemsA: ['三年级下', '二年级上', '二年级下', '一年级上', '一年级下'],
      itemsB: ['期末考评', '期中考评', '月度考评']
    }
  },
  methods: {
    GoBack() {
      this.$router.push({
        name: 'my-classes'
      })
    },
    //详情
    DetailsA() {
      this.$router.push({ name: 'student-grade-detail' })
    }
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
.v-tabs__div {
  font-size: 16px !important;
}
.Grade_box {
  border-top: 1px solid #cccccc;
  display: flex;
  padding: 10px 0 15px 0;
}
.Grade {
  border-top: 17px solid #f2f2f2;
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
</style>
