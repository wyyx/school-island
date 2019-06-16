<template>
  <div>
    <v-card color="primary">
      <v-layout column wrap class="pa-3">
        <v-flex class="text-xs-center">
          <v-avatar size="64">
            <img :src="schoolLogo" alt="alt" />
          </v-avatar>
        </v-flex>
        <v-flex class="text-xs-center pa-2">
          <h2 class="title white--text">{{ schoolName }}</h2>
        </v-flex>
      </v-layout>
    </v-card>

    <div class="card-wrapper pa-2">
      <v-card class="pa-3">
        <v-tabs v-model="tabs" fixed-tabs color="transparent">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab href="#parents" class="title">
            家长
          </v-tab>

          <v-tab href="#teacher" class="title">
            老师
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs" class="white py-2">
          <!-- parents input -->
          <v-tab-item value="parents">
            <v-text-field
              clearable
              label="姓名"
              :error-messages="['名字不能为空']"
              persistent-hint
            ></v-text-field>
            <v-text-field
              clearable
              label="身份证号码"
              :error-messages="['身份证号码不能为空']"
              persistent-hint
            ></v-text-field>
            <div>
              <v-layout row wrap>
                <v-flex class="relation-label">
                  与学生的关系
                </v-flex>
                <v-flex>
                  <v-autocomplete
                    v-model="relation"
                    :items="relations"
                    item-text="text"
                    item-value="value"
                    persistent-hint
                    placeholder="请选择"
                  >
                    <template v-slot:append-outer>
                      <v-slide-x-reverse-transition mode="out-in">
                      </v-slide-x-reverse-transition>
                    </template>
                  </v-autocomplete>
                </v-flex>
              </v-layout>
            </div>
          </v-tab-item>

          <!-- teacher input -->
          <v-tab-item value="teacher">
            <v-text-field
              clearable
              label="姓名"
              :error-messages="['名字不能为空']"
              persistent-hint
            ></v-text-field>
            <v-text-field
              clearable
              label="身份证号码"
              :error-messages="['身份证号码不能为空']"
              persistent-hint
            ></v-text-field>
          </v-tab-item>
        </v-tabs-items>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex class="px-2">
              <v-btn block large flat>游客访问</v-btn>
            </v-flex>
            <v-flex class="px-2">
              <v-btn block color="primary" large="">绑定</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>

      <!-- slogan -->
      <div class="text-xs-center subheading pa-4 grey--text">
        <p class="mb-1">校园岛</p>
        <p>好习惯 好未来</p>
      </div>
    </div>

    <v-snackbar v-model="showSnackbar" :color="color" :timeout="3000">
      {{ message }}
      <v-btn dark flat @click="showSnackbar = false">
        关闭
      </v-btn>
    </v-snackbar>

    <div
      v-if="showLoading"
      class="loading-wrapper fill-height fill-width both-center"
    >
      <v-progress-circular
        :size="50"
        color="accent"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { userService } from '../services/user.service'
import {
  authModulePath,
  showTabs,
  isTourist,
  school
} from '../store/auth/auth.paths'
import { loadUserInfoAction } from '../store/auth/auth.actions'
import { get } from 'vuex-pathify'

export default Vue.extend({
  data: function() {
    return {
      tab: 2,
      name: '',
      idCard: '',
      relation: 0,
      userType: 3,
      name2: '',
      idCard2: '',
      showSnackbar: false,
      message: '出现未知错误，请稍后再试',
      validated: false,
      color: 'success',
      showLoading: false,
      tabs: null,
      model: null,
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
        },
        {
          value: 7,
          text: '亲戚'
        }
      ]
    }
  },
  computed: {
    ...get(authModulePath, {
      school
    }),
    schoolName() {
      const that: any = this
      return that.school && that.school.name
    },
    schoolLogo() {
      const that: any = this
      const logos = that.school && that.school.logo
      return logos ? logos[0] : ''
    }
  },
  created() {
    this.$validator.localize('zh_CN')
  },
  methods: {
    giveUpBinding() {
      this.$router.push({
        name: 'home'
      })

      const store: any = this.$store
      store.set(authModulePath + isTourist, true)
      store.set(authModulePath + showTabs, true)

      this.$router.push({ name: 'home' })
    },
    submit() {
      // parents 1
      // teacher 3
      this.$validator.validate().then(valid => {
        console.log('TCL: submit -> valid', valid)
        this.validated = true

        let data: any = {}

        if (this.tab === 1) {
          data = {
            idcard: this.idCard,
            name: this.name,
            parentType: this.relation,
            userType: this.userType
          }
        }

        if (this.tab === 2) {
          data = {
            idcard: this.idCard2,
            name: this.name2,
            userType: this.userType
          }
        }

        console.log('TCL: submit -> data', data)

        // when parents
        if (
          valid &&
          this.tab === 1 &&
          (this.relation >= 1 || this.relation <= 7)
        ) {
          this.toBind(data)
        }

        // when teacher
        if (valid && this.tab === 2) {
          this.toBind(data)
        }
      })
    },
    toBind(data) {
      this.showLoading = true

      userService
        .bind(data)
        .then(res => {
          if (res.data.content) {
            console.log('绑定成功！跳转到首页')

            this.showSuccessMessage('绑定成功！')
            this.reloadUserInfo()
          } else {
            console.log('绑定失败', res.data.errorMsg)

            this.showFailMessage(`绑定失败！${res.data.errorMsg}`)

            this.showLoading = false
          }
        })
        .catch(() => {
          console.log('catch bind')
        })
    },
    reloadUserInfo() {
      this.$store
        .dispatch(authModulePath + loadUserInfoAction)
        .then(() => {
          this.showLoading = false

          this.$router.push({
            name: 'home'
          })
        })
        .catch(error => {})
    },
    showSuccessMessage(message: string) {
      this.showSnackbar = true
      this.color = 'success'
      this.message = message
    },
    showFailMessage(message: string) {
      this.showSnackbar = true
      this.color = 'red'
      this.message = message
    },
    resetInputState() {
      console.log('resetInputState')
      this.relation = 0
    }
  }
})
</script>

<style scoped>
.relation-label {
  font-size: 16px;
  line-height: 68px;
}
.error-message {
  color: red;
}
select {
  border-radius: 4px;
  padding-left: 16px;
  padding-right: 16px;
}

.error-messages {
  list-style: none;
}

.loading-wrapper {
  position: absolute;
  top: 0px;
}
</style>
