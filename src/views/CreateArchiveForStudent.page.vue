<template>
  <div class="wrapper create-archive-for-student-page">
    <Header title="建立学生档案" @back="goBack"></Header>
    <v-stepper v-model="step">
      <v-stepper-header class="px-2">
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

        <v-stepper-step step="4" :complete="step >= 4"> 完成</v-stepper-step>
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

          <v-layout row wrap class="pa-3 text-xs-center">
            <v-flex xs6>
              <v-btn color="primary" @click="step = 2">
                下一步
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <!-- 2 stepper 监护人信息 -->
        <v-stepper-content step="2">
          <!-- 第一监护人 -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">第一监护人</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex>
                  <v-text-field label="姓名"></v-text-field>
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
                  <v-select :items="[]" label="学历"></v-select>
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

          <!-- 第二监护人 -->
          <v-card class="mb-4" v-if="showSecondGuardian">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">第二监护人</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex>
                  <v-text-field label="姓名"></v-text-field>
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
                  <v-select :items="[]" label="学历"></v-select>
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

          <!-- 添加第二监护人 btn -->
          <div class="px-3 app-flex">
            <v-btn small fab @click="showSecondGuardian = !showSecondGuardian">
              <v-icon color="primary" v-if="showSecondGuardian">remove</v-icon>
              <v-icon color="primary" v-else>add</v-icon>
            </v-btn>
            <div class="app-both-center pr-2">
              <span v-if="showSecondGuardian">移除第二监护人</span>
              <span v-else>添加第二监护人</span>
            </div>
          </div>

          <!-- 家庭扩展信息 -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">家庭扩展信息</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex class="py-2">
                  <h3>1. 您的孩子上下学主要由谁接送？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>2. 您的家庭结构？（现居住状况）</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>3. 您的家庭有阅读习惯吗？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>4. 父亲辅导或陪护孩子的时间？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex>
                  <h3 class="pb-3">
                    5. 如果学校或班级需要您的帮助，您能提供哪些优势资源？
                  </h3>
                  <v-textarea
                    class="guardian-resource"
                    outline
                    rows="3"
                    auto-grow
                    placeholder="例：广告资源、教育资源、医院资源、农家乐资源、会务资源、旅游资源......  类型不限,只要有优势都可以。"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <v-layout row wrap class="text-xs-center pa-3">
            <v-flex>
              <v-btn flat @click="step = 1">
                上一步
              </v-btn>
            </v-flex>

            <v-flex>
              <v-btn color="primary" @click="step = 3">
                下一步
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <!-- 3 stepper 学生信息 -->
        <v-stepper-content step="3">
          <!-- 学生信息 -->
          <v-card class="mb-4">
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

              <v-layout row nowrap>
                <v-flex class="pr-3">
                  <v-flex class="pr-3">
                    <v-select :items="[]" label="睡觉"></v-select>
                  </v-flex>
                </v-flex>
                <v-flex>
                  <v-flex>
                    <v-select :items="[]" label="起床"></v-select>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <!-- 学生扩展信息 -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0">学生扩展信息</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex class="py-2">
                  <h3 class="pb-3">1. 曾上过的幼儿园名称？</h3>
                  <v-textarea
                    class="kindergarten-name"
                    outline
                    rows="2"
                    auto-grow
                    placeholder="输入全称，例如：成都市天府新区红太阳幼儿园"
                  ></v-textarea>
                </v-flex>
                <v-flex class="py-2">
                  <h3>2. 孩子性格怎样？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>3. 孩子会主动收拾玩具，并归类放好吗?</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>4. 家庭作业完成时间？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>5. 课外主要去培训机构补习什么？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>6. 孩子接触电子设备时间（电视、手机、平板、）？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>7. 孩子是否在校吃午餐？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>8. 孩子曾换过哪种疾病？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>9. 孩子对哪些食物、药物过敏？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3>10. 孩子兴趣、爱好、特长？有哪些不足？</h3>
                  <v-select :items="[]" placeholder="请选择"></v-select>
                </v-flex>
                <v-flex class="py-2">
                  <h3 class="pb-3">11. 您对孩子教育期望？</h3>
                  <v-textarea
                    class="expectation-to-children"
                    outline
                    rows="3"
                    auto-grow
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <v-layout row wrap class="text-xs-center">
            <v-flex>
              <v-btn flat @click="step = 2">
                上一步
              </v-btn>
            </v-flex>
            <v-btn color="primary" @click="step = 4">
              提交
            </v-btn>
            <v-flex> </v-flex>
          </v-layout>
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
      showSecondGuardian: false,
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
