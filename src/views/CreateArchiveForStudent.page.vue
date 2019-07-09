<template>
  <div class="wrapper create-archive-for-student-page app-fill-height">
    <Header title="建立学生档案" @back="goBack"></Header>

    <!-- guide card -->
    <div class="pa-2" v-if="showGuideCard">
      <v-card class="pa-2 app-fill-height">
        <v-card-text class="pa-1">
          <p class="app-flex">
            <span class="app-both-center pl-1 grey--text">温馨提示！</span>
          </p>
          <h3 class="title info-collection-guild text-xs-center">
            <span>为了便于学校的档案管理，请尽快完善您的学籍档案！</span>
          </h3>
        </v-card-text>

        <div class="app-both-center">
          <img src="../assets/archive_folder.svg" width="48px" height="150px" />
        </div>

        <v-card-actions class="pt-3">
          <v-layout row wrap justify-center>
            <v-flex xs6 class="text-xs-center">
              <v-btn flat large xs6 @click="goBack">
                <span class="pr-1 grey--text">下次再填</span>
              </v-btn>
            </v-flex>
            <v-flex>
              <v-btn large xs6 color="primary" @click="goToFillForm">
                <span class="pr-1">去填写</span>
                <v-icon>arrow_right_alt </v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </div>

    <!-- success card -->
    <div class="pa-2" v-if="showSuccessCard">
      <v-card class="mb-4 pa-2">
        <img src="../assets/firework.svg" height="120px" width="100%" />
        <div class="app-flex app-h-center app-v-center app-fill-height">
          <div class="text-xs-center">
            <div class="info-collection-success-btn-wrapper">
              <v-icon color="success" size="72">
                check
              </v-icon>
            </div>

            <div class="subheading app-v-center">
              档案已建立！感谢您的支持！
            </div>
          </div>
        </div>
        <v-card-actions class="pt-3">
          <v-layout row wrap justify-center>
            <v-flex xs6 class="text-xs-center">
              <v-btn large xs6 color="accent" @click="goToWorkbenchPage">
                <span class="pr-1">回到首页</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </div>

    <v-stepper v-model="step" v-if="showStepper">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          <span class="py-1">基础信息</span>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">
          <span class="py-1">监护人信息</span>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="step > 3">
          <span class="py-1">学生信息</span>
        </v-stepper-step>

        <!-- <v-divider></v-divider> -->

        <!-- <v-stepper-step step="4" :complete="step >= 4">
          <span class="py-1">完成</span>
        </v-stepper-step> -->
      </v-stepper-header>

      <v-stepper-items>
        <!-- 1 stepper 基础信息 -->
        <v-stepper-content step="1">
          <v-card class="mb-4">
            <v-card-title primary-title class="pt-0">
              <div>
                <h3 class="title mb-0 font-weight-bold">基础信息</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex>
                  <v-text-field
                    :disabled="true"
                    :readonly="true"
                    label="学生姓名"
                    :error-messages="
                      validated && errors.collect('studentName').length > 0
                        ? ['学生姓名未填写']
                        : []
                    "
                    v-model="studentName"
                    v-validate="'required'"
                    name="studentName"
                    :value="firstStudentInfo.studentName"
                    data-vv-as="学生姓名"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    :disabled="true"
                    :readonly="true"
                    label="学生身份证号"
                    :counter="18"
                    maxlength="18"
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
                      validated && errors.collect('birthplace').length > 0
                        ? ['籍贯未填写']
                        : []
                    "
                    v-model="birthplace"
                    v-validate="'required'"
                    name="birthplace"
                    data-vv-as="籍贯"
                    :value="firstStudentInfo.nativePlace"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="民族"
                    :error-messages="
                      validated && errors.collect('nation').length > 0
                        ? ['民族未填写']
                        : []
                    "
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
                      validated && errors.collect('isOnlyChild').length > 0
                        ? ['此项未填写']
                        : []
                    "
                    v-validate="'required'"
                    name="isOnlyChild"
                    data-vv-as="是否为独生子女"
                    row
                  >
                    <v-radio label="是" :value="1"></v-radio>
                    <v-radio label="否" :value="0"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex>
                  <v-radio-group
                    label="是否为留守儿童"
                    v-model="isLeftoverChild"
                    row
                    :error-messages="
                      validated && errors.collect('isLeftoverChild').length > 0
                        ? ['此项未填写']
                        : []
                    "
                    v-validate="'required'"
                    name="isLeftoverChild"
                    data-vv-as="是否为留守儿童"
                  >
                    <v-radio label="是" :value="1"></v-radio>
                    <v-radio label="否" :value="0"></v-radio>
                  </v-radio-group>
                </v-flex>

                <v-flex class="pt-4">
                  <v-textarea
                    rows="3"
                    outline
                    auto-grow
                    label="家庭地址"
                    :error-messages="
                      validated && errors.collect('address').length > 0
                        ? ['家庭地址未填写']
                        : []
                    "
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
            <v-spacer></v-spacer>
            <v-flex xs6 class="px-2">
              <v-btn color="primary" block large @click="goToNextStepper">
                下一步
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <!-- 2 stepper 监护人信息 -->
        <v-stepper-content step="2" v-if="step >= 2">
          <!-- 第一监护人 -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0 font-weight-bold">第一监护人</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex>
                  <v-text-field
                    label="姓名"
                    :error-messages="
                      validated && errors.collect('guardianName').length > 0
                        ? ['姓名未填写']
                        : []
                    "
                    v-model="guardianName"
                    v-validate="'required'"
                    name="guardianName"
                    data-vv-as="姓名"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    label="手机"
                    :error-messages="validated ? errors.collect('phone') : []"
                    v-model="phone"
                    :counter="11"
                    maxlength="11"
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
                    :items="certificateTypeList"
                    label="证件类型"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field
                    v-if="certificateType === '其他'"
                    label="证件类型名称"
                    :error-messages="
                      validated &&
                      errors.collect('certificateTypeName').length > 0
                        ? ['证件类型名称未填写']
                        : []
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
                      validated && !educationBackground ? ['学历未选择'] : []
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
                      validated && errors.collect('profession').length > 0
                        ? ['职业未填写']
                        : []
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
                      validated && !relation ? ['与学生的关系未选择'] : []
                    "
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <!-- 添加第二监护人 btn -->
          <div class="px-3 mb-4 app-flex">
            <v-btn small fab @click="showSecondGuardian = !showSecondGuardian">
              <v-icon color="primary" v-if="showSecondGuardian">remove</v-icon>
              <v-icon color="primary" v-else>add</v-icon>
            </v-btn>
            <div class="app-both-center pr-2">
              <span v-if="showSecondGuardian">移除第二监护人</span>
              <span v-else>添加第二监护人</span>
            </div>
          </div>

          <!-- 第二监护人 -->
          <v-card class="mb-4" v-if="showSecondGuardian">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0 font-weight-bold">第二监护人</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex>
                  <v-text-field
                    label="姓名"
                    :error-messages="
                      validated && errors.collect('guardianName2').length > 0
                        ? ['姓名未填写']
                        : []
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
                    :counter="11"
                    maxlength="11"
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
                    :items="certificateTypeList"
                    label="证件类型"
                  ></v-select>
                </v-flex>
                <v-flex>
                  <v-text-field
                    v-if="certificateType2 === '其他'"
                    label="证件类型名称"
                    :error-messages="
                      validated &&
                      errors.collect('certificateTypeName2').length > 0
                        ? ['证件类型名称未填写']
                        : []
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
                      certificateType2 === '身份证'
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
                      validated && !educationBackground2 ? ['学历未选择'] : []
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
                      validated && errors.collect('profession2').length > 0
                        ? ['职业未填写']
                        : []
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
                      validated && !relation2 ? ['与学生的关系未选择'] : []
                    "
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <!-- 家庭扩展信息 -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0 font-weight-bold">家庭扩展信息</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex class="py-3">
                  <h3>1. 您的孩子上下学主要由谁接送？</h3>
                  <v-select
                    v-model="pickupPerson"
                    :items="pickupPersonList"
                    item-text="text"
                    item-value="value"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="pickupPerson"
                    data-vv-as="接送人"
                    :error-messages="
                      validated && !pickupPerson ? ['此项未选择'] : []
                    "
                  ></v-select>
                </v-flex>
                <v-flex class="py-3">
                  <h3>2. 您的家庭结构？（现居住状况）</h3>
                  <v-select
                    v-model="familyStructure"
                    :items="familyStructureList"
                    item-text="text"
                    item-value="value"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="familyStructure"
                    data-vv-as="家庭结构"
                    :error-messages="
                      validated && !familyStructure ? ['此项未选择'] : []
                    "
                  ></v-select>
                </v-flex>
                <v-flex class="py-3">
                  <h3>3. 您的家庭有阅读习惯吗？</h3>
                  <v-select
                    v-model="readingBehaviour"
                    :items="readingBehaviourList"
                    item-text="text"
                    item-value="value"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="readingBehaviour"
                    data-vv-as="阅读习惯"
                    :error-messages="
                      validated && !readingBehaviour ? ['此项未选择'] : []
                    "
                  ></v-select>
                </v-flex>
                <v-flex class="py-3">
                  <h3>4. 父亲辅导或陪护孩子的时间？</h3>
                  <v-select
                    v-model="fatherCompanyTime"
                    :items="fatherCompanyTimeList"
                    item-text="text"
                    item-value="value"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="fatherCompanyTime"
                    data-vv-as="父亲陪伴时间"
                    :error-messages="
                      validated && !fatherCompanyTime ? ['此项未选择'] : []
                    "
                  ></v-select>
                </v-flex>

                <v-flex v-if="isNewStudent" class="py-3">
                  <h3>5. 您是否愿意加入家委会？</h3>
                  <v-radio-group
                    v-model="isWillingJoinInParentsCommittee"
                    :error-messages="
                      validated &&
                      errors.collect('isWillingJoinInParentsCommittee').length >
                        0
                        ? ['此项未选择']
                        : []
                    "
                    v-validate="'required'"
                    name="isWillingJoinInParentsCommittee"
                    data-vv-as="是否愿意加入家委会"
                    row
                  >
                    <v-radio label="是" :value="1"></v-radio>
                    <v-radio label="否" :value="0"></v-radio>
                  </v-radio-group>
                  <v-select
                    v-if="isWillingJoinInParentsCommittee"
                    v-model="parentsCommitteeRole"
                    :items="parentsCommitteeRoleList"
                    item-text="text"
                    item-value="value"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="parentsCommitteeRole"
                    data-vv-as="请选择家委会角色"
                    :error-messages="
                      validated && !parentsCommitteeRole ? ['此项未选择'] : []
                    "
                  ></v-select>
                </v-flex>

                <v-flex>
                  <h3 class="pb-2">
                    <span v-if="isNewStudent">6</span> <span v-else>5</span>.
                    如果学校或班级需要您的帮助，您能提供哪些优势资源？
                  </h3>
                  <v-textarea
                    v-model="guardianResource"
                    class="guardian-resource"
                    outline
                    rows="4"
                    auto-grow
                    placeholder="例：广告资源、教育资源、医院资源、农家乐资源、会务资源、旅游资源......  类型不限,只要有优势都可以。"
                    v-validate="'required'"
                    name="guardianResource"
                    data-vv-as="可提供的优势资源"
                    :error-messages="
                      validated && !guardianResource ? ['此项未填写'] : []
                    "
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <v-layout row wrap class="text-xs-center pa-4">
            <v-flex class="px-2">
              <v-btn flat block large @click="step = 1">
                上一步
              </v-btn>
            </v-flex>

            <v-flex class="px-2">
              <v-btn block color="primary" large @click="goToNextStepper">
                下一步
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <!-- 3 stepper 学生基础信息 -->
        <v-stepper-content step="3" v-if="step >= 3">
          <!-- 学生信息 -->
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0 font-weight-bold">学生扩展信息</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout row nowrap>
                <v-flex class="pr-3">
                  <v-text-field
                    v-model="height"
                    type="number"
                    label="身高"
                    suffix="厘米"
                    v-validate="'required'"
                    name="height"
                    data-vv-as="身高"
                    :error-messages="
                      validated && errors.collect('height').length > 0
                        ? ['身高未填写']
                        : []
                    "
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    v-model="weight"
                    type="number"
                    label="体重"
                    suffix="公斤"
                    v-validate="'required'"
                    name="weight"
                    data-vv-as="体重"
                    :error-messages="
                      validated && errors.collect('weight').length > 0
                        ? ['体重未填写']
                        : []
                    "
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row nowrap>
                <v-flex xs6 class="pr-3">
                  <v-select
                    v-model="visionLevel"
                    :items="visionLevelList"
                    label="视力"
                    v-validate="'required'"
                    name="visionLevel"
                    data-vv-as="视力"
                    :error-messages="
                      validated && !visionLevel ? ['视力未选择'] : []
                    "
                  ></v-select>
                </v-flex>
              </v-layout>

              <v-layout
                row
                nowrap
                v-if="visionLevel !== 1 && visionLevel !== 0"
              >
                <v-flex class="pr-3">
                  <v-flex class="pr-3">
                    <v-select
                      v-model="visionScoreLeftEye"
                      :items="visionScoreList"
                      label="左眼/五分记法"
                      v-validate="'required'"
                      name="visionScoreLeftEye"
                      data-vv-as="左眼视力"
                      :error-messages="
                        validated && !visionScoreLeftEye
                          ? ['左眼视力未选择']
                          : []
                      "
                    ></v-select>
                  </v-flex>
                </v-flex>
                <v-flex>
                  <v-flex>
                    <v-select
                      v-model="visionScoreRightEye"
                      :items="visionScoreList"
                      label="右眼/五分记法"
                      v-validate="'required'"
                      name="visionScoreRightEye"
                      data-vv-as="右眼视力"
                      :error-messages="
                        validated && !visionScoreRightEye
                          ? ['右眼视力未选择']
                          : []
                      "
                    ></v-select>
                  </v-flex>
                </v-flex>
              </v-layout>

              <v-layout row nowrap>
                <v-flex class="pr-3">
                  <v-flex class="pr-3">
                    <v-select
                      v-model="sleepAtTime"
                      :items="sleepAtTimeList"
                      label="睡觉"
                      v-validate="'required'"
                      name="sleepAtTime"
                      data-vv-as="睡觉时间"
                      :error-messages="
                        validated && !sleepAtTime ? ['睡觉时间未选择'] : []
                      "
                    ></v-select>
                  </v-flex>
                </v-flex>
                <v-flex>
                  <v-flex>
                    <v-select
                      v-model="getUpAtTime"
                      :items="getUpAtTimeList"
                      label="起床"
                      v-validate="'required'"
                      name="getUpAtTime"
                      data-vv-as="起床时间"
                      :error-messages="
                        validated && !getUpAtTime ? ['起床时间未选择'] : []
                      "
                    ></v-select>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <!-- 学生扩展信息 -->
          <v-card class="mb-4">
            <!-- <v-card-title primary-title>
              <div>
                <h3 class="title mb-0 font-weight-bold">学生扩展信息</h3>
              </div>
            </v-card-title> -->

            <v-card-text>
              <v-layout column nowrap>
                <v-flex class="py-3">
                  <h3>1. 孩子性格怎样？</h3>
                  <v-select
                    v-model="personality"
                    :items="personalityList"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="personality"
                    :error-messages="
                      validated && !personality ? ['此项未选择'] : []
                    "
                  ></v-select>
                </v-flex>
                <v-flex class="py-3">
                  <h3>2. 孩子会主动收拾玩具，并归类放好吗?</h3>
                  <v-select
                    v-model="doUp"
                    :items="doUpList"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="doUp"
                    :error-messages="validated && !doUp ? ['此项未选择'] : []"
                  ></v-select>
                </v-flex>
                <v-flex class="py-3">
                  <h3>3. 家庭作业完成时间？</h3>
                  <v-select
                    v-model="homeworkFinishTime"
                    :items="homeworkFinishTimeList"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="homeworkFinishTime"
                    :error-messages="
                      validated && !homeworkFinishTime ? ['此项未选择'] : []
                    "
                  ></v-select>
                </v-flex>
                <v-flex class="py-3">
                  <h3 class="pb-2">4. 课外主要去培训机构补习什么？</h3>
                  <v-textarea
                    v-model="trainingSubject"
                    class="app-textarea"
                    outline
                    rows="3"
                    auto-grow
                    placeholder="例如：语文、数学、音乐、篮球、书法..."
                    v-validate="'required'"
                    name="trainingSubject"
                    :error-messages="
                      validated && !trainingSubject ? ['此项未填写'] : []
                    "
                  ></v-textarea>
                </v-flex>
                <v-flex class="py-3">
                  <h3>5. 孩子接触电子设备时间（电视、手机、平板、）？</h3>
                  <v-select
                    v-model="touchElectronicDeviceTime"
                    :items="touchElectronicDeviceTimeList"
                    placeholder="请选择"
                    v-validate="'required'"
                    name="touchElectronicDeviceTime"
                    :error-messages="
                      validated && !touchElectronicDeviceTime
                        ? ['此项未选择']
                        : []
                    "
                  ></v-select>
                </v-flex>
                <v-flex class="py-3" v-if="isNewStudent">
                  <h3 class="pb-2">6. 曾上过的幼儿园名称？</h3>
                  <v-textarea
                    v-model="kindergarten"
                    class="kindergarten-name"
                    outline
                    rows="2"
                    auto-grow
                    placeholder="输入全称，例如：成都市天府新区红太阳幼儿园"
                    v-validate="'required'"
                    name="kindergarten"
                    :error-messages="
                      validated && !kindergarten ? ['此项未填写'] : []
                    "
                  ></v-textarea>
                </v-flex>
                <v-flex class="py-3" v-if="isNewStudent">
                  <h3>7. 孩子是否在校吃午餐？</h3>
                  <v-radio-group
                    v-model="isEatLunchAtSchool"
                    :error-messages="
                      validated &&
                      errors.collect('isEatLunchAtSchool').length > 0
                        ? ['此项未选择']
                        : []
                    "
                    v-validate="'required'"
                    name="isEatLunchAtSchool"
                    data-vv-as="是否在校吃午餐"
                    row
                  >
                    <v-radio label="是" :value="1"></v-radio>
                    <v-radio label="否" :value="0"></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex class="py-3" v-if="isNewStudent">
                  <h3>8. 孩子曾患过哪种疾病？</h3>
                  <v-select
                    class="app-chips"
                    v-model="disease"
                    :items="diseaseList"
                    item-value="text"
                    attach
                    chips
                    multiple
                    deletable-chips
                    placeholder="请选择"
                    v-validate="'required'"
                    name="disease"
                    :error-messages="
                      validated && disease.length < 1 ? ['此项未选择'] : []
                    "
                  ></v-select>
                </v-flex>
                <v-flex class="py-3" v-if="isNewStudent">
                  <h3 class="pb-2">9. 孩子对哪些食物、药物过敏？</h3>
                  <v-textarea
                    v-model="allergy"
                    class="app-textarea"
                    outline
                    rows="3"
                    auto-grow
                    v-validate="'required'"
                    :error-messages="
                      validated && !allergy ? ['此项未填写'] : []
                    "
                    name="allergy"
                    data-vv-as="此项"
                  ></v-textarea>
                </v-flex>
                <v-flex class="py-3" v-if="isNewStudent">
                  <h3 class="pb-2">10. 孩子兴趣、爱好、特长？有哪些不足？</h3>
                  <v-textarea
                    v-model="speciality"
                    class="app-textarea"
                    outline
                    rows="3"
                    auto-grow
                    v-validate="'required'"
                    :error-messages="
                      validated && !speciality ? ['此项未填写'] : []
                    "
                    name="speciality"
                    data-vv-as="此项"
                  ></v-textarea>
                </v-flex>
                <v-flex class="py-3">
                  <h3 class="pb-2">
                    <span v-if="isNewStudent">11</span>
                    <span v-else>6</span>
                    <span> .您对孩子教育期望？</span>
                  </h3>
                  <v-textarea
                    v-model="expectation"
                    class="app-textarea"
                    outline
                    rows="3"
                    auto-grow
                    v-validate="'required'"
                    :error-messages="
                      validated && !expectation ? ['此项未填写'] : []
                    "
                    name="expectation"
                    data-vv-as="此项"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>

          <v-layout row wrap class="text-xs-center pa-4">
            <v-flex class="px-2">
              <v-btn flat block large @click="step = 2">
                上一步
              </v-btn>
            </v-flex>
            <v-flex class="px-2">
              <v-btn color="primary" block large @click="submit">
                提交
              </v-btn>
            </v-flex>
          </v-layout>
        </v-stepper-content>

        <!-- 4 step 完成 -->
        <!-- <v-stepper-content step="4" v-if="step >= 4">
          <v-card flat class="mb-4">
            <img src="../assets/firework.svg" height="120px" width="100%" />
            <div class="app-flex app-h-center app-v-center app-fill-height">
              <div class="text-xs-center">
                <v-icon color="success" size="72">check</v-icon>
                <div class="subheading app-v-center">
                  恭喜您，信息录入完成了！谢谢您的支持！
                </div>
              </div>
            </div>
          </v-card>

          <div class="text-xs-center pa-4">
            <div class="text-xs-center px-2">
              <v-btn color="accent" large block @click="goToHomePage">
                回到首页
              </v-btn>
            </div>
          </div>
        </v-stepper-content> -->
      </v-stepper-items>
    </v-stepper>

    <v-snackbar
      :top="true"
      v-model="showSnackbar"
      :color="color"
      :timeout="2000"
    >
      {{ message }}
      <v-btn dark flat @click="showSnackbar = false">
        关闭
      </v-btn>
    </v-snackbar>
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
import { snackbarMixin } from '../mixins/snackbar.mixin'
import { get } from 'vuex-pathify'
import { authModulePath, roleRoute } from '../store/auth/auth.paths'

