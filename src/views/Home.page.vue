<template>
  <div class="wrapper app-scroll-y app-fill-height app-relative">
    <div class="nav-wrapper white pa-0">
      <v-layout>
        <v-flex>
          <v-tabs fixed-tabs slider-color="primary">
            <v-tab> 推荐 </v-tab>
            <v-tab> 学校 </v-tab>
            <v-tab> 班级 </v-tab>
            <v-tab> 关注 </v-tab>
          </v-tabs>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex app-shrink class="pr-2">
          <v-layout :align-center="true" app-fill-height>
            <v-flex class="px-2">
              <v-icon>notifications_none</v-icon>
            </v-flex>
            <v-flex class="px-2">
              <v-icon>add_circle_outline</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
    <v-carousel class="banners" height="160" hide-controls interval="5000">
      <v-carousel-item
        v-for="(item, i) in images"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>

    <div class="sub-nav py-2">
      <v-layout row wrap justify-center>
        <v-flex xs9>
          <v-tabs fixed-tabs slider-color="primary">
            <v-tab>
              校园头条
            </v-tab>
            <v-tab>
              学校概况
            </v-tab>
            <v-tab>
              校园之星
            </v-tab>
          </v-tabs>
        </v-flex>
      </v-layout>
    </div>

    <div class="article-list pa-2">
      <v-layout row wrap>
        <v-flex
          v-for="article in articles"
          :key="article.id"
          xs12
          sm6
          md4
          class=""
        >
          <Article class="article py-2" :article="article"></Article>
        </v-flex>
      </v-layout>
    </div>

    <!-- <div class="text-xs-center" v-if="false">
      <v-dialog v-model="showDevelopingDialog" width="500" persistent>
        <v-card>
          <v-card-title class="subheading">
            <v-icon>info</v-icon>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            此页面正在开发中，敬请期待...
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="_onClose">
              关闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRandomInt } from '@/utils/math.util'
import Article from '../components/Article.component.vue'
import Header from '../components/Header.component.vue'
import { articles } from '../services/article.service'
import { dutyService } from '../services/duty.service'
import { get } from 'vuex-pathify'
import { developing } from '../store/global.paths'
import {
  school,
  authModulePath,
  appIsLoading,
  roleRoute,
  isTourist
} from '@/store/auth/auth.paths'
import { SchoolInfo } from '../models/school.model'
import Developing from '../components/Developing.component.vue'
import { storeService } from '../services/store.service'

export default Vue.extend({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      ;(vm as any).changeTitle()
    })
  },
  data: function() {
    return {
      images: [
        { src: `https://picsum.photos/id/${getRandomInt(1000)}/1920/1080` },
        { src: `https://picsum.photos/id/${getRandomInt(1000)}/1920/1080` },
        { src: `https://picsum.photos/id/${getRandomInt(1000)}/1920/1080` }
      ],
      articles: articles,
      dialog: false,
      showDevelopingDialog: false
    }
  },
  computed: {
    ...get({
      developing
    }),
    ...get(authModulePath, { school, roleRoute, isTourist, appIsLoading })
  },
  name: 'home',
  components: { Article },
  created() {
    this.showDevelopingDialog = true
    const that: any = this
    this.changeTitle()
  },
  destroyed() {
    this.showDevelopingDialog = false
  },
  methods: {
    changeTitle() {
      const that: any = this
      const schoolName = (that.school as SchoolInfo).name
      document.title = schoolName ? schoolName : ''
    },
    showAppLoading() {
      storeService.store.set(authModulePath + appIsLoading, true)
    },
    hideAppLoading() {
      storeService.store.set(authModulePath + appIsLoading, false)
    },
    _onClose() {
      this.showDevelopingDialog = false

      const that: any = this
      const route = that.isTourist
        ? '/account/tourist'
        : `/workbench/${that.roleRoute}`

      this.$router.push({
        path: route
      })
    },
    _showDialog() {
      const that: any = this
      this.showDevelopingDialog = true

      setTimeout(() => {
        this.showDevelopingDialog = false

        const route = that.isTourist
          ? '/account/tourist'
          : `/workbench/${that.roleRoute}`

        this.$router.push({
          path: route
        })
      }, 2000)
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
}

.nav-wrapper {
  padding: 0px;
  background-color: white;
}

.v-tabs__div {
  min-width: unset;
}

.action {
  position: fixed;
  bottom: 80px;
  right: 20px;
}

.v-carousel__controls {
  background: transparent !important;
}
</style>
