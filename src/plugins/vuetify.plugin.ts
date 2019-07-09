import Vue from 'vue'
import Vuetify, { colors, VSnackbar, VIcon } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
// Translation provided by Vuetify (javascript)
import zhHans from 'vuetify/es5/locale/zh-Hans'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.cyan,
    accent: colors.amber
  },
  components: {
    VSnackbar,
    VIcon
  },
  lang: {
    locales: { zhHans, en },
    current: 'zhHans'
  }
})
