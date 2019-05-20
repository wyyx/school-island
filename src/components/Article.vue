<template>
  <div class="article">
    <v-layout>
      <v-flex xs12 sm6>
        <v-card class="pa-2">
          <v-layout row wrap>
            <v-flex xs8>
              <v-card-title primary-title>
                <div>
                  <h3 class="subheading mb-0">2017级8班 李小龙的妈妈</h3>
                  <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus tempora sunt porro. Esse, nostrum saepe!
                  </div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs4 align-self-center>
              <v-img src="https://picsum.photos/200" aspect-ratio="1"></v-img>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.v-card__title--primary {
  padding-top: 0px;
}
</style>
