import VeeValidate, { Validator } from 'vee-validate'
import Vue from 'vue'

import zh_CN from 'vee-validate/dist/locale/zh_CN'
// import zh_CN from './zh_CN'

Vue.use(VeeValidate)

Validator.localize('zh_CN', zh_CN)

// custom error messages
const dict = {
  custom: {
    studentIdCard: {
      required: '学生身份证号码未填写'
    },
    phone: {
      required: '手机号码未填写'
    },
    certificateNumber: {
      required: '监护人身份证号码未填写'
    },
    certificateNumber2: {
      required: '监护人身份证号码未填写'
    }
  }
}

Validator.localize('zh_CN', dict)