export default Vue.extend({
  mixins: [snackbarMixin],
  components: { Header },
  data: function() {
    return {
      showGuideCard: true,
      showSuccessCard: false,
      showStepper: false,
      ID_CARD_REG: ID_CARD_REG,
      PHONE_NUMBER_REG: PHONE_NUMBER_REG,
      step: 1,
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
      educationBackgroundList: [
        {
          value: 1,
          text: '大专及以下'
        },
        {
          value: 2,
          text: '本科'
        },
        {
          value: 3,
          text: '硕士'
        },
        {
          value: 4,
          text: '博士'
        }
      ],
      educationBackground: 0,
      profession: '',
      relation: 0,
      // 第二监护人
      guardianName2: '',
      phone2: '',
      certificateType2: '身份证',
      certificateTypeName2: '',
      certificateNumber2: '',
      educationBackground2: 0,
      profession2: '',
      relation2: 0,
      // 家庭扩展信息
      pickupPersonList: [
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
        },
        {
          value: 7,
          text: '其他'
        }
      ],
      pickupPerson: 0,
      familyStructureList: [
        {
          value: 1,
          text: '三代同堂（父母与子女）'
        },
        {
          value: 2,
          text: '核心家庭（自己与子女）'
        },
        {
          value: 3,
          text: '其他类型'
        }
      ],
      familyStructure: 0,
      readingBehaviourList: [
        {
          value: 1,
          text: '每天阅读'
        },
        {
          value: 2,
          text: '每周两、三次'
        },
        {
          value: 3,
          text: '偶尔'
        },
        {
          value: 4,
          text: '基本不读'
        }
      ],
      readingBehaviour: 0,
      fatherCompanyTimeList: [
        {
          value: 1,
          text: '每天小于10分钟'
        },
        {
          value: 2,
          text: '每天大于1个小时'
        },
        {
          value: 3,
          text: '每周1-2小时'
        },
        {
          value: 4,
          text: '每月1-2小时'
        }
      ],
      fatherCompanyTime: 0,
      guardianResource: '',
      isWillingJoinInParentsCommittee: null,
      parentsCommitteeRoleList: [
        {
          value: 1,
          text: '会长'
        },
        {
          value: 2,
          text: '副会长'
        },
        {
          value: 3,
          text: '采购家委'
        },
        {
          value: 4,
          text: '财务家委'
        },
        {
          value: 5,
          text: '文娱家委'
        },
        {
          value: 6,
          text: '信息技术'
        }
      ],
      parentsCommitteeRole: 0,
      // 学生信息
      height: null,
      weight: null,
      visionLevelList: [
        {
          value: 1,
          text: '正常'
        },
        {
          value: 2,
          text: '近视'
        },
        {
          value: 3,
          text: '闪光'
        },
        {
          value: 4,
          text: '弱视'
        }
      ],
      visionLevel: 0,
      visionScoreList: [
        '4.0',
        '4.1',
        '4.2',
        '4.3',
        '4.4',
        '4.5',
        '4.6',
        '4.7',
        '4.8',
        '4.9',
        '5.0',
        '5.1',
        '5.2'
      ],
      visionScoreLeftEye: '',
      visionScoreRightEye: '',
      sleepAtTimeList: [
        {
          value: 1,
          text: '20:30-21:00'
        },
        {
          value: 2,
          text: '21:00-21:30'
        },
        {
          value: 3,
          text: '21:30-22:00'
        },
        {
          value: 4,
          text: '22:00以后'
        }
      ],
      sleepAtTime: 0,
      getUpAtTimeList: [
        {
          value: 1,
          text: '6:30前'
        },
        {
          value: 2,
          text: '6:30-6:50'
        },
        {
          value: 3,
          text: '6:50-7:10'
        },
        {
          value: 4,
          text: '7:10-7:30'
        },
        {
          value: 5,
          text: '7:30以后'
        }
      ],
      getUpAtTime: 0,
      personalityList: [
        {
          value: 1,
          text: '活跃'
        },
        {
          value: 2,
          text: '腼腆'
        },
        {
          value: 3,
          text: '好动'
        },
        {
          value: 4,
          text: '文静'
        }
      ],
      personality: 0,
      doUpList: [
        {
          value: 1,
          text: '主动收拾'
        },
        {
          value: 2,
          text: '需要提醒'
        },
        {
          value: 3,
          text: '不会'
        }
      ],
      doUp: 0,
      homeworkFinishTimeList: [
        {
          value: 1,
          text: '18:00前'
        },
        {
          value: 2,
          text: '19:00前'
        },
        {
          value: 3,
          text: '20:00前'
        },
        {
          value: 4,
          text: '21:00前'
        },
        {
          value: 5,
          text: '22:00前'
        }
      ],
      homeworkFinishTime: 0,
      trainingSubject: '',
      touchElectronicDeviceTimeList: [
        {
          value: 1,
          text: '几乎不接触'
        },
        {
          value: 2,
          text: '单次小于10分钟，且每周小于3次'
        },
        {
          value: 3,
          text: '单次小于30分钟，且每周小于5次'
        },
        {
          value: 4,
          text: '单次大于30分钟，且每周大于5次'
        }
      ],
      touchElectronicDeviceTime: 0,
      kindergarten: '',
      isEatLunchAtSchool: null,
      diseaseList: [
        {
          value: 1,
          text: '无'
        },
        {
          value: 2,
          text: '水痘'
        },
        {
          value: 3,
          text: '皮肤病'
        },
        {
          value: 4,
          text: '肝炎'
        },
        {
          value: 5,
          text: '肺炎'
        },
        {
          value: 6,
          text: '哮喘'
        },
        {
          value: 7,
          text: '胃病'
        },
        {
          value: 8,
          text: '骨折'
        },
        {
          value: 9,
          text: '癫痫'
        },
        {
          value: 10,
          text: '荨麻疹'
        },
        {
          value: 11,
          text: '其他'
        }
      ],
      disease: [] as string[],
      allergy: '',
      speciality: '',
      expectation: '',
      unfinishedInfoCollectionList: [] as UnfinishedInfoCollection[]
    }
  },
  computed: {
    ...get(authModulePath, {
      roleRoute
    }),
    firstStudentInfo() {
      const that: any = this
      const unfinishedInfoCollectionList = that.unfinishedInfoCollectionList as UnfinishedInfoCollection[]

      const studentInfoCollection = unfinishedInfoCollectionList.filter(
        studentInfo => studentInfo.userType === InfoCollectionUserTypes.Student
      )[0]

      const firstStudentInfo: AddStudentAndParentsInfoCollectionParams =
        studentInfoCollection &&
        studentInfoCollection.entity &&
        studentInfoCollection.entity[0]

      console.log('TCL: firstStudentInfo -> firstStudentInfo', firstStudentInfo)

      return (
        firstStudentInfo || ({} as AddStudentAndParentsInfoCollectionParams)
      )
    },
    isNewStudent() {
      const firstStudentInfo = this
        .firstStudentInfo as AddStudentAndParentsInfoCollectionParams
      const infoCollectionStudentType = firstStudentInfo.studentType

      console.log(
        'TCL: isNewStudent -> infoCollectionStudentType',
        infoCollectionStudentType
      )

      return infoCollectionStudentType === InfoCollectionStudentTypes.NewStudent
        ? true
        : false
    }
  },
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
    goToWorkbenchPage() {
      const that: any = this
      this.$router.push({
        path: `/workbench/${that.roleRoute}`
      })
    },
    goToFillForm() {
      this.showGuideCard = false
      this.showStepper = true
    },
    goToNextStepper() {
      const that: any = this
      this.$validator.validate().then(valid => {
        console.log('TCL: goToNextStepper -> valid', valid)
        this.validated = true

        if (valid) {
          this.step = this.step + 1
          this.validated = false
        } else {
          that.showFailMessage('您有未完成的选项！')
        }
      })
    },
    fillForm() {
      const that: any = this
      const firstStudentInfo = that.firstStudentInfo as AddStudentAndParentsInfoCollectionParams
      const firstGuardian =
        (firstStudentInfo.parents && firstStudentInfo.parents[0]) ||
        ({} as Parent)
      const secondGuardian =
        (firstStudentInfo.parents && firstStudentInfo.parents[1]) ||
        ({} as Parent)

      // show secondGuardian inputs if has secondGuardian
      if (secondGuardian.parentsName) {
        this.showSecondGuardian = true
      }

      // 基本信息
      this.studentIdCard = firstStudentInfo.childIdCard
      this.studentName = firstStudentInfo.childName
      this.birthplace = firstStudentInfo.nativePlace
      this.nation = firstStudentInfo.nation
      this.isOnlyChild = firstStudentInfo.onlyChild
      this.isLeftoverChild = firstStudentInfo.stayHomeChild
      this.address = firstStudentInfo.homeAddress
      // 第一监护人信息
      this.guardianName = firstGuardian.parentsName
      this.phone = firstGuardian.phone

      console.log(
        'TCL: fillForm -> firstGuardian.papersType',
        firstGuardian.papersType
      )

      if (firstGuardian.papersType === '身份证') {
        console.log('uuuuuuuuuuu')
        this.certificateType = firstGuardian.papersType
      } else {
        this.certificateType = '其他'
        this.certificateTypeName = firstGuardian.papersType
      }

      this.certificateNumber = firstGuardian.parentsIdCard
      this.educationBackground = firstGuardian.educationDiploma
      this.profession = firstGuardian.professionPosition
      this.relation = firstGuardian.withStudentRelation

      // 第二监护人信息
      this.guardianName2 = secondGuardian.parentsName
      this.phone2 = secondGuardian.phone

      if (secondGuardian.papersType === '身份证') {
        this.certificateType2 = secondGuardian.papersType
      } else {
        this.certificateType2 = '其他'
        this.certificateTypeName2 = secondGuardian.papersType
      }

      this.certificateNumber2 = secondGuardian.parentsIdCard
      this.educationBackground2 = secondGuardian.educationDiploma
      this.profession2 = secondGuardian.professionPosition
      this.relation2 = secondGuardian.withStudentRelation
      // 家庭扩展信息
      this.pickupPerson = firstStudentInfo.majorConvoy
      this.familyStructure = firstStudentInfo.familyConstruction
      this.readingBehaviour = firstStudentInfo.readHabit
      this.fatherCompanyTime = firstStudentInfo.fatherAccompany
      this.isWillingJoinInParentsCommittee = firstStudentInfo.parentCommittee
      this.parentsCommitteeRole = firstStudentInfo.committeePosition
      this.guardianResource = firstStudentInfo.resource
      // 学生信息
      this.height = firstStudentInfo.height
      this.weight = firstStudentInfo.weight
      this.visionLevel = firstStudentInfo.eyesight
      this.visionScoreLeftEye = firstStudentInfo.leftEye
      this.visionScoreRightEye = firstStudentInfo.rightEye
      this.sleepAtTime = firstStudentInfo.sleepTime
      this.getUpAtTime = firstStudentInfo.getUpTime
      // 学生扩展信息
      this.personality = firstStudentInfo.characterChild
      this.doUp = firstStudentInfo.cleanToy
      this.homeworkFinishTime = firstStudentInfo.homeworkFinish
      this.trainingSubject = firstStudentInfo.extraTutoringContent
      this.touchElectronicDeviceTime = firstStudentInfo.touchPhoneTime
      this.kindergarten = firstStudentInfo.kindergarten
      this.isEatLunchAtSchool = firstStudentInfo.lunchAtSchool
      this.disease = firstStudentInfo.sickenIllness || []
      this.allergy = firstStudentInfo.foodAndMedicineAllergy
      this.speciality = firstStudentInfo.trait
      this.expectation = firstStudentInfo.hope
    },
    submit() {
      const that: any = this
      this.$validator.validate().then(valid => {
        console.log('TCL: valid', valid)
        this.validated = true

        if (valid) {
          console.log('post backend api')

          const params = {} as AddStudentAndParentsInfoCollectionParams

          const firstStudentInfo = that.firstStudentInfo as AddStudentAndParentsInfoCollectionParams

          // 学生类型
          params.studentType = firstStudentInfo.studentType
          // 基本信息
          params.childIdCard = this.studentIdCard
          params.childName = this.studentName
          params.nativePlace = this.birthplace
          params.nation = this.nation
          params.onlyChild = this.isOnlyChild
          params.stayHomeChild = this.isLeftoverChild
          params.homeAddress = this.address
          // 第一监护人信息
          const firstGuardian = {} as Parent
          firstGuardian.parentsName = this.guardianName
          firstGuardian.phone = this.phone

          if (this.certificateType === '其他') {
            firstGuardian.papersType = this.certificateTypeName
          } else {
            firstGuardian.papersType = this.certificateType
          }

          firstGuardian.parentsIdCard = this.certificateNumber
          firstGuardian.educationDiploma = this.educationBackground
          firstGuardian.professionPosition = this.profession
          firstGuardian.withStudentRelation = this.relation

          // 第二监护人信息
          const secondGuardian = {} as Parent
          secondGuardian.parentsName = this.guardianName2
          secondGuardian.phone = this.phone2

          // 第二监护人信息
          this.guardianName2 = secondGuardian.parentsName
          this.phone2 = secondGuardian.phone

          if (this.certificateType2 === '其他') {
            secondGuardian.papersType = this.certificateTypeName2
          } else {
            secondGuardian.papersType = this.certificateType2
          }

          secondGuardian.parentsIdCard = this.certificateNumber2

          secondGuardian.parentsIdCard = this.certificateNumber2
          secondGuardian.educationDiploma = this.educationBackground2
          secondGuardian.professionPosition = this.profession2
          secondGuardian.withStudentRelation = this.relation2
          // set parents
          params.parents = this.showSecondGuardian
            ? [firstGuardian, secondGuardian]
            : [firstGuardian]

          // 家庭扩展信息
          params.majorConvoy = this.pickupPerson
          params.familyConstruction = this.familyStructure
          params.readHabit = this.readingBehaviour
          params.fatherAccompany = this.fatherCompanyTime
          params.parentCommittee = this.isWillingJoinInParentsCommittee
          params.committeePosition = this.parentsCommitteeRole
          params.resource = this.guardianResource
          // 学生信息
          params.height = this.height
          params.weight = this.weight
          params.eyesight = this.visionLevel
          params.leftEye = this.visionScoreLeftEye
          params.rightEye = this.visionScoreRightEye
          params.sleepTime = this.sleepAtTime
          params.getUpTime = this.getUpAtTime
          // 学生扩展信息
          params.characterChild = this.personality
          params.cleanToy = this.doUp
          params.homeworkFinish = this.homeworkFinishTime
          params.extraTutoringContent = this.trainingSubject
          params.touchPhoneTime = this.touchElectronicDeviceTime
          params.kindergarten = this.kindergarten
          params.lunchAtSchool = this.isEatLunchAtSchool
          params.sickenIllness = this.disease
          params.foodAndMedicineAllergy = this.allergy
          params.trait = this.speciality
          params.hope = this.expectation

          console.log('TCL: submit -> params', params)

          archiveService
            .addStudentAndParentsInfoCollection(params)
            .then(res => {
              console.log(
                'TCL: addStudentAndParentsInfoCollection submit -> res',
                res
              )

              if (res.data.content) {
                this.showSuccessCard = true
                this.showStepper = false
              } else {
                const message = res.data.errorMsg
                  ? res.data.errorMsg
                  : '出现未知错误，请稍后再试！'
                that.showFailMessage(message)
              }
            })
        } else {
          that.showFailMessage('您有未完成的选项！')
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

<style lang="scss" scoped>
.info-collection-success-btn-wrapper {
  position: relative;
  padding-bottom: 24px;
}

.info-collection-guild {
  line-height: 3rem !important;
}
</style>
