<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" :width="width">
      <v-card>
        <v-card-title class="title grey lighten-2" primary-title>
          {{ title }}
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <slot name="left-action"></slot>
          <v-spacer></v-spacer>
          <slot name="right-action"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: false
    }
  },
  computed: {},
  data: function() {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
