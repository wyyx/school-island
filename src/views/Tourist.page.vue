<template>
  <div class="app-relative app-fill-height app-scroll-y">
    <!-- <h1 class="grey--text">游客!</h1> -->
    <v-card color="primary" class="mb-2">
      <v-layout class="teachers py-3" row wrap>
        <v-flex xs4>
          <v-layout row wrap app-fill-height justify-center align-center>
            <v-flex app-shrink>
              <v-icon :size="64" color="white">account_circle</v-icon>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="white--text" xs8>
          <v-layout column wrap>
            <v-flex class="pa-2 title">
              <span class="px-4">{{ user.nickname }}</span>
            </v-flex>
            <v-flex class="pa-2">
              <v-btn color="accent" @click="goToBindingPage">
                立即认证
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import { authModulePath, isTourist, user } from '../store/auth/auth.paths'

export default Vue.extend({
  name: 'tourist',
  computed: {
    ...get(authModulePath, {
      user
    })
  },
  methods: {
    goToBindingPage() {
      this.$router.push({
        name: 'binding'
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
