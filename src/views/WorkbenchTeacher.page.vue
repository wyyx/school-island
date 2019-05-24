<template>
  <div class="container pa-0 pb-4">
    <Header :showBack="true" title="工作台" @back="onBack"></Header>
    <v-card class="mb-3">
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
            <v-flex shrink class="text-align">
              <!-- <font-awesome-icon icon="tree" class="green--text accent-3" /> -->
              <v-layout fill-height row wrap justify-center align-center>
                <v-flex class="pt-4">
                  <!-- <img width="250px" src="../assets/tree_1.svg" alt="" /> -->
                  <img width="240px" src="../assets/tree_2.svg" alt="" />
                </v-flex>
              </v-layout>
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
    <!-- energy -->
    <v-card class="pa-2 mb-3">
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
    <!-- report -->
    <v-card class="pa-2 mb-3">
      <v-layout column>
        <v-flex>
          <v-layout row wrap>
            <v-flex shrink>
              <v-tabs v-model="model" centered slider-color="primary">
                <v-tab href="#tab-1">
                  值周
                </v-tab>
                <v-tab href="#tab-2">
                  班级能量
                </v-tab>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-tabs-items v-model="model">
            <v-tab-item value="tab-1">
              <v-card class="pa-4" flat>
                <h3>
                  上周综合得分
                  <span class="accent--text text--darken-2">8.5分</span>
                </h3>
                <h5 class="grey--text">超过 72% 的班级</h5>
                <div id="chart" class="pt-3"></div>
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  class="elevation-0"
                >
                  <template v-slot:items="props">
                    <td class="text-xs-right">{{ props.item.time }}</td>
                    <td class="text-xs-right">{{ props.item.category }}</td>
                    <td class="text-xs-right">{{ props.item.deduction }}</td>
                    <td class="text-xs-right">{{ props.item.note }}</td>
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <v-card class="pa-3" flat>
                <h3>
                  组员综合表现
                  <span class="accent--text text--darken-2">5.12~5.17分</span>
                </h3>

                <v-layout column wrap>
                  <v-flex>
                    <v-layout row wrap>
                      <v-flex shrink class="pa-2"> 王小明 </v-flex>
                      <v-flex class="pa-2"> 12 </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex shrink class="pa-2"> 王小明 </v-flex>
                      <v-flex class="pa-2"> 12 </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex shrink class="pa-2"> 王小明 </v-flex>
                      <v-flex class="pa-2"> 12 </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex shrink class="pa-2"> 王小明 </v-flex>
                      <v-flex class="pa-2"> 12 </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex shrink class="pa-2"> 王小明 </v-flex>
                      <v-flex class="pa-2"> 12 </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex shrink class="pa-2"> 王小明 </v-flex>
                      <v-flex class="pa-2"> 12 </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex shrink class="pa-2"> 王小明 </v-flex>
                      <v-flex class="pa-2"> 12 </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex shrink class="pa-2"> 王小明 </v-flex>
                      <v-flex class="pa-2"> 12 </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex shrink class="pa-2"> 王小明 </v-flex>
                      <v-flex class="pa-2"> 12 </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- bottom hint -->
    <v-layout row wrap class="bottom-hint pa-2 mb-3">
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
        }
      ]
    }
  },
  methods: {
    onBack() {
      this.$router.push({
        name: 'home'
      })
    }
  },
  mounted() {
    let chart = echarts.init(document.getElementById('chart') as HTMLDivElement)
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
  margin-bottom: 48px !important;
}
</style>
