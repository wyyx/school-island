<template>
  <div class="container pa-0">
    <v-layout
      v-if="showLoading"
      class="loading-wrapper"
      fill-height
      justify-center
      align-center
      row
      wrap
    >
      <v-flex shrink>
        <v-progress-circular indeterminate color="accent"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-card class="mb-2">
      <v-layout column wrap>
        <!-- header -->
        <v-flex class="class-selector">
          <v-layout row wrap class="primary lighten-3 pa-2">
            <v-flex xs6>
              <div class="class-selection-box primary lighten-4 pa-2">
                <v-select
                  v-model="currentGrade"
                  :items="gradeItems"
                  item-text="label"
                  item-value="value"
                  :return-object="true"
                  :hide-details="true"
                  :single-line="true"
                ></v-select>
              </div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex shrink class="pr-2">
              <v-layout :align-center="true" fill-height wrap="false">
                <v-flex>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        depressed
                        color="transparent"
                        fab
                        light
                        v-on="on"
                        class="subheading"
                      >
                        <v-icon>add_circle_outline</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-tile @click="goToDataCenterPage">
                        <v-list-tile-title>
                          <v-icon>equalizer</v-icon>
                          <span class="menu-text pl-2">数据中心</span>
                        </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>

    <!-- duty graph -->
    <v-card class="pa-3 mb-3">
      <v-layout column>
        <v-flex>
          <v-layout row wrap>
            <v-flex shrink>
              <v-tabs v-model="model" centered slider-color="primary">
                <v-tab href="#tab-1">
                  值周
                </v-tab>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-tabs-items v-model="model" class="pt-3">
            <v-tab-item value="tab-1">
              <v-card v-if="hasClasses" flat>
                <!-- duty check one week -->
                <!-- deduction week history graph -->
                <div v-if="hasHistory" class="chart-wrapper fill-width pb-3">
                  <h3 class="mb-2 duty-check-title">
                    上周综合得分
                    <span class="accent--text text--darken-2">8.5分</span>
                  </h3>
                  <div class="duty-check-image">
                    <v-layout row wrap class="duty-check-content">
                      <v-flex
                        class="text-xs-center"
                        v-for="(score, index) in currentCheckItem.scores"
                        :key="score"
                      >
                        <div class="white--text display-1">
                          {{ score }}
                        </div>
                        <div class="pt-3">{{ getDayName(index) }}</div>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
                <div v-if="!hasHistory" class="loading-wrapper">
                  <v-progress-circular
                    indeterminate
                    color="accent"
                  ></v-progress-circular>
                </div>
                <!-- duty check detail list -->
                <h3>扣分明细</h3>
                <v-card-title class="pa-1">
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="搜索"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="currentDeductionList"
                  class="elevation-0"
                  hide-actions
                  :search="search"
                  no-data-text="暂无数据..."
                  no-results-text="没有匹配的数据..."
                  :pagination.sync="pagination"
                >
                  <template v-slot:items="props">
                    <td class="text-xs-right">
                      {{ formatDate(props.item.createTime) }}
                    </td>
                    <td class="text-xs-right">{{ props.item.checkName }}</td>
                    <td class="text-xs-right">
                      {{ props.item.changeScore }}分
                    </td>
                    <td class="text-xs-right">
                      <div>
                        {{ props.item.remarks }}
                        <v-card
                          v-if="showThumbnail(props.item.imageUrls)"
                          class="pa-0 mt-1 elevation-0"
                          @click="toShowSwiper(props.item.imageUrls)"
                        >
                          <v-container grid-list-sm class="pa-0" fluid>
                            <v-layout
                              v-if="props.item.imageUrls"
                              class="images-wrapper"
                              row
                              wrap
                            >
                              <v-flex
                                v-for="img in props.item.imageUrls"
                                :key="img"
                                xs6
                                d-flex
                              >
                                <v-card flat tile class="d-flex pa-0">
                                  <v-img
                                    :src="img"
                                    :lazy-src="img"
                                    aspect-ratio="1"
                                    class="grey lighten-2"
                                  >
                                    <template v-slot:placeholder>
                                      <v-layout
                                        fill-height
                                        align-center
                                        justify-center
                                        ma-0
                                      >
                                        <v-progress-circular
                                          indeterminate
                                          color="grey lighten-5"
                                        ></v-progress-circular>
                                      </v-layout>
                                    </template>
                                  </v-img>
                                </v-card>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card>
                      </div>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
              <div v-else class="both-center no-data-wrapper">
                <img src="../assets/images/no_data.jpg" alt="" />
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-card>

    <!-- report -->
    <v-card class="pa-3">
      <v-layout column>
        <v-flex>
          <v-tabs-items v-model="model" class="school-run-tabs">
            <v-tab-item value="tab-1">
              <v-card flat>
                <h3>
                  值周排行榜
                </h3>
                <v-card-title class="pa-1">
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="搜索"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="filteredTopItems"
                  class="elevation-0"
                  hide-actions
                  no-data-text="暂无数据..."
                  no-results-text="没有匹配的数据..."
                  :search="search"
                >
                  <template v-slot:items="props">
                    <td class="text-xs-right">
                      <!-- yellow--text text--accent-4 -->
                      <font-awesome-icon
                        :class="medalClass(props.item.ranking)"
                        v-if="showMedal(props.item.ranking)"
                        icon="medal"
                      />
                      {{ formatRanking(props.item.ranking) }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.classFullName }}
                    </td>
                    <td class="text-xs-right">{{ props.item.amountScore }}</td>
                    <td class="text-xs-right">
                      <v-rating
                        class="py-1"
                        color="accent"
                        background-color="grey darken-1"
                        dense
                        readonly
                        size="10"
                        v-model="props.item.starLevel"
                      ></v-rating>
                    </td>
                  </template>
                </v-data-table>
                <div class="text-xs-center">
                  <v-btn
                    v-if="showAllTopBtn"
                    outline
                    color="primary"
                    @click="viewAllTop"
                  >
                    查看全部
                  </v-btn>
                </div>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-card>

    <!-- bottom hint -->
    <v-layout row wrap class="bottom-hint pa-2">
      <v-flex class="grey--text text-xs-center">
        ~~~ 到底了 ~~~
      </v-flex>
    </v-layout>
    <v-snackbar v-model="showSnackbar" :color="color" :timeout="2000">
      {{ message }}
      <v-btn dark flat @click="showSnackbar = false">
        关闭
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import echarts, { EChartsResponsiveOption, EChartOption } from 'echarts'
import { dutyService } from '../services/duty.service'
import { TopItem } from '../models/duty-top.model'

