<template>
  <div class="fill-height">
    <Developing v-if="developing"></Developing>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'vuex-pathify'
import { authModulePath, user } from '../store/auth/auth.paths'
import Developing from '../components/Developing.component.vue'
import { developing } from '../store/global.paths'

export default Vue.extend({
  computed: {
    ...get(authModulePath, {
      user
    }),
    ...get({ developing })
  },
  components: { Developing },
  created() {},
  data: function() {
    return {}
  },
  methods: {}
})
</script>

<style lang="scss" scoped></style>
