<template>
  <div class="container pa-0">
    <Header :showBack="true" title="创建文章" @back="onBack"></Header>
    create article page
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
