<template>
  <v-toolbar app height="48">
    <v-toolbar-title class="title text-uppercase">
      <v-layout row wrap>
        <v-flex>
          <div class="back-btn-wrapper pa-2 clickable" v-ripple @click="goBack">
            <v-icon>arrow_back</v-icon>
          </div>
        </v-flex>
        <v-flex class="app-both-center subheading">
          <span>{{ title }}</span>
        </v-flex>
      </v-layout>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String
    },
    showBack: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      this.$emit('back')
    }
  }
})
</script>

<style lang="scss" scoped>
.v-toolbar .v-toolbar__content {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
