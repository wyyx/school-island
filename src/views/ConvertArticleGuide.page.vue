<template>
  <div class="app-relative app-fill-height app-scroll-y">
    <v-layout app-fill-height column wrap class="pa-3">
      <v-flex app-shrink>
        <Header title="转载文章" @back="goBack"></Header>
      </v-flex>
      <v-flex>
        <v-form>
          <v-text-field
            v-model="articleUrl"
            label="文章地址"
            required
          ></v-text-field>
        </v-form>
      </v-flex>
      <v-flex app-shrink>
        <div class="btn-wrapper">
          <v-btn block color="primary" @click="onClick">下一步</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
export default Vue.extend({
  data: function() {
    return {
      articleUrl:
        'https://www.oschina.net/news/106799/the-struggles-of-an-open-source-maintainer'
    }
  },
  components: {
    Header
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onClick() {
      this.$router.push({
        name: 'convert-article',
        query: {
          articleUrl: this.articleUrl
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.btn-wrapper {
  text-align: center;
  padding-bottom: 56px;
}
</style>
