<template>
  <div class="container pa-0">
    <!-- <Header :showBack="true" title="工作台" @back="onBack"></Header> -->
    <v-card class="mb-2">
      <v-layout column wrap>
        <!-- header -->
        <v-flex class="class-selector">
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
                <v-flex>
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

    <!-- report -->
    <v-card class="pa-3">
      <v-layout column>
        <v-flex>
          <v-tabs-items v-model="model">
            <v-tab-item value="tab-1">
              <v-card flat>
                <h3>
                  值周排行榜
                </h3>
                <v-data-table
                  :headers="headers"
                  :items="addRanking(topItems)"
                  class="elevation-0"
                  hide-actions
                  no-data-text="暂无数据..."
                >
                  <template v-slot:items="props">
                    <td class="text-xs-right">{{ props.item.ranking }}</td>
                    <td class="text-xs-right">
                      {{ props.item.classFullName }}
                    </td>
                    <td class="text-xs-right">{{ props.item.amountScore }}</td>
                    <td class="text-xs-right">{{ props.item.starLevel }}</td>
                  </template>
                </v-data-table>
                <div class="text-center">
                  <v-btn outline color="primary">查看全部</v-btn>
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-card>

    <!-- bottom hint -->
    <v-layout row wrap class="bottom-hint pa-2">
      <v-flex class="grey--text text-center">
        ~~~ 到底了 ~~~
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import echarts, { EChartsResponsiveOption, EChartOption } from 'echarts'
import { dutyService } from '../services/duty.service'
import { TopItem } from '../models/duty-top.model'

import moment from 'moment'
moment.locale('zh-CN')

let now = moment().format('M月D日，A，h点m分')
console.log('TCL: now', now)

export default Vue.extend({
  components: {},
  created() {
    this.loadTop()
  },
  data: function() {
    return {
      classGrade: '',
      items: [],
      rating: 4,
      model: 'tab-1',
      headers: [
        {
          text: '名次',
          align: 'right',
          sortable: true,
          value: 'ranking'
        },
        {
          text: '班级',
          align: 'right',
          sortable: false,
          value: 'classFullName'
        },
        { text: '得分', align: 'right', sortable: true, value: 'amountScore' },
        { text: '星级', align: 'right', sortable: true, value: 'starLevel' }
      ],
      topItems: [] as TopItem[]
    }
  },
  methods: {
    onBack() {
      this.$router.push({
        name: 'home'
      })
    },
    loadTop() {
      dutyService.getDutyTop(1).then(res => {
        console.log('TCL: loadTop -> res', res)
        this.topItems = res.data.content
      })
    },
    addRanking(topItems: TopItem[]) {
      let items: {
        ranking: number
        classFullName: string
        amountScore: number
        starLevel: number
      }[] = []

      for (let index = 0; index < topItems.length; index++) {
        items.push({
          ...topItems[index],
          ranking: index + 1
        })
      }

      return items
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

#chart {
  height: 300px;
  width: 100%;
}

.bottom-hint {
  margin-bottom: 56px !important;
}
</style>
