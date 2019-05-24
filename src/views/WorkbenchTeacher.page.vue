<template>
  <div class="container pa-0">
    <Header :showBack="true" title="工作台" @back="onBack"></Header>
    <v-card class="mb-3">
      <v-layout column wrap>
        <!-- header -->
        <v-flex>
          <v-layout row wrap class="primary lighten-3 pa-2">
            <v-flex xs6>
              <div class="class-selection-box primary lighten-4 py-1 px-2">
                <v-autocomplete
                  class="pa-0"
                  v-model="classGrade"
                  :items="items"
                  color="primary"
                  item-text="text"
                  hide-no-data
                  hide-selected
                  item-value="API"
                  placeholder="选择班级"
                  return-object
                  hide-details
                ></v-autocomplete>
                <v-rating
                  class="py-1"
                  color="accent"
                  background-color="grey darken-1"
                  dense
                  small
                  readonly
                  v-model="rating"
                ></v-rating>
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
        <!-- growing tree -->
        <v-flex class="growing-tree primary lighten-5">
          <!-- data -->
          <v-layout class="data" column>
            <v-flex>
              <v-layout row wrap>
                <v-flex xs4 class="text-center pb-2">
                  <v-icon color="accent">wb_sunny</v-icon>
                </v-flex>
                <v-flex>
                  <span class="pa-2 grey--text text--darken-1">8999</span>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout row wrap>
                <v-flex xs4 class="text-center">
                  <span class="accent--text">LV</span>
                </v-flex>
                <v-flex>
                  <span class="pa-2 grey--text text--darken-1">3</span>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <!-- tree -->
          <v-layout
            class="tree"
            row
            wrap
            justify-center
            align-center
            fill-height
          >
            <v-flex shrink>
              <font-awesome-icon icon="tree" class="green--text accent-3" />
            </v-flex>
          </v-layout>
          <v-layout column wrap class="legend text-center">
            <v-flex class="py-2">
              <div><v-icon color="accent" large>local_florist</v-icon></div>
              <div class="grey--text text--darken-1">花 朵</div>
            </v-flex>
            <v-flex class="py-2">
              <div>
                <font-awesome-icon icon="apple-alt" class="fruit-icon" />
              </div>
              <div class="grey--text text--darken-1">果 实</div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
    <v-card class="pa-2">
      <v-layout class="pa-2" row wrap>
        <v-flex>
          我获得的能量
        </v-flex>
        <v-flex shrink>
          <v-icon>keyboard_arrow_right</v-icon>
        </v-flex>
      </v-layout>
      <v-layout class="pa-2 text-center" row wrap>
        <v-flex xs2 shrink class="pa-2">
          <div>
            <v-icon color="accent" medium>star</v-icon>
          </div>
          <div>
            <span>100</span>
          </div>
        </v-flex>
        <v-flex xs2 shrink class="pa-2">
          <div>
            <v-icon color="accent" medium>scatter_plot</v-icon>
          </div>
          <div>
            <span>35</span>
          </div>
        </v-flex>
        <v-flex class="pa-2 text-right">
          <v-btn outline color="accent">新建能量卡</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'

export default Vue.extend({
  components: {
    Header
  },
  data: function() {
    return {
      classGrade: '',
      items: [
        { text: '2017年1班', value: 1 },
        { text: '2017年2班', value: 2 },
        { text: '2017年3班', value: 3 },
        { text: '2017年4班', value: 4 },
        { text: '2017年5班', value: 5 }
      ],
      rating: 4
    }
  },
  methods: {
    onBack() {
      this.$router.push({
        name: 'home'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.class-selection-box {
  border-radius: 2px;
}
.growing-tree {
  position: relative;
  height: 300px;
}

.data {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  height: 36px;
}

.tree {
  font-size: 13rem;
}

.legend {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.fruit-icon {
  font-size: 2.1rem;
  color: #ffc107;
}
</style>
