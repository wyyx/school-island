<template>
  <div class="wrapper create-archive-for-student-page">
    <Header title="建立学生档案" @back="goBack"></Header>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          基础信息
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">
          监护人信息
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="step > 3">
          学生信息
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4"> 完成</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!--  基础信息 -->
        <v-stepper-content step="1">
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">基础信息</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex>
                  <v-text-field label="姓名"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="身份证号"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="籍贯"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="名族"></v-text-field>
                </v-flex>

                <v-flex>
                  <v-radio-group
                    label="是否为独生子女"
                    v-model="isOnlyChild"
                    row
                  >
                    <v-radio label="是" :value="true"></v-radio>
                    <v-radio label="否" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex>
                  <v-radio-group
                    label="是否为留守儿童"
                    v-model="isLeftoverChild"
                    row
                  >
                    <v-radio label="是" :value="true"></v-radio>
                    <v-radio label="否" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex xs6>
                  <v-textarea
                    rows="3"
                    outline
                    auto-grow
                    label="家庭地址"
                    value=""
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <div class="app-flex pa-3">
            <v-btn color="primary" @click="step = 2">
              下一步
            </v-btn>
          </div>
        </v-stepper-content>

        <!-- 监护人信息 -->
        <v-stepper-content step="2">
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">监护人信息</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex>
                  <v-text-field label="第一监护人姓名"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="电话"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    v-model="certificateType"
                    :items="['身份证', '其他']"
                    label="证件类型"
                  ></v-select>
                </v-flex>

                <v-flex>
                  <v-text-field
                    v-if="certificateType === '其他'"
                    label="证件类型名称"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="证件号码"></v-text-field>
                </v-flex>

                <v-flex>
                  <v-text-field label="学历"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="职业"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-select :items="[]" label="与学生的关系"></v-select>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <div class="app-flex pa-3">
            <v-btn color="primary" @click="step = 3">
              下一步
            </v-btn>
            <v-btn flat @click="step = 1">
              上一步
            </v-btn>
          </div>
        </v-stepper-content>

        <!-- 学生信息 -->
        <v-stepper-content step="3">
          <v-card class="mb-4" flat>
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">学生信息</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout row nowrap>
                <v-flex class="pr-3">
                  <v-text-field
                    type="number"
                    label="身高"
                    suffix="厘米"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    type="number"
                    label="体重"
                    suffix="公斤"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row nowrap>
                <v-flex xs6 class="pr-3">
                  <v-select :items="[]" label="视力"></v-select>
                </v-flex>
              </v-layout>

              <v-layout row nowrap>
                <v-flex class="pr-3">
                  <v-flex class="pr-3">
                    <v-select :items="[]" label="左眼/五分记法"></v-select>
                  </v-flex>
                </v-flex>
                <v-flex>
                  <v-flex>
                    <v-select :items="[]" label="右眼/五分记法"></v-select>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-btn color="primary" @click="step = 4">
            提交
          </v-btn>
          <v-btn flat @click="step = 2">
            上一步
          </v-btn>
        </v-stepper-content>

        <!-- success step -->
        <v-stepper-content step="4">
          <v-card class="mb-4" color="grey lighten-1" height="200px"></v-card>
          <v-btn color="primary" @click="goToHomePage">
            回到首页
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.component.vue'

export default Vue.extend({
  components: { Header },
  data: function() {
    return {
      step: 1,
      isOnlyChild: false,
      isLeftoverChild: false,
      certificateType: '身份证'
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goToHomePage() {
      this.$router.push({
        name: 'home'
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
