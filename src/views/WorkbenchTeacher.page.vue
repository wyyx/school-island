<template>
  <div class="container pa-0">
    <!-- <Header :showBack="true" title="工作台" @back="onBack"></Header> -->
    <v-card class="mb-2">
      <transition name="scale">
        <swiper
          @click="toCloseSwiper"
          :options="swiperOption"
          v-if="showSwiper"
        >
          <swiper-slide class="text-xs-center" v-for="img in imgs" :key="img">
            <img :src="img" style="width: 100%" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </transition>

      <v-layout column wrap>
        <!-- header -->
        <v-flex class="class-selector">
          <v-layout row wrap class="primary lighten-3 pa-2">
            <v-flex xs6>
              <div class="class-selection-box primary lighten-4 py-1 px-2">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      light
                      flat
                      v-on="on"
                      class="subheading"
                      @click="showClassMenu = !showClassMenu"
                    >
                      <span class="pr-1">
                        {{ currentClass.className }}
                      </span>

                      <v-icon v-if="showClassMenu">arrow_drop_up</v-icon>
                      <v-icon v-else>arrow_drop_down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(aclass, index) in classList"
                      :key="index"
                      @click="switchClass(aclass)"
                    >
                      <v-list-tile-title>{{
                        aclass.className
                      }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>

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
      </v-layout>
    </v-card>
    <!-- report and deduction list-->
    <v-card class="pa-3">
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
              <v-card flat>
                <h3>
                  上周综合得分
                  <span class="accent--text text--darken-2">8.5分</span>
                </h3>
                <h5 class="grey--text">超过 72% 的班级</h5>
                <!-- deduction week history graph -->
                <div v-if="hasHistory" id="chart" class="pt-3"></div>
                <div v-if="!hasHistory" class="loading-wrapper">
                  <v-progress-circular
                    indeterminate
                    color="accent"
                  ></v-progress-circular>
                  <!-- <p class="text-xs-center">暂无数据...</p> -->
                </div>
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
                  :items="deductionList"
                  class="elevation-0"
                  hide-actions
                  :search="search"
                  no-data-text="暂无数据..."
                  no-results-text="没有匹配的数据..."
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
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout row wrap v-if="loadingMore" class="bottom-hint pa-3">
      <v-flex class="h-center">
        <v-progress-circular indeterminate color="accent"></v-progress-circular>
      </v-flex>
    </v-layout>
    <!-- bottom hint -->
    <v-layout v-if="!hasMore" row wrap class="bottom-hint pa-3">
      <v-flex class="grey--text text-xs-center">
        ~~~ 到底了 ~~~
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '../components/Header.component.vue'
import echarts, {
  EChartsResponsiveOption,
  EChartOption,
  ECharts
} from 'echarts'
import { dutyService } from '../services/duty.service'
import { Deduction } from '../models/deduction-list.model'
import { ClassModel } from '../models/class.model'
import {
  DeductionHistoryByWeekResponse,
  DeductionHistoryByWeekItem
} from '../models/deduction-history-by-week.model'
import { COLORS } from '../configs/config'
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import moment from 'moment'
import { httpConfigService } from '../services/http-config.service'
import { userService } from '../services/user.service'
import { get } from 'vuex-pathify'
import { authModulePath, user, currentRole } from '../store/auth/auth.paths'
import { UserInfo } from '../models/user.model'
moment.locale('zh-CN')

interface Image {
  src: string
  thumbnail: string
  w: number
  h: number
  title: string
}
const PER_PAGE_SIZE = 20

export default Vue.extend({
  components: {
    swiper,
    swiperSlide
  },
  data: function() {
    return {
      currentClass: {} as ClassModel,
      classList: [] as ClassModel[],
      rating: 4,
      model: 'tab-1',
      headers: [
        {
          text: '时间',
          align: 'right',
          sortable: true,
          value: 'createTime'
        },
        { text: '类别', align: 'right', sortable: false, value: 'checkName' },
        { text: '扣分', align: 'right', sortable: true, value: 'changeScore' },
        { text: '备注', align: 'right', sortable: false, value: 'remarks' }
      ],
      deductionList: [] as Deduction[],
      deductionWeekHistory: [] as DeductionHistoryByWeekItem[],
      search: '',
      imgs: [
        'https://picsum.photos/1920/1080',
        'https://picsum.photos/1080/1920',
        'https://picsum.photos/800/400'
      ],
      images: [] as Image[],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      showSwiper: false,
      chart: {} as ECharts,
      loadingMore: false,
      hasMore: true,
      showClassMenu: false
    }
  },
  watch: {
    currentClass(newVal, oldVal) {
      console.log('TCL: currentClass -> newVal', newVal)
      const aclass = newVal as ClassModel
      this.loadDeducionList(aclass.classId)
      this.loadDeducionWeekHistory(aclass.classId)
    },
    showSwiper(newVal, oldVal) {
      // this.chart.resize()
    }
  },
  computed: {
    ...get(authModulePath, {
      user,
      currentRole
    }),
    legend() {
      const that: any = this
      return (
        that.deductionWeekHistory &&
        that.deductionWeekHistory.map(e => e.checkName)
      )
    },
    hasHistory() {
      const that: any = this
      return that.deductionWeekHistory && that.deductionWeekHistory.length > 0
    },
    series() {
      const that: any = this
      return that.converToSeries(that.deductionWeekHistory)
    }
  },
  created() {
    this.loadDeducionList(this.currentClass.classId)
    const that: any = this
    this.loadClassList((that.user as UserInfo).teacherId)
  },
  mounted() {
    console.log(
      'TCL: mounted -> this.currentClass.classId',
      this.currentClass.classId
    )

    this.scroll()
  },
  methods: {
    switchClass(aclass: ClassModel) {
      console.log('TCL: aclass', aclass)
      this.currentClass = aclass
      this.hasMore = true

      this.loadDeducionWeekHistory(this.currentClass.classId)
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.loadMore()
        }
      }
    },
    onBack() {
      this.$router.push({
        name: 'home'
      })
    },
    formatDate(date) {
      return moment(date).format('M月D日 kk:mm')
    },
    converToSeries(weekHistory: DeductionHistoryByWeekItem[]) {
      const series = weekHistory.map((e: DeductionHistoryByWeekItem) => {
        return {
          name: e.checkName,
          type: 'line',
          data: e.scores,
          itemStyle: {
            color: '#2196F3'
          }
        }
      })

      // set different colors for each category
      for (let index = 0; index < series.length; index++) {
        const element: {
          name: string
          type: string
          data: number[]
          itemStyle: {
            color: string
          }
        } = series[index]

        element.itemStyle.color = COLORS[index]
      }

      return series
    },
    convertToImages(imgUrls: string[]) {
      return imgUrls
        ? imgUrls.map(url => {
            return {
              src: url,
              thumbnail: url,
              w: 300,
              h: 300,
              title: ''
            } as Image
          })
        : []
    },
    initEcharts() {
      let chart = echarts.init(document.getElementById(
        'chart'
      ) as HTMLDivElement)
      this.chart = chart
      // specify chart configuration item and data
      const that: any = this

      var option: EChartOption = {
        tooltip: {},
        legend: {
          data: that.legend
        },
        xAxis: {
          data: ['星期一', '星期二', '星期三', '星期四', '星期五']
        },
        yAxis: {},
        series: that.series
      }

      // use configuration item and data specified to show chart
      chart.setOption(option)
    },
    loadDeducionList(
      classId: number,
      pageNum: number = 0,
      pageSize: number = 20
    ) {
      dutyService
        .getDeductionList(classId, pageNum, PER_PAGE_SIZE)
        .then(res => {
          this.deductionList = res.data.content || []
        })
    },
    loadClassList(teacherId: number) {
      dutyService.getClassList(teacherId).then(res => {
        this.classList = res.data.content || []

        // show first class default
        const firstClass =
          this.classList.length > 0 ? this.classList[0] : ({} as ClassModel)

        this.switchClass(firstClass)
      })
    },
    loadDeducionWeekHistory(classId: number) {
      dutyService.getDeductionHistoryByWeek(classId).then(res => {
        this.deductionWeekHistory = res.data.content

        this.initEcharts()
      })
    },
    toShowSwiper(imgUrls: string[]) {
      console.log('TCL: toShowSwiper -> imgUrls', imgUrls)
      this.showSwiper = true
      this.imgs = imgUrls
    },
    toCloseSwiper() {
      this.showSwiper = false
    },
    showThumbnail(imgUrls: string[]) {
      return imgUrls && imgUrls.length > 0
    },
    loadMore() {
      console.log('loadMore')

      // return when no more data
      if (!this.hasMore) {
        return
      }

      // return when is loading more
      if (this.loadingMore) {
        return
      }

      // loading more when reaching page bottom
      this.showLoadingMore()

      const currentPageIndex = Math.ceil(
        this.deductionList.length / PER_PAGE_SIZE - 1
      )

      console.log('TCL: loadMore -> currentPageIndex', currentPageIndex)

      setTimeout(() => {
        dutyService
          .getDeductionList(
            this.currentClass.classId,
            currentPageIndex + 1,
            PER_PAGE_SIZE
          )
          .then(res => {
            const newDeductionList = res.data.content || []
            console.log('TCL: loadMore -> newDeductionList', newDeductionList)
            if (newDeductionList.length < 1) {
              this.hasMore = false
            }

            this.deductionList = this.deductionList.concat(newDeductionList)

            this.hideLoadingMore()
          })
          .catch(err => {
            this.hideLoadingMore()
          })
      }, 2000)
    },
    showLoadingMore() {
      this.loadingMore = true
    },
    hideLoadingMore() {
      this.loadingMore = false
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

.note-image {
  width: 100%;
}

.image-wrapper {
  padding: 1px;
}

.images-wrapper {
  padding: 1px;
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

.loading-wrapper {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container.grid-list-sm .layout .flex {
  padding: 1px;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
