<template>
  <div class="container pa-0">
    <Header :showBack="true" title="转载文章" @back="onBack"></Header>
    convert article guide page
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
export default Vue.extend({
  components: {
    Header
  },
  methods: {
    onBack() {
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped></style>
