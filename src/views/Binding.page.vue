<template>
  <div>
    <div class="header">
      <div class="badge">
        <img :src="schoolLogo" class="badgeimg" alt="" />
      </div>
      <div class="schoolname">{{ schoolName }}</div>
    </div>
    <div class="content">
      <form>
        <div class="roleList">
          <div
            class="role clickable"
            :class="{ active: tab === 1 }"
            name="1"
            @click=";(tab = 1), (userType = 1), (validated = false)"
          >
            家长
          </div>
          <div
            class="role clickable"
            :class="{ active: tab === 2 }"
            name="2"
            @click=";(tab = 2), (userType = 3), (validated = false)"
          >
            老师
          </div>
        </div>
        <!-- parents inputs -->
        <div class="parents-input-wrapper" v-if="tab === 1">
          <input
            type="text"
            class="studentinfo"
            style="height: 50px; margin-bottom: 10px;"
            maxlength="10"
            placeholder="输入学生名字"
            v-model="name"
            v-validate="'required'"
            name="name"
            data-vv-as="名字"
          />
          <ul class="error-messages">
            <li
              class="error-message"
              v-for="error in errors.collect('name')"
              :key="error"
            >
              {{ error }}
            </li>
          </ul>
          <input
            type="text"
            class="studentinfo"
            style="height: 50px;"
            maxlength="18"
            placeholder="输入学生身份证号"
            v-model="idCard"
            v-validate="{
              required: true,
              regex: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
              length: 18
            }"
            name="idCard"
            data-vv-as="身份证号"
          />
          <ul class="error-messages">
            <li
              class="error-message"
              v-for="error in errors.collect('idCard')"
              :key="error"
            >
              {{ error }}
            </li>
          </ul>
        </div>
        <!-- teacher inputs -->
        <div class="teacher-input-wrapper" v-if="tab === 2">
          <div class="roleList teacherDiv">
            <input
              type="text"
              class="studentinfo"
              maxlength="10"
              placeholder="输入真实名字"
              v-model="name2"
              v-validate="'required'"
              name="name2"
              data-vv-as="名字"
            />
            <ul class="error-messages">
              <li
                class="error-message"
                v-for="error in errors.collect('name2')"
                :key="error"
              >
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="roleList teacherDiv">
            <input
              type="text"
              class="studentinfo"
              placeholder="输入身份证号"
              v-model="idCard2"
              v-validate="{
                required: true,
                regex: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                length: 18
              }"
              name="idCard2"
              data-vv-as="身份证号"
            />
            <ul class="error-messages">
              <li
                class="error-message"
                v-for="error in errors.collect('idCard2')"
                :key="error"
              >
                {{ error }}
              </li>
            </ul>
          </div>
        </div>

        <div class="roleList line" id="relationDiv" v-if="tab === 1">
          <div class="studentRelation">与学生关系</div>
          <div>
            <select name="relation" id="relation" v-model="relation">
              <option disabled selected value="0">请选择关系</option>
              <option value="1">爸爸</option>
              <option value="2">妈妈</option>
              <option value="3">爷爷</option>
              <option value="4">奶奶</option>
              <option value="5">外公</option>
              <option value="6">外婆</option>
              <option value="7">亲戚</option>
            </select>
          </div>
          <div>
            <ul class="error-messages" v-if="validated && relation === 0">
              <li class="error-message">
                关系为必选项
              </li>
            </ul>
          </div>
        </div>
        <div class="roleList line">
          <div class="tourists clickable" @click="giveUpBinding">游客访问</div>
          <div class="attestation clickable" @click="submit">立即认证</div>
        </div>
      </form>
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
      showLoading: false
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
* {
  padding: 0;
  margin: 0;
}

.header {
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  background-color: #00bcd4;
  padding-top: 1px;
}
.badge {
  margin: auto;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background: white;
  margin-top: 10px;
  overflow: hidden;
}
.badgeimg {
  width: 100%;
  height: 100%;
}
.schoolname {
  margin: auto;
  white-space: nowrap;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 微软雅黑;
  color: rgb(255, 255, 255);
  margin-top: 10px;
}
.content {
  padding-top: 5px;
  width: 96%;
  height: 400px;
  margin: auto;
  border-radius: 8px;
  background-color: rgb(255, 255, 251);
}

.roleList {
  width: 80%;
  margin: auto;
  height: 50px;
  font-size: 16px;
  margin-top: 15px;
}

.role {
  width: 49%;
  float: left;
  font-size: 21px;
  color: rgb(189, 189, 189);
  text-align: center;
  line-height: 50px;
  height: 100%;
}

.active {
  color: #00bcd4;
}

.studentinfo {
  height: 100%;
  width: 100%;
  padding-left: 16px;
  background: rgb(242, 242, 242);
  border: none;
  border-radius: 4px;
}

.studentRelation {
  white-space: nowrap;
  text-align: left;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 微软雅黑;
  color: rgb(0, 0, 0);
  float: left;
}
select {
  float: right;
  width: 65%;
  height: 80%;
  border: 1px solid rgb(228, 228, 228);
}
.line {
  line-height: 35px;
}
.tourists {
  white-space: nowrap;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  font-family: 微软雅黑;
  color: rgb(174, 174, 174);
  float: left;
  width: 30%;
  height: 100%;
  line-height: 50px;
}
.attestation {
  height: 100%;
  width: 65%;
  float: right;
  background: #00bcd4;
  color: rgb(255, 255, 255);
  border-radius: 4px;
  text-align: center;
  line-height: 50px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.ts_alert {
  padding: 0px 20px;
  height: 50px;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -25px;
  z-index: 999;
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
