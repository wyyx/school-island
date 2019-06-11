<template>
  <div>
    <div class="header">
      <div class="badge">
        <img :src="schoolLogo" class="badgeimg" alt="" />
      </div>
      <div class="schoolname">{{ schoolName }}</div>
    </div>
    <div class="content">
      <div class="roleList">
        <div
          class="role clickable"
          :class="{ active: showParents }"
          name="1"
          @click="showParentsInput"
        >
          家长
        </div>
        <div
          class="role clickable"
          :class="{ active: !showParents }"
          name="2"
          @click="showTeacherInput"
        >
          老师
        </div>
      </div>
      <!-- parents inputs -->
      <div class="parents-input-wrapper" v-if="showParents">
        <div class="roleList studentDiv">
          <input
            type="text"
            class="studentinfo"
            maxlength="10"
            id="studentName"
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
        </div>
        <div class="roleList studentDiv">
          <input
            type="text"
            class="studentinfo"
            maxlength="18"
            id="studentCard"
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
      </div>
      <!-- teacher inputs -->
      <div class="teacher-input-wrapper" v-else>
        <div class="roleList teacherDiv">
          <input
            type="text"
            class="studentinfo"
            maxlength="10"
            id="teacherName"
            placeholder="输入真实名字"
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
        </div>
        <div class="roleList teacherDiv">
          <input
            type="text"
            class="studentinfo"
            maxlength="18"
            id="teacherCard"
            placeholder="输入身份证号"
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
      </div>

      <div class="roleList line" id="relationDiv" v-if="showParents">
        <div class="studentRelation">与学生关系</div>
        <select
          name=""
          id="relation"
          v-model="relation"
          @change="onSelectChange"
        >
          <option value="1">爸爸</option>
          <option value="2">妈妈</option>
          <option value="3">爷爷</option>
          <option value="4">奶奶</option>
          <option value="5">外公</option>
          <option value="6">外婆</option>
          <option value="7">亲戚</option>
        </select>
      </div>
      <div class="roleList line">
        <div class="tourists clickable" @click="giveUpBinding">游客访问</div>
        <div class="attestation clickable" @click="submit">立即认证</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { userService } from '../services/user.service'

export default Vue.extend({
  data: function() {
    return {
      showParents: true,
      name: '',
      idCard: '',
      relation: 1,
      userType: 1
    }
  },
  computed: {
    schoolName() {
      return userService.schoolInfo.name
    },
    schoolLogo() {
      const logos = userService.schoolInfo.logo
      return logos ? logos[0] : ''
    }
  },
  created() {
    this.$validator.localize('zh_CN')
  },
  methods: {
    showParentsInput() {
      this.showParents = true
      this.userType = 1
    },
    showTeacherInput() {
      this.showParents = false
      this.userType = 3
      this.relation = 0
    },
    giveUpBinding() {
      this.$router.push({
        name: 'home'
      })
    },

    submit() {
      // parents 1
      // teacher 3
      this.$validator.validate().then(valid => {
        console.log('TCL: submit -> valid', valid)
        const data = {
          idcard: this.idCard,
          name: this.name,
          parentType: this.relation,
          userType: this.userType
        }
        console.log('TCL: submit -> data', data)

        if (valid) {
          userService.bind(data)
        }
      })
    },
    onSelectChange() {}
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
</style>