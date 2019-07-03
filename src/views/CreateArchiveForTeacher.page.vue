<template>
  <div class="wrapper create-archive-for-student-page">
    <Header title="建立学生档案" @back="goBack"></Header>

    <v-stepper v-model="step">
      <v-stepper-header class="px-2">
        <v-stepper-step :complete="step > 1" step="1">
          <div class="py-1">基础信息</div>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">
          <div class="py-1">教育背景</div>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="step > 3">
          <div class="py-1">经历与荣誉</div>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4" :complete="step >= 4">
          <div class="py-1">完成</div>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- 1 stepper 基础信息 -->
        <v-stepper-content step="1">
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">基础信息</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex> </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <v-layout row wrap class="pa-4 text-xs-center">
            <v-flex xs6>
              <v-btn color="primary" @click="goToNextStepper">
                下一步
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <!-- 2 stepper 教育背景 -->
        <v-stepper-content step="2" v-if="step >= 2">
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">教育背景</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex> </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <v-layout row wrap class="text-xs-center pa-4">
            <v-flex>
              <v-btn flat @click="step = 1">
                上一步
              </v-btn>
            </v-flex>

            <v-flex>
              <v-btn color="primary" @click="goToNextStepper">
                下一步
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <!-- 3 stepper 经历与荣誉 -->
        <v-stepper-content step="3" v-if="step >= 3">
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">经历与荣誉</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout row nowrap>
                <v-flex class="pr-3"> </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <v-layout row wrap class="text-xs-center pa-4">
            <v-flex>
              <v-btn flat @click="step = 2">
                上一步
              </v-btn>
            </v-flex>
            <v-btn color="primary" @click="submit">
              提交
            </v-btn>
            <v-flex> </v-flex>
          </v-layout>
        </v-stepper-content>

        <!-- 4 step 完成 -->
        <v-stepper-content step="4" v-if="step >= 4">
          <v-card flat class="mb-4" height="200px">
            <div class="app-flex app-h-center app-v-center app-fill-height">
              <div class="text-xs-center">
                <v-icon color="success" size="56">check_circle_outline</v-icon>
                <div class="title app-v-center">恭喜您，终于完成了！</div>
              </div>
            </div>
          </v-card>

          <div class="text-xs-center pa-4">
            <v-btn color="primary" @click="goToHomePage">
              回到首页
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.component.vue'
import { ID_CARD_REG, PHONE_NUMBER_REG } from '../configs/config'
import { archiveService } from '../services/archive.service'
import {
  AddStudentAndParentsInfoCollectionParams,
  UnfinishedInfoCollection,
  InfoCollectionUserTypes,
  InfoCollectionStudentTypes,
  Parent
} from '../models/archive.model'

export default Vue.extend({
  components: { Header },
  data: function() {
    return {
      ID_CARD_REG: ID_CARD_REG,
      PHONE_NUMBER_REG: PHONE_NUMBER_REG,
      step: 1,
      validated: false,
      // 学生基础信息

      // 第一监护人

      // 第二监护人

      // 学生信息
      unfinishedInfoCollectionList: [] as UnfinishedInfoCollection[]
    }
  },
  computed: {},
  created() {
    this.getUnfinishedInfoCollection()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goToHomePage() {
      this.$router.push({
        name: 'home'
      })
    },
    goToNextStepper() {
      this.$validator.validate().then(valid => {
        console.log('TCL: goToNextStepper -> valid', valid)
        this.validated = true

        if (valid) {
          this.step = this.step + 1
          this.validated = false
        }
      })
    },
    fillForm() {
      const that: any = this
    },
    submit() {
      this.$validator.validate().then(valid => {
        console.log('TCL: valid', valid)
        this.validated = true

        if (valid) {
          console.log('post backend api')

          const params = {} as AddStudentAndParentsInfoCollectionParams

          const that: any = this
          const firstStudentInfo = that.firstStudentInfo as AddStudentAndParentsInfoCollectionParams

          // 学生类型

          console.log('TCL: submit -> params', params)

          archiveService
            .addStudentAndParentsInfoCollection(params)
            .then(res => {
              console.log(
                'TCL: addStudentAndParentsInfoCollection submit -> res',
                res
              )

              if (res.data.content) {
                this.step = 4
              }
            })
        }
      })
    },
    getUnfinishedInfoCollection() {
      archiveService.getUnfinishedInfoCollection().then(res => {
        console.log('TCL: getUnfinishedInfoCollection -> res', res)
        this.unfinishedInfoCollectionList = res.data.content || []

        this.fillForm()
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