import moment from 'moment'
import { userService } from '../services/user.service'
import { snackbarMixin } from '../mixins/snackbar.mixin'
moment.locale('zh-CN')

let now = moment().format('M月D日，A，h点m分')
console.log('TCL: now', now)

const TOP_NUM = 10

export default Vue.extend({
  mixins: [snackbarMixin],
  components: {},
  created() {
    this.loadTop()
  },
  data: function() {
    return {
      currentGrade: {
        label: '全部年级',
        value: '全部年级'
      },
      gradeItems: [
        {
          label: '全部年级',
          value: '全部年级'
        },
        {
          label: '一年级',
          value: '一年级'
        },
        {
          label: '二年级',
          value: '二年级'
        },
        {
          label: '三年级',
          value: '三年级'
        },
        {
          label: '四年级',
          value: '四年级'
        },
        {
          label: '五年级',
          value: '五年级'
        },
        {
          label: '六年级',
          value: '六年级'
        }
      ],
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
        {
          text: '得分',
          align: 'right',
          sortable: true,
          value: 'amountScore'
        },
        { text: '星级', align: 'right', sortable: true, value: 'starLevel' }
      ],
      topItems: [] as TopItem[],
      allTopItems: [] as TopItem[],
      showAllTopBtn: true,
      showLoading: false,
      search: '',
      showGradeMenu: false,
      classList: []
    }
  },
  computed: {
    filteredTopItems() {
      const that: any = this

      if (that.currentGrade.value === '全部年级') {
        return that.addRanking(that.topItems)
      }

      return that
        .addRanking(that.topItems)
        .filter(e => e.grade === that.currentGrade.value)
    },
    hasClasses() {
      const that: any = this
      return that.classList.length > 0
    }
  },
  methods: {
    onBack() {
      this.$router.push({
        name: 'home'
      })
    },
    goToDataCenterPage() {
      this.$router.push({
        name: 'data-center'
      })
    },
    loadTop() {
      this.showLoading = true
      dutyService
        .getDutyTop(0, 1000)
        .then(res => {
          this.allTopItems = res.data.content || []
          this.topItems = this.allTopItems ? this.allTopItems.slice(0, 10) : []
          this.showLoading = false
        })
        .finally(() => {
          this.showLoading = false
        })
    },
    viewAllTop() {
      this.topItems = this.allTopItems
      this.showAllTopBtn = false
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
    },
    showMedal(index: number) {
      return index === 1 || index === 2 || index === 3
    },
    medalClass(index: number) {
      let medalClass: string = ''

      switch (index) {
        case 1:
          medalClass = 'gold'
          break
        case 2:
          medalClass = 'sliver'
          break
        case 3:
          medalClass = 'copper'
          break
        default:
          break
      }

      return medalClass
    },
    formatRanking(ranking: number) {
      let title: string | number = ''

      switch (ranking) {
        case 1:
          title = '冠军'
          break
        case 2:
          title = '亚军'
          break
        case 3:
          title = '季军'
          break
        default:
          title = ranking
          break
      }
      return title
    },
    switchGrade(grade: { label: string; value: string }) {
      console.log('TCL: switchGrade -> grade', grade)
      this.currentGrade = grade
    },
    inDeveloping() {
      const that: any = this
      that.showMessage('此功能正在开发中，敬请期待...')
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

.loading-wrapper {
  position: absolute;
  z-index: 1000;
  width: 100%;
}

.gold {
  color: #ffc400;
}

.sliver {
  color: #b0bec5;
}

.copper {
  color: #f0ae98;
}

.menu-text {
  vertical-align: top;
}

.school-run-tabs.v-window {
  width: 100% !important;
}
</style>
