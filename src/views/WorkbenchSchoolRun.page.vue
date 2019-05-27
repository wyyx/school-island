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
                  :items="desserts"
                  class="elevation-0"
                  hide-actions
                >
                  <template v-slot:items="props">
                    <td class="text-xs-right">{{ props.item.createTime }}</td>
                    <td class="text-xs-right">{{ props.item.checkName }}</td>
                    <td class="text-xs-right">{{ props.item.changeScore }}</td>
                    <td class="text-xs-right">{{ props.item.remarks }}</td>
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

export default Vue.extend({
  components: {},
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
      rating: 4,
      model: 'tab-1',
      headers: [
        {
          text: '时间',
          align: 'left',
          sortable: true,
          value: 'time'
        },
        { text: '类别', align: 'left', sortable: false, value: 'category' },
        { text: '扣分', align: 'left', sortable: true, value: 'deduction' },
        { text: '备注', align: 'left', sortable: false, value: 'note' }
      ],
      desserts: [
        {
          time: '12.11',
          category: 159,
          deduction: 6.0,
          note: '备注'
        },
        {
          time: '12.12',
          category: 237,
          deduction: 9.0,
          note: '备注'
        },
        {
          time: '12.13',
          category: 262,
          deduction: 16.0,
          note: '备注'
        },
        {
          time: '12.14',
          category: 305,
          deduction: 3.7,
          note: '备注'
        },
        {
          time: '12.15',
          category: 356,
          deduction: 16.0,
          note: '备注'
        },
        {
          time: '12.16',
          category: 375,
          deduction: 0.0,
          note: '备注'
        },
        {
          time: '12.17',
          category: 392,
          deduction: 0.2,
          note: '备注'
        },
        {
          time: '12.18',
          category: 356,
          deduction: 16.0,
          note: '备注'
        },
        {
          time: '12.19',
          category: 375,
          deduction: 0.0,
          note: '备注'
        },
        {
          time: '12.20',
          category: 392,
          deduction: 0.2,
          note: '备注'
        }
      ]
    }
  },
  methods: {
    onBack() {
      this.$router.push({
        name: 'home'
      })
    },
    initEcharts() {
      let chart = echarts.init(document.getElementById(
        'chart'
      ) as HTMLDivElement)
      // specify chart configuration item and data
      var option: EChartOption = {
        tooltip: {},
        legend: {
          data: ['纪律', '卫生', '两操', '文明', '安全']
        },
        xAxis: {
          data: ['星期一', '星期二', '星期三', '星期四', '星期五']
        },
        yAxis: {},
        series: [
          {
            name: '纪律',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
              color: '#2196F3'
            }
          },
          {
            name: '卫生',
            type: 'line',
            data: [13, 18, 22, 32, 28, 11],
            itemStyle: {
              color: '#00BCD4'
            }
          },
          {
            name: '两操',
            type: 'line',
            data: [7, 19, 34, 31, 27, 18],
            itemStyle: {
              color: '#FFC107'
            }
          },
          {
            name: '文明',
            type: 'line',
            data: [16, 22, 11, 27, 25, 27],
            itemStyle: {
              color: '#E91E63'
            }
          },
          {
            name: '安全',
            type: 'line',
            data: [25, 25, 17, 26, 27, 16],
            itemStyle: {
              color: '#4CAF50'
            }
          }
        ]
      }

      // use configuration item and data specified to show chart
      chart.setOption(option)
    }
  },
  mounted() {
    // this.initEcharts()
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

table.v-table tbody td {
  height: unset !important;
  padding: 12px 12px;
}

.bottom-hint {
  margin-bottom: 56px !important;
}
</style>
