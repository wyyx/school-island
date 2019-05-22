<template>
  <div class="container pa-0">
    <v-card color="primary pa-2" class="mb-2">
      <v-layout class="" row wrap>
        <v-flex xs6 class="pr-1">
          <v-layout row wrap align-center justify-end fill-height>
            <v-flex shrink class="pr-2">
              <v-avatar
                class="avatar"
                :tile="false"
                :size="48"
                color="grey lighten-4"
              >
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="avatar"
                />
              </v-avatar>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6 class="white--text text-left">
          <div class="parents">
            2017年8班 李小龙的妈妈
          </div>
          <v-btn small class="follow" color="accent">
            <v-icon small>check</v-icon>
            <span class="pl-2">已关注</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>

    <v-card>
      <h3>{{ article.title }}</h3>
      <div class="meta-header">
        <span class="author">作者：xxx</span>
        <span class="date">2019/5/22</span>
      </div>
      <div class="conent" v-html="article.context"></div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { articles } from '../services/article.service'

export default Vue.extend({
  name: 'my',
  components: {},
  props: {
    id: {
      type: Number
    }
  },
  data: function() {
    return {
      article: null
    }
  },
  created() {
    console.log('id', this.id)
    this.article = articles.filter(e => e.id === this.id)[0] as any
  }
})
</script>

<style lang="scss" scoped></style>
