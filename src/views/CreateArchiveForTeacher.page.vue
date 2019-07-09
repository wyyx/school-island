<template>
  <div class="wrapper create-archive-for-teacher-page">
    <Header title="建立老师档案" @back="goBack"></Header>

    <div class="pa-2 my-2" v-if="showGuideCard">
      <v-card class="pa-2">
        <div class="app-both-center">
          <img src="../assets/archive_folder.svg" width="50%" height="250px" />
        </div>
        <v-card-text>
          <h3 class="headline info-collection-guild">
            为了便于学校的档案管理，请尽快完善您的个人档案！
          </h3>
        </v-card-text>
        <v-card-actions class="py-3">
          <v-layout row wrap justify-center>
            <v-flex xs6 class="text-xs-center">
              <v-btn flat large xs6 @click="goBack">
                <span class="pr-1">下次再填</span>
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
    <div class="pa-2 my-2" v-if="showSuccessCard">
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
        <v-card-actions class="py-3">
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
          <span class="py-1">教育背景</span>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="step > 3">
          <span class="py-1">经历与荣誉</span>
        </v-stepper-step>
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
                    label="姓名"
                    :error-messages="
                      validated && errors.collect('name').length > 0
                        ? ['姓名未填写']
                        : []
                    "
                    v-model="name"
                    v-validate="'required'"
                    name="name"
                    data-vv-as="姓名"
                  ></v-text-field>
                </v-flex>

                <v-flex>
                  <v-text-field
                    :disabled="true"
                    :readonly="true"
                    label="身份证号"
                    persistent-hint
                    :error-messages="validated ? errors.collect('idCard') : []"
                    v-model="idCard"
                    v-validate="{
                      required: true,
                      length: 18,
                      regex: ID_CARD_REG
                    }"
                    name="idCard"
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
                    label="政治面貌"
                    v-model="politicsStatus"
                    :error-messages="
                      validated && errors.collect('politicsStatus').length > 0
                        ? ['此项未选择']
                        : []
                    "
                    v-validate="'required'"
                    name="politicsStatus"
                    data-vv-as="政治面貌"
                    row
                  >
                    <v-layout row wrap>
                      <v-flex>
                        <v-radio label="党员" :value="1"></v-radio>
                      </v-flex>
                      <v-flex>
                        <v-radio label="团员" :value="2"></v-radio>
                      </v-flex>
                      <v-flex>
                        <v-radio label="群众" :value="3"></v-radio>
                      </v-flex>
                      <v-flex>
                        <v-radio label="民主党" :value="4"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>

                <v-flex>
                  <v-radio-group
                    label="婚姻状况"
                    v-model="maritalStatus"
                    :error-messages="
                      validated && errors.collect('maritalStatus').length > 0
                        ? ['此项未选择']
                        : []
                    "
                    v-validate="'required'"
                    name="maritalStatus"
                    data-vv-as="婚姻状况"
                    row
                  >
                    <v-layout row wrap>
                      <v-flex class="py-1">
                        <v-radio label="未婚" :value="1"></v-radio>
                      </v-flex>
                      <v-flex class="py-1">
                        <v-radio label="已婚" :value="2"></v-radio>
                      </v-flex>
                      <v-flex class="py-1">
                        <v-radio label="已婚已育" :value="3"></v-radio>
                      </v-flex>
                      <v-flex class="py-1">
                        <v-radio label="离异" :value="4"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-radio-group>
                </v-flex>

                <v-flex class="pt-2">
                  <div class="pb-2 field-title">
                    家庭地址
                  </div>
                  <v-textarea
                    class="app-textarea"
                    rows="2"
                    outline
                    auto-grow
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

                <v-flex>
                  <v-text-field
                    label="个人手机"
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
                    data-vv-as="个人手机"
                  ></v-text-field>
                </v-flex>

                <v-flex>
                  <v-text-field
                    label="紧急联系人"
                    :error-messages="
                      validated && errors.collect('emergencyContact').length > 0
                        ? ['紧急联系人未填写']
                        : []
                    "
                    v-model="emergencyContact"
                    v-validate="'required'"
                    name="emergencyContact"
                    data-vv-as="紧急联系人"
                  ></v-text-field>
                </v-flex>

                <v-flex>
                  <v-text-field
                    label="紧急联系人电话"
                    :error-messages="
                      validated ? errors.collect('emergencyContactPhone') : []
                    "
                    v-model="emergencyContactPhone"
                    :counter="11"
                    maxlength="11"
                    v-validate="{
                      required: true,
                      length: 11,
                      regex: PHONE_NUMBER_REG
                    }"
                    name="emergencyContactPhone"
                    data-vv-as="紧急联系人电话"
                  ></v-text-field>
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

        <!-- 2 stepper 教育背景 -->
        <v-stepper-content step="2" v-if="step >= 2">
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0 font-weight-bold">教育背景</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex>
                  <v-layout row nowrap>
                    <v-flex xs4>
                      <v-select
                        :items="firstDegreeList"
                        label="第一学历"
                        :error-messages="
                          validated && !firstDegree ? ['第一学历未选择'] : []
                        "
                        v-model="firstDegree"
                        v-validate="'required'"
                        name="firstDegree"
                        data-vv-as="第一学历"
                      ></v-select>
                    </v-flex>
                    <v-flex xs8>
                      <v-text-field
                        name="major"
                        placeholder="输入专业"
                        v-model="major"
                        v-validate="'required'"
                        data-vv-as="专业"
                        :error-messages="
                          validated && errors.collect('major').length > 0
                            ? ['专业未填写']
                            : []
                        "
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex>
                  <v-text-field
                    label="毕业院校"
                    :error-messages="
                      validated && errors.collect('university').length > 0
                        ? ['毕业院校未填写']
                        : []
                    "
                    v-model="university"
                    v-validate="'required'"
                    name="university"
                    data-vv-as="毕业院校"
                  ></v-text-field>
                </v-flex>

                <v-flex>
                  <v-layout row nowrap>
                    <v-flex xs4>
                      <v-select
                        :items="highistDegreeList"
                        label="最高学位证"
                        :error-messages="
                          validated && !highistDegree
                            ? ['最高学位证未选择']
                            : []
                        "
                        v-model="highistDegree"
                        v-validate="'required'"
                        name="highistDegree"
                        data-vv-as="最高学位证"
                      ></v-select>
                    </v-flex>
                    <v-flex xs8 v-if="highistDegree !== 1">
                      <v-text-field
                        name="highistDegreeMajor"
                        placeholder="输入专业"
                        v-model="highistDegreeMajor"
                        v-validate="'required'"
                        data-vv-as="最高学位专业"
                        :error-messages="
                          validated &&
                          errors.collect('highistDegreeMajor').length > 0
                            ? ['最高学位专业未填写']
                            : []
                        "
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex v-if="highistDegree !== 0 && highistDegree !== 1">
                  <v-text-field
                    label="毕业院校"
                    :error-messages="
                      validated &&
                      errors.collect('highistDegreeUniversity').length > 0
                        ? ['毕业院校未填写']
                        : []
                    "
                    v-model="highistDegreeUniversity"
                    v-validate="'required'"
                    name="highistDegreeUniversity"
                    data-vv-as="毕业院校"
                  ></v-text-field>
                </v-flex>

                <v-flex v-if="highistDegree !== 0 && highistDegree !== 1">
                  <v-menu
                    ref="graduationDateMenu"
                    v-model="graduationDateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="graduationDate"
                        label="毕业时间"
                        append-icon="event"
                        readonly
                        v-on="on"
                        v-validate="'required'"
                        data-vv-as="毕业时间"
                        name="graduationDate"
                        :error-messages="
                          validated &&
                          errors.collect('graduationDate').length > 0
                            ? ['毕业时间未填写']
                            : []
                        "
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="graduationDate"
                      type="month"
                      no-title
                      scrollable
                      locale="zh-cn"
                      @input="graduationDateMenu = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex>
                  <v-menu
                    ref="workDateMenu"
                    v-model="workDateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="workDate"
                        label="参加工作时间"
                        append-icon="event"
                        readonly
                        v-on="on"
                        v-validate="'required'"
                        data-vv-as="参加工作时间"
                        name="workDate"
                        :error-messages="
                          validated && errors.collect('workDate').length > 0
                            ? ['参加工作时间未填写']
                            : []
                        "
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="workDate"
                      type="month"
                      no-title
                      scrollable
                      locale="zh-cn"
                      @input="workDateMenu = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex>
                  <v-select
                    :items="mandarinLevelList"
                    label="普通话水平"
                    :error-messages="
                      validated && !mandarinLevel ? ['普通话水平未选择'] : []
                    "
                    v-model="mandarinLevel"
                    v-validate="'required'"
                    name="mandarinLevel"
                    data-vv-as="普通话水平"
                  ></v-select>
                </v-flex>

                <v-flex>
                  <v-select
                    :items="englishLevelList"
                    label="英语等级"
                    :error-messages="
                      validated && !englishLevel ? ['英语等级未选择'] : []
                    "
                    v-model="englishLevel"
                    v-validate="'required'"
                    name="englishLevel"
                    data-vv-as="英语等级"
                  ></v-select>
                </v-flex>

                <v-flex>
                  <v-select
                    :items="computerLevelList"
                    label="计算机等级"
                    :error-messages="
                      validated && !computerLevel ? ['计算机等级未选择'] : []
                    "
                    v-model="computerLevel"
                    v-validate="'required'"
                    name="computerLevel"
                    data-vv-as="计算机等级"
                  ></v-select>
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

        <!-- 3 stepper 履历与荣誉 -->
        <v-stepper-content step="3" v-if="step >= 3">
          <v-card class="mb-4">
            <v-card-title primary-title>
              <div>
                <h3 class="title mb-0 font-weight-bold">履历与荣誉</h3>
              </div>
            </v-card-title>

            <v-card-text>
              <v-layout column nowrap>
                <v-flex>
                  <v-select
                    :items="teachingSubjectList"
                    label="任教科目"
                    :error-messages="
                      validated && !teachingSubject ? ['任教科目未选择'] : []
                    "
                    v-model="teachingSubject"
                    v-validate="'required'"
                    name="teachingSubject"
                    data-vv-as="任教科目"
                  ></v-select>
                </v-flex>

                <!-- 工作履历 -->
                <v-flex>
                  <div class="field-title subheading">工作履历</div>
                  <!-- experience card list -->
                  <div
                    v-for="(experienceModelItem,
                    index) in experienceModelItemList"
                    :key="index"
                  >
                    <div
                      class="experience-card-wrapper app-flex py-2"
                      v-if="experienceModelItem['show']"
                    >
                      <v-card flat class="grey lighten-3 pa-2 work-experience">
                        <div class="app-flex">
                          <div class="app-shrink app-both-center pr-3">
                            <h3 class="subheading">{{ index + 1 }}.</h3>
                          </div>
                          <div>
                            <v-layout row nowrap>
                              <v-flex class="pr-3">
                                <v-menu
                                  v-model="experienceModelItem['startDateMenu']"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  lazy
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="experienceModelItem['startDate']"
                                      label="开始时间"
                                      append-icon="event"
                                      readonly
                                      v-on="on"
                                      v-validate="'required'"
                                      data-vv-as="开始时间"
                                      :name="'startDate_' + index"
                                      :error-messages="
                                        validated &&
                                        !experienceModelItem['startDate']
                                          ? ['开始时间未填写']
                                          : []
                                      "
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="experienceModelItem['startDate']"
                                    no-title
                                    scrollable
                                    locale="zh-cn"
                                    type="month"
                                    @input="
                                      experienceModelItem[
                                        'startDateMenu'
                                      ] = false
                                    "
                                  >
                                  </v-date-picker>
                                </v-menu>
                              </v-flex>

                              <v-flex class="pr-3">
                                <v-menu
                                  v-model="experienceModelItem['endDateMenu']"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  lazy
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="experienceModelItem['endDate']"
                                      label="结束"
                                      append-icon="event"
                                      readonly
                                      v-on="on"
                                      v-validate="'required'"
                                      data-vv-as="结束"
                                      :name="'endDate_' + index"
                                      :error-messages="
                                        validated &&
                                        !experienceModelItem['endDate']
                                          ? ['结束未填写']
                                          : []
                                      "
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="experienceModelItem['endDate']"
                                    no-title
                                    scrollable
                                    locale="zh-cn"
                                    type="month"
                                    @input="
                                      experienceModelItem['endDateMenu'] = false
                                    "
                                  >
                                  </v-date-picker>
                                </v-menu>
                              </v-flex>
                            </v-layout>

                            <v-layout row wrap>
                              <v-flex xs12 md6 class="pr-2">
                                <v-text-field
                                  label="学校"
                                  :error-messages="
                                    validated &&
                                    errors.collect('school_' + index).length > 0
                                      ? ['学校未填写']
                                      : []
                                  "
                                  v-model="experienceModelItem['school']"
                                  v-validate="'required'"
                                  :name="'school_' + index"
                                  data-vv-as="学校"
                                ></v-text-field>
                              </v-flex>

                              <v-flex xs12 md6 class="pr-2">
                                <v-text-field
                                  label="任教科目"
                                  :error-messages="
                                    validated &&
                                    errors.collect('teachingSubject_' + index)
                                      .length > 0
                                      ? ['任教科目未填写']
                                      : []
                                  "
                                  v-model="
                                    experienceModelItem['teachingSubject']
                                  "
                                  v-validate="'required'"
                                  :name="'teachingSubject_' + index"
                                  data-vv-as="任教科目"
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                          </div>
                        </div>
                      </v-card>
                      <!-- 切换工作履历btn-->
                      <div
                        class="app-flex app-shrink app-both-center"
                        v-if="experienceModelItem['show']"
                      >
                        <v-btn
                          small
                          fab
                          :disabled="index === 0"
                          class="toggle-show-work-experience-btn"
                          @click="
                            experienceModelItem['show'] = !experienceModelItem[
                              'show'
                            ]
                          "
                        >
                          <v-icon color="primary">remove</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>

                  <!-- 添加工作履历 add experience card btn-->
                  <div class="app-flex py-2 " v-if="hasExtraCard">
                    <v-spacer></v-spacer>
                    <v-btn
                      small
                      fab
                      style="margin: 0px"
                      @click="addExperience"
                      class="add-work-experience-btn"
                    >
                      <v-icon color="primary">add</v-icon>
                    </v-btn>
                  </div>
                </v-flex>

                <v-flex>
                  <v-select
                    :items="theTitleList"
                    label="职称"
                    :error-messages="
                      validated && !theTitle ? ['职称未选择'] : []
                    "
                    v-model="theTitle"
                    v-validate="'required'"
                    name="theTitle"
                    data-vv-as="职称"
                  ></v-select>
                </v-flex>

                <v-flex v-if="theTitle != 0 && theTitle != 1">
                  <v-menu
                    ref="evaluateAtTimeMenu"
                    v-model="evaluateAtTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="evaluateAtTime"
                        label="评定时间"
                        append-icon="event"
                        readonly
                        v-on="on"
                        v-validate="'required'"
                        data-vv-as="评定时间"
                        name="evaluateAtTime"
                        :error-messages="
                          validated &&
                          errors.collect('evaluateAtTime').length > 0
                            ? ['评定时间未填写']
                            : []
                        "
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="evaluateAtTime"
                      no-title
                      scrollable
                      locale="zh-cn"
                      @input="evaluateAtTimeMenu = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex v-if="theTitle != 0 && theTitle != 1">
                  <v-menu
                    ref="hiringTimeMenu"
                    v-model="hiringTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="hiringTime"
                        label="聘用时间"
                        append-icon="event"
                        readonly
                        v-on="on"
                        v-validate="'required'"
                        data-vv-as="聘用时间"
                        name="hiringTime"
                        :error-messages="
                          validated && errors.collect('hiringTime').length > 0
                            ? ['聘用时间未填写']
                            : []
                        "
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="hiringTime"
                      no-title
                      scrollable
                      locale="zh-cn"
                      @input="hiringTimeMenu = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex>
                  <div class="optional-course-title">选修课擅长（非必填）</div>
                  <v-textarea
                    class="app-textarea"
                    v-model="optionalCourse"
                    outline
                    rows="2"
                    auto-grow
                  ></v-textarea>
                </v-flex>

                <v-flex>
                  <div class="self-introduction-title">个人介绍（非必填）</div>
                  <v-textarea
                    class="app-textarea"
                    v-model="selfIntroduction"
                    outline
                    rows="2"
                    auto-grow
                    placeholder="提示：学校介绍老师用"
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
  UnfinishedInfoCollection,
  InfoCollectionUserTypes,
  InfoCollectionStudentTypes,
  Parent,
  AddTeacherInfoCollectionParams,
  WorkExperienceItem
} from '../models/archive.model'
import { snackbarMixin } from '../mixins/snackbar.mixin'
import { get } from 'vuex-pathify'
import { authModulePath, roleRoute } from '../store/auth/auth.paths'

