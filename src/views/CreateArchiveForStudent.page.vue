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
          <div class="py-1">监护人信息</div>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="step > 3">
          <div class="py-1">学生信息</div>
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
                <v-flex>
                  <v-text-field
                    label="姓名"
                    :error-messages="
                      validated ? errors.collect('studentName') : []
                    "
                    v-model="studentName"
                    v-validate="'required'"
                    name="studentName"
                    data-vv-as="名字"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="学生身份证号码"
                    persistent-hint
                    :error-messages="
                      validated ? errors.collect('studentIdCard') : []
                    "
                    v-model="studentIdCard"
                    v-validate="{
                      required: true,
                      length: 18,
                      regex: ID_CARD_REG
                    }"
                    name="studentIdCard"
                    data-vv-as="身份证号"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="籍贯"
                    :error-messages="
                      validated ? errors.collect('birthplace') : []
                    "
                    v-model="birthplace"
                    v-validate="'required'"
                    name="birthplace"
                    data-vv-as="籍贯"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="民族"
                    :error-messages="validated ? errors.collect('nation') : []"
                    v-model="nation"
                    v-validate="'required'"
                    name="nation"
                    data-vv-as="民族"
                  ></v-text-field>
                </v-flex>

                <v-flex>
                  <v-radio-group
                    label="是否为独生子女"
                    v-model="isOnlyChild"
                    :error-messages="
                      validated ? errors.collect('isOnlyChild') : []
                    "
                    v-validate="'required'"
                    name="isOnlyChild"
                    data-vv-as="是否为独生子女"
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
                    :hide-details="true"
                    :error-messages="
                      validated ? errors.collect('isLeftoverChild') : []
                    "
                    v-validate="'required'"
                    name="isLeftoverChild"
                    data-vv-as="是否为留守儿童"
                  >
                    <v-radio label="是" :value="true"></v-radio>
                    <v-radio label="否" :value="false"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex class="pt-4">
                  <v-textarea
                    rows="3"
                    outline
                    auto-grow
                    label="家庭地址"
                    :error-messages="validated ? errors.collect('address') : []"
                    v-model="address"
                    v-validate="'required'"
                    name="address"
                    data-vv-as="家庭地址"
                  ></v-textarea>
                </v-flex>
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
                  <v-text-field
                    label="姓名"
                    :error-messages="
                      validated ? errors.collect('guardianName') : []
                    "
                    v-model="guardianName"
                    v-validate="'required'"
                    name="guardianName"
                    data-vv-as="姓名"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="电话"
                    :error-messages="validated ? errors.collect('phone') : []"
                    v-model="phone"
                    v-validate="{
                      required: true,
                      length: 11,
                      regex: PHONE_NUMBER_REG
                    }"
                    name="phone"
                    data-vv-as="电话"
                  ></v-text-field>
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
                    :error-messages="
                      validated ? errors.collect('certificateTypeName') : []
                    "
                    v-model="certificateTypeName"
                    v-validate="'required'"
                    name="certificateTypeName"
                    data-vv-as="证件类型名称"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="证件号码"
                    :error-messages="
                      validated ? errors.collect('certificateNumber') : []
                    "
                    v-model="certificateNumber"
                    v-validate="
                      certificateType === '身份证'
                        ? {
                            required: true,
                            length: 18,
                            regex: ID_CARD_REG
                          }
                        : { required: true }
                    "
                    name="certificateNumber"
                    data-vv-as="证件号码"
                  ></v-text-field>
                </v-flex>

                <v-flex>
                  <v-select
                    :items="educationBackgroundList"
                    label="学历"
                    :error-messages="
                      validated ? errors.collect('educationBackground') : []
                    "
                    v-model="educationBackground"
                    v-validate="'required'"
                    name="educationBackground"
                    data-vv-as="学历"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="职业"
                    :error-messages="
                      validated ? errors.collect('profession') : []
                    "
                    v-model="profession"
                    v-validate="'required'"
                    name="profession"
                    data-vv-as="职业"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    label="与学生的关系"
                    v-model="relation"
                    :items="relations"
                    item-text="text"
                    item-value="value"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="relation"
                    data-vv-as="与学生的关系"
                    :error-messages="
                      validated && relation === 0 ? ['请选择与学生的关系'] : []
                    "
                  ></v-select>
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
                  <v-text-field
                    label="姓名"
                    :error-messages="
                      validated ? errors.collect('guardianName2') : []
                    "
                    v-model="guardianName2"
                    v-validate="'required'"
                    name="guardianName2"
                    data-vv-as="姓名"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="电话"
                    :error-messages="validated ? errors.collect('phone2') : []"
                    v-model="phone2"
                    v-validate="{
                      required: true,
                      length: 11,
                      regex: PHONE_NUMBER_REG
                    }"
                    name="phone2"
                    data-vv-as="电话"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    v-model="certificateType2"
                    :items="['身份证', '其他']"
                    label="证件类型"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field
                    v-if="certificateType2 === '其他'"
                    label="证件类型名称"
                    :error-messages="
                      validated ? errors.collect('certificateTypeName2') : []
                    "
                    v-model="certificateTypeName2"
                    v-validate="'required'"
                    name="certificateTypeName2"
                    data-vv-as="证件类型名称"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="证件号码"
                    :error-messages="
                      validated ? errors.collect('certificateNumber2') : []
                    "
                    v-model="certificateNumber2"
                    v-validate="
                      certificateType === '身份证'
                        ? {
                            required: true,
                            length: 18,
                            regex: ID_CARD_REG
                          }
                        : { required: true }
                    "
                    name="certificateNumber2"
                    data-vv-as="证件号码"
                  ></v-text-field>
                </v-flex>

                <v-flex>
                  <v-select
                    :items="educationBackgroundList"
                    label="学历"
                    :error-messages="
                      validated ? errors.collect('educationBackground2') : []
                    "
                    v-model="educationBackground2"
                    v-validate="'required'"
                    name="educationBackground2"
                    data-vv-as="学历"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="职业"
                    :error-messages="
                      validated ? errors.collect('profession2') : []
                    "
                    v-model="profession2"
                    v-validate="'required'"
                    name="profession2"
                    data-vv-as="职业"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-select
                    label="与学生的关系"
                    v-model="relation2"
                    :items="relations"
                    item-text="text"
                    item-value="value"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="relation2"
                    data-vv-as="与学生的关系"
                    :error-messages="
                      validated && relation2 === 0 ? ['请选择与学生的关系'] : []
                    "
                  ></v-select>
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

          <v-layout row wrap class="text-xs-center pa-4">
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

        <!-- 4 step 完成 -->
        <v-stepper-content step="4">
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

