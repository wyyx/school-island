<template>
  <div ref="chart" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import echarts, { EChartOption, ECharts } from 'echarts'

export default Vue.extend({
  props: {
    option: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      chart: {} as ECharts
    }
  },
  watch: {
    option(newVal, oldVal) {
      if (newVal) {
        this.chart.setOption(newVal)
      }
    }
  },
  created() {},
  mounted() {
    this.initEcharts(this.option)
  },
  methods: {
    initEcharts(option: EChartOption) {
      this.chart = echarts.init(this.$refs.chart as HTMLDivElement)
      this.chart.setOption(option)

      window.addEventListener('resize', () => {
        this.chart.resize()
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
