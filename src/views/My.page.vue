<template>
  <div class="container pa-0">
    <!-- <Header :showBack="false" title="个人中心"></Header> -->
    <v-card color="primary" class="mb-2">
      <v-layout class="teachers py-4" row wrap>
        <v-flex xs4>
          <v-layout row wrap fill-height justify-center align-center>
            <v-flex shrink>
              <v-avatar :tile="false" :size="48" color="grey lighten-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="avatar"
                />
              </v-avatar>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="white--text" xs8>
          <v-layout column wrap>
            <v-flex class="pa-2 title">
              <span class="pr-3">马老师</span>
              <v-icon color="white">swap_horiz</v-icon>
              <span class="pl-3">切换</span>
            </v-flex>
            <v-flex class="pa-2">
              <span class="pr-3">英语老师</span>
              <span>体育老师</span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-btn small class="check-in-btn" color="accent">
          <v-icon small>check</v-icon>
          <span class="pl-1">签到</span>
        </v-btn>
      </v-layout>
      <v-layout class="scores white pa-1" row wrap>
        <v-flex>
          <div><v-icon color="accent">flare</v-icon></div>
          <h3>2180</h3>
          <div class="text--secondary">积分</div>
        </v-flex>
        <v-flex>
          <div><v-icon color="accent">whatshot</v-icon></div>
          <h3>1566</h3>
          <div class="text--secondary">学分</div></v-flex
        >
        <v-flex>
          <div><v-icon color="accent">people_outline</v-icon></div>
          <h3>358</h3>
          <div class="text--secondary">粉丝</div>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card class="mb-2">
      <v-layout class="scores white pa-3 text--secondary" row wrap>
        <v-flex>
          <div><v-icon color="accent">star</v-icon></div>
          <div>我的班级</div>
        </v-flex>
        <v-flex>
          <div><v-icon color="accent">filter_vintage</v-icon></div>
          <div>我的荣誉</div>
        </v-flex>
        <v-flex>
          <div><v-icon color="accent">image</v-icon></div>
          <div>我的作品</div>
        </v-flex>
        <v-flex>
          <div><v-icon color="accent">insert_drive_file</v-icon></div>
          <div>我的文章</div>
        </v-flex>
        <v-flex>
          <div><v-icon color="accent">card_giftcard</v-icon></div>
          <div>兑换中心</div>
        </v-flex>
      </v-layout>
    </v-card>

    <!-- list -->
    <v-card>
      <v-list subheader class="text--secondary">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon color="accent">sms</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              我的消息
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">keyboard_arrow_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider inset></v-divider>

        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon color="accent">local_post_office</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              我的发帖
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">keyboard_arrow_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider inset></v-divider>

        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon color="accent">insert_drive_file</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>我的草稿</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">keyboard_arrow_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider inset></v-divider>

        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon color="accent">timer</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>我的任务</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">keyboard_arrow_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider inset></v-divider>

        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon color="accent">help_outline</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>帮助</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">keyboard_arrow_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'

export default Vue.extend({
  name: 'my',
  components: {},
  created() {
    this.changeTitle()
  },
  methods: {
    changeTitle() {
      document.title = '个人中心'
    }
  }
})
</script>

<style lang="scss" scoped>
.teachers {
  position: relative;
}
.scores {
  text-align: center;
}
.check-in-btn {
  position: absolute;
  right: 0px;
  bottom: 15px;
  margin: 0px;
  border-top-left-radius: 100px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 100px;
}
</style>
