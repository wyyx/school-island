<template>
  <div class="fill-height">
    <Header :showBack="true" title="个人中心" @back="back"></Header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'

export default Vue.extend({
  name: 'explore',
  computed: {},
  components: { Header },
  created() {},
  methods: {
    back() {
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped>
.list {
  background-color: transparent;
}

.list-item {
  background-color: white;
}
</style>