export interface ExperienceModelItem {
  startDateMenu: boolean
  endDateMenu: boolean
  startDate: string
  endDate: string
  school: string
  teachingSubject: string
  show: boolean
}

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
      unfinishedInfoCollectionList: [] as UnfinishedInfoCollection[],
      name: '',
      idCard: '',
      birthplace: '',
      nation: '',
      politicsStatus: null,
      maritalStatus: null,
      address: '',
      phone: '',
      emergencyContact: '',
      emergencyContactPhone: '',
      firstDegreeList: [
        {
          value: 1,
          text: '大专'
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
      firstDegree: 0,
      major: '',
      university: '',
      highistDegreeList: [
        {
          value: 1,
          text: '暂无'
        },
        {
          value: 2,
          text: '学士'
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
      highistDegree: 0,
      highistDegreeMajor: '',
      highistDegreeUniversity: '',
      graduationDateMenu: false,
      graduationDate: null,
      workDateMenu: false,
      workDate: null,
      mandarinLevelList: [
        {
          value: 1,
          text: '一级甲等'
        },
        {
          value: 2,
          text: '一级乙等'
        },
        {
          value: 3,
          text: '二级甲等'
        },
        {
          value: 4,
          text: '二级乙等'
        },
        {
          value: 5,
          text: '三级甲等'
        },
        {
          value: 6,
          text: '三级乙等'
        }
      ],
      mandarinLevel: 0,
      englishLevelList: [
        {
          value: 1,
          text: '三级'
        },
        {
          value: 2,
          text: '四级'
        },
        {
          value: 3,
          text: '六级'
        },
        {
          value: 4,
          text: '七级'
        },
        {
          value: 5,
          text: '八级'
        }
      ],
      englishLevel: 0,
      computerLevelList: [
        {
          value: 1,
          text: '较弱（会处理简单文档）'
        },
        {
          value: 3,
          text: '一般（会日常计算机应用）'
        },
        {
          value: 2,
          text: '良好（可自行处理计算机日常工作）'
        },
        {
          value: 4,
          text: '优秀（熟悉计算机编程）'
        }
      ],
      computerLevel: 0,
      teachingSubjectList: [],
      teachingSubject: '',
      // 工作履历
      experienceModelItemList: [
        {
          startDateMenu: false,
          endDateMenu: false,
          startDate: null,
          endDate: null,
          school: '',
          teachingSubject: '',
          show: true
        },
        {
          startDateMenu: false,
          endDateMenu: false,
          startDate: null,
          endDate: null,
          school: '',
          teachingSubject: '',
          show: false
        },
        {
          startDateMenu: false,
          endDateMenu: false,
          startDate: null,
          endDate: null,
          school: '',
          teachingSubject: '',
          show: false
        },
        {
          startDateMenu: false,
          endDateMenu: false,
          startDate: null,
          endDate: null,
          school: '',
          teachingSubject: '',
          show: false
        },
        {
          startDateMenu: false,
          endDateMenu: false,
          startDate: null,
          endDate: null,
          school: '',
          teachingSubject: '',
          show: false
        }
      ],
      theTitleList: [
        {
          value: 1,
          text: '未评定'
        },
        {
          value: 2,
          text: '中小学二级'
        },
        {
          value: 3,
          text: '中小学一级'
        },
        {
          value: 4,
          text: '中小学高级'
        },
        {
          value: 5,
          text: '中小学正高级'
        }
      ],
      theTitle: 0,
      evaluateAtTimeMenu: false,
      evaluateAtTime: null,
      hiringTimeMenu: false,
      hiringTime: null,
      optionalCourse: '',
      selfIntroduction: ''
    }
  },
  computed: {
    ...get(authModulePath, {
      roleRoute
    }),
    teacherInfo() {
      const that: any = this
      const unfinishedInfoCollectionList = that.unfinishedInfoCollectionList as UnfinishedInfoCollection[]

      const teacherInfoCollection = unfinishedInfoCollectionList.filter(
        info => info.userType === InfoCollectionUserTypes.Teacher
      )[0]
      console.log(
        'TCL: teacherInfo -> teacherInfoCollection',
        teacherInfoCollection
      )

      const teacherInfo: AddTeacherInfoCollectionParams =
        teacherInfoCollection &&
        teacherInfoCollection.entity &&
        teacherInfoCollection.entity[0]

      return teacherInfo || ({} as AddTeacherInfoCollectionParams)
    },
    hasExtraCard() {
      const that: any = this
      const experienceModelItemList = that.experienceModelItemList as ExperienceModelItem[]
      const cardToShow = experienceModelItemList.find(
        item => item.show === false
      )
      return cardToShow ? true : false
    }
  },
  created() {
    this.getUnfinishedInfoCollection()
    this.loadSubjectListForTeacher()
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
    loadSubjectListForTeacher() {
      archiveService.getSubjectListForTeacher().then(res => {
        const subjectList = res.data.content || []
        this.teachingSubjectList = subjectList
      })
    },
    addExperience() {
      const cardToAdd = this.experienceModelItemList.find(
        item => item.show === false
      )

      if (cardToAdd) {
        cardToAdd.show = true
      }
    },
    fillForm() {
      const that: any = this
      const teacherInfo = that.teacherInfo as AddTeacherInfoCollectionParams

      this.name = teacherInfo.name
      this.idCard = teacherInfo.idCard
    },
    submit() {
      const that: any = this
      this.$validator.validate().then(valid => {
        console.log('TCL: valid', valid)
        this.validated = true

        if (valid) {
          console.log('post backend api')

          const params = {} as AddTeacherInfoCollectionParams
          // 基础信息
          params.name = this.name
          params.idCard = this.idCard
          params.nativePlace = this.birthplace
          params.nation = this.nation
          params.politics = this.politicsStatus
          params.maritalStatus = this.maritalStatus
          params.homeAddress = this.address
          params.phone = this.phone
          params.emergencyContact = this.emergencyContact
          params.emergencyContactPhone = this.emergencyContactPhone
          // 教育背景
          params.firstEducationDiploma = this.firstDegree
          params.firstEducationMajor = this.major
          params.firstEducationSchool = this.university
          params.highestEducationDiploma = this.highistDegree
          params.highestEducationMajor = this.highistDegreeMajor
          params.graduateTime = this.graduationDate
          params.workTime = this.workDate
          params.mandarinLevel = this.mandarinLevel
          params.englishLevel = this.englishLevel
          params.computerLevel = this.computerLevel
          // 经历与荣誉
          params.teachingSubject = this.teachingSubject
          params.workExperienceList = this.experienceModelItemList
            .filter(item => item.show)
            .map(
              item2 =>
                ({
                  startDate: item2.startDate,
                  endDate: item2.endDate,
                  school: item2.school,
                  teachingSubject: item2.teachingSubject
                } as WorkExperienceItem)
            )
          params.professionalTitle = this.theTitle
          params.evaluateTime = this.evaluateAtTime
          params.hireTime = this.hiringTime
          params.beGoodAt = this.optionalCourse
          params.selfIntroduction = this.selfIntroduction

          console.log('TCL: submit -> params', params)

          archiveService.addTeacherInfoCollection(params).then(res => {
            console.log('TCL: addTeacherInfoCollection submit -> res', res)

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

.optional-course-title,
.self-introduction-title {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 4px;
}

.toggle-show-work-experience-btn,
.add-work-experience-btn {
  margin: 0px !important;
  position: relative;
  right: -8px;

  &.v-btn--floating.v-btn--small {
    height: 32px;
    width: 32px;
  }
}

.field-title {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);
}
</style>
