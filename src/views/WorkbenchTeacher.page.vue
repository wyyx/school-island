<template>
  <div class="container pa-0">
    <v-speed-dial
      class="teacher-helper"
      fixed
      bottom
      right
      direction="left"
      transition="slide-x-reverse-transition"
      origin="bottom"
    >
      <template v-slot:activator>
        <v-btn color="accent" dark fab @click="showAdd = !showAdd">
          <v-icon>add</v-icon>
          <!-- <v-icon v-else>close</v-icon> -->
        </v-btn>
      </template>
      <v-btn @click="goToGradeInputPage" color="accent"> 录入成绩 </v-btn>
    </v-speed-dial>

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
        <v-flex v-if="hasClasses" class="class-selector">
          <v-layout row wrap class="primary lighten-3 pa-2">
            <v-flex xs6>
              <div class="class-selection-box primary lighten-4 pa-2">
                <v-select
                  v-model="currentClass"
                  :items="classList"
                  item-text="className"
                  item-value="classId"
                  :return-object="true"
                  :hide-details="true"
                ></v-select>
              </div>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex app-shrink class="pr-2">
              <v-layout :align-center="true" app-fill-height wrap="false">
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
                      <v-list-tile class="clickable">
                        <v-list-tile-title @click="goToMyClassesPage">
                          <v-icon>insert_chart_outlined</v-icon>
                          <span class="menu-text pl-2">看成绩</span>
                        </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex v-else class="no-classes">
          <v-layout row wrap class="primary lighten-3 pa-2">
            <v-flex xs6>
              <div class="class-selection-box primary lighten-4 py-1 px-2">
                暂无任教班级
              </div>
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
            <v-flex app-shrink>
              <v-tabs v-model="model" centered slider-color="primary">
                <v-tab href="#tab-1">
                  值周
                </v-tab>
              </v-tabs>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-tabs-items v-model="model">
            <v-tab-item value="tab-1">
              <v-card v-if="hasClasses" flat>
                <!-- duty check one week -->
                <!-- deduction week history graph -->
                <div class="chart-wrapper app-fill-width pb-3">
                  <h3 class="mb-2 duty-check-title">
                    {{ deductionWeekHistory.date }}，值周综合得分
                    <span class="accent--text text--darken-2">
                      {{ deductionWeekHistory.weekScore }}分
                    </span>
                  </h3>
                  <div class="duty-check-image">
                    <v-layout row wrap class="duty-check-content">
                      <v-flex
                        class="text-xs-center"
                        v-for="(score, index) in deductionWeekHistory.scores"
                        :key="index"
                      >
                        <div class="white--text display-1">
                          {{ score }}
                        </div>
                        <div class="pt-3">{{ getDayName(index) }}</div>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
                <div v-if="0" class="loading-wrapper">
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
                                        app-fill-height
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
              <div v-else class="app-both-center no-data-wrapper">
                <img src="../assets/images/no_data.jpg" alt="" />
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout row wrap v-if="loadingMore" class="bottom-hint pa-3">
      <v-flex class="app-h-center">
        <v-progress-circular indeterminate color="accent"></v-progress-circular>
      </v-flex>
    </v-layout>
    <!-- bottom hint -->
    <v-layout v-if="!hasMore" row wrap class="bottom-hint pa-3">
      <v-flex class="grey--text text-xs-center">
        <div class="text-xs-center">
          ~~~ 到底了 ~~~
        </div>
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
import {
  authModulePath,
  user,
  currentRole,
  showTabs
} from '../store/auth/auth.paths'
import { classesModulePath, classList } from '../store/classes/classes.paths'
import { UserInfo } from '../models/user.model'
import { snackbarMixin } from '../mixins/snackbar.mixin'
import { storeService } from '../services/store.service'
import Chart from '@/components/Chart.component.vue'

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
  mixins: [snackbarMixin],
  components: {
    swiper,
    swiperSlide
    // Chart
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     console.log('yyyyyyyyyyy')
  //     const store: any = vm.$store
  //     store.set(authModulePath + showTabs, true)
  //   })
  // },
  data: function() {
    return {
      showAdd: true,
      currentClass: {} as ClassModel,
      classList: [] as ClassModel[],
      rating: 4,
      model: 'tab-1',
      headers: [
        {
          text: '时间',
          align: 'right',
          sortable: true,
          value: 'createTime',
          sort: 'asc'
        },
        { text: '类别', align: 'right', sortable: false, value: 'checkName' },
        { text: '扣分', align: 'right', sortable: true, value: 'changeScore' },
        { text: '备注', align: 'right', sortable: false, value: 'remarks' }
      ],
      pagination: { sortBy: 'createTime', descending: true, rowsPerPage: -1 },
      deductionListEntities: {} as { [classId: number]: Deduction[] },
      deductionWeekHistory: {} as DeductionHistoryByWeekItem,
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
      loadingMore: false,
      hasMore: true,
      showClassMenu: false,
      chart: {} as ECharts,
      chartOption: null as EChartOption,
      fab: false,
      tab: 0
    }
  },
  watch: {
    currentClass(newVal, oldVal) {
      console.log('TCL: currentClass -> newVal', newVal)
      const aclass = newVal as ClassModel
      this.loadDeducionList(aclass.classId)
      this.loadDeducionWeekHistory(aclass.classId)
    },
    showSwiper(newVal, oldVal) {}
  },
  computed: {
    ...get(authModulePath, {
      user,
      currentRole
    }),
    currentDeductionList() {
      const that: any = this
      return that.deductionListEntities[that.currentClass.classId] || []
    },
    hasClasses() {
      const that: any = this
      return that.classList.length > 0
    },
    dateTitle() {
      const that: any = this
      const deductionWeekHistory =
        (that.deductionWeekHistory as DeductionHistoryByWeekItem) ||
        ({} as DeductionHistoryByWeekItem)
      const arr = deductionWeekHistory.date
        ? deductionWeekHistory.date.split('~')
        : ['']
      const day1 = arr[0] ? arr[0] + '日' : ''
      const day2 = arr[1] ? arr[1] + '日' : ''

      console.log('TCL: dateTitle -> arr', arr)
      return day1 + day2
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
    getRandomNum() {
      return Date.now() * Math.random()
    },
    getDayName(index: number) {
      switch (index) {
        case 0:
          return '星期一'
        case 1:
          return '星期二'
        case 2:
          return '星期三'
        case 3:
          return '星期四'
        case 4:
          return '星期五'
        default:
          return ''
      }
    },
    goToGradeInputPage() {
      this.$router.push({
        name: 'grade-input'
      })
    },

    goToMyClassesPage() {
      console.log('TCL: goToMyClassesPage -> goToMyClassesPage')
      this.$router.push({
        name: 'my-classes',
        params: {
          initClassId: this.currentClass.classId.toString()
        }
      })
    },
    setClass(aclass: ClassModel) {
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
    updateChart() {
      const that: any = this

      this.chartOption = {
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
    },
    loadDeducionList(
      classId: number,
      pageNum: number = 1,
      pageSize: number = 20
    ) {
      dutyService
        .getDeductionList(classId, pageNum, PER_PAGE_SIZE)
        .then(res => {
          const deductionList = res.data.content || []
          this.deductionListEntities = {
            ...this.deductionListEntities,
            [classId]: deductionList
          }
        })
    },
    loadClassList(teacherId: number) {
      dutyService.getClassList(teacherId).then(res => {
        this.classList = res.data.content || []
        console.log('TCL: loadClassList -> res.data.content', res.data.content)

        // save classList to store
        storeService.store.set(classesModulePath + classList, this.classList)

        // show first class default
        const firstClass =
          this.classList.length > 0 ? this.classList[0] : ({} as ClassModel)

        this.setClass(firstClass)
      })
    },
    loadDeducionWeekHistory(classId: number) {
      dutyService
        .getDeductionHistoryByWeek(classId)
        .then(res => {
          console.log('TCL: loadDeducionWeekHistory -> res', res)
          this.deductionWeekHistory =
            res.data.content || ({} as DeductionHistoryByWeekItem)
        })
        .catch(error => {})
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

      const that: any = this

      const currentPage = Math.ceil(
        that.currentDeductionList.length / PER_PAGE_SIZE
      )
      console.log('TCL: loadMore -> currentPage', currentPage)

      setTimeout(() => {
        dutyService
          .getDeductionList(
            this.currentClass.classId,
            currentPage + 1,
            PER_PAGE_SIZE
          )
          .then(res => {
            const newDeductionList = res.data.content || []
            console.log('TCL: loadMore -> newDeductionList', newDeductionList)
            if (newDeductionList.length < 1) {
              this.hasMore = false
            }

            let tempDeductionList = this.currentDeductionList
            console.log(
              'TCL: loadMore -> this.currentDeductionList',
              this.currentDeductionList
            )

            this.deductionListEntities[
              this.currentClass.classId
            ] = tempDeductionList.concat(newDeductionList)

            this.hideLoadingMore()
          })
          .catch(err => {
            this.hideLoadingMore()
          })
      }, 0)
    },
    showLoadingMore() {
      this.loadingMore = true
    },
    hideLoadingMore() {
      this.loadingMore = false
    },
    inDeveloping() {
      const that: any = this
      that.showMessage('此功能正在开发中，敬请期待...')
    }
  }
})
</script>

<style lang="scss" scoped>
.duty-check-title {
  position: relative;
  left: 10px;
  top: 20px;
}

.duty-check-content {
  position: relative;
  top: -80px;
}
.duty-check-image {
  width: 100%;
  padding-top: 60.9271%;
  background-image: url(../assets/images/duty_check_bg.jpg);
  background-size: contain;
  height: 0px;
}

.teacher-helper {
  position: fixed !important;
  right: 1rem !important;
  bottom: 5rem !important;
  z-index: 5000 !important;
}

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

.menu-text {
  vertical-align: top;
}
</style>
