<template>
  <div class="container pa-0">
    <!-- header -->
    <v-card class="mb-2">
      <v-layout column wrap>
        <v-flex class="class-selector">
          <v-layout row wrap class="primary lighten-3 pa-2">
            <v-flex xs6>
              <div class="class-selection-box primary lighten-4 py-1 px-2">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn light flat v-on="on" class="subheading">
                      {{ currentStudent.name }}
                      <v-icon>swap_horiz</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(student, index) in studentList"
                      :key="index"
                      @click="switchStudent(student)"
                    >
                      <v-list-tile-title>{{ student.name }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
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
import { Student, UserInfo } from '../models/user.model'

export default Vue.extend({
  data: function() {
    return {
      student: {} as Student
    }
  },
  computed: {
    ...get(authModulePath, {
      user,
      currentStudent
    }),
    ...get({ developing }),
    studentList() {
      const that: any = this
      return (that.user as UserInfo).studentVoList || []
    }
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

<style lang="scss" scoped>
.class-selection-box {
  border-radius: 2px;
}
</style>