export default Vue.extend({
  components: { Header },
  data: function() {
    return {
      ID_CARD_REG: ID_CARD_REG,
      PHONE_NUMBER_REG: PHONE_NUMBER_REG,
      step: 2,
      validated: false,
      // 学生基础信息
      isOnlyChild: null,
      isLeftoverChild: null,
      studentName: '',
      studentIdCard: '',
      birthplace: '',
      nation: '',
      address: '',
      // 第一监护人
      relations: [
        {
          value: 1,
          text: '爸爸'
        },
        {
          value: 2,
          text: '妈妈'
        },
        {
          value: 3,
          text: '爷爷'
        },
        {
          value: 4,
          text: '奶奶'
        },
        {
          value: 5,
          text: '外公'
        },
        {
          value: 6,
          text: '外婆'
        }
      ],
      showSecondGuardian: false,
      guardianName: '',
      phone: '',
      certificateTypeList: ['身份证', '其他'],
      certificateType: '身份证',
      certificateTypeName: '',
      certificateNumber: '',
      educationBackgroundList: ['大专以下', '大专', '本科', '硕士', '博士'],
      educationBackground: '',
      profession: '',
      relation: 0,
      // 第二监护人
      guardianName2: '',
      phone2: '',
      certificateType2: '身份证',
      certificateTypeName2: '',
      certificateNumber2: '',
      educationBackground2: '',
      profession2: '',
      relation2: 0
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
    },
    goToNextStepper() {
      this.$validator.validate().then(valid => {
        console.log('TCL: submit -> valid', valid)
        this.validated = true

        if (valid) {
          this.step = this.step + 1
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
