<template>
  <div class="container pa-0">
    <!-- header -->
    <v-card class="mb-2">
      <v-layout column wrap>
        <v-flex class="class-selector">
          <v-layout row wrap class="primary lighten-3 pa-2">
            <v-flex xs6>
              <div class="class-selection-box primary lighten-4 py-1 px-2">
                <v-autocomplete
                  @change="onAutocompleteChanged"
                  class="pa-0"
                  v-model="student"
                  :items="user.studentVoList || []"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  hide-no-data
                  hide-selected
                  placeholder="切换学生"
                  hide-details
                  :return-object="true"
                ></v-autocomplete>
              </div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex shrink class="pr-2">
              <v-layout :align-center="true" fill-height wrap="false">
                <v-flex class="">
                  <v-btn depressed color="transparent" fab>
                    <v-icon>search</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex class="">
                  <v-btn depressed color="transparent" fab>
                    <v-icon>add_circle_outline</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
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
import { authModulePath, user, currentStudent } from '../store/auth/auth.paths'
import Developing from '../components/Developing.component.vue'
import { developing } from '../store/global.paths'
import { Student } from '../models/user.model'

export default Vue.extend({
  data: function() {
    return {
      student: {} as Student
    }
  },
  computed: {
    ...get(authModulePath, {
      user
    }),
    ...get({ developing })
  },
  components: {},
  created() {},
  methods: {
    onAutocompleteChanged() {
      console.log('this.student', this.student)
      this.switchStudent(this.student)
    },
    switchStudent(student: Student) {
      console.log('TCL: student', student)

      const store: any = this.$store
      store.set(authModulePath + currentStudent, student)
    }
  }
})
</script>

<style lang="scss" scoped></style>
