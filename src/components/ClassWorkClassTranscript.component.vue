<template>
  <div>
    <span>年级综合排名第7位</span>
    <ve-histogram :data="chartData"></ve-histogram>
  </div>
</template>

<script>
export default {
  name: 'ClassWorkClassTranscript',
  components: {},
  props: {},
  data() {
    return {
      chartData: {
        columns: ['访问用户', '成绩排名'],
        rows: [
          { 访问用户: 2, 成绩排名: 1 },
          { 访问用户: 3, 成绩排名: 2 },
          { 访问用户: 4, 成绩排名: 3 },
          { 访问用户: 6, 成绩排名: 4 },
          { 访问用户: 8, 成绩排名: 5 },
          { 访问用户: 9, 成绩排名: 6 },
          { 访问用户: 10, 成绩排名: 7 }
        ]
      }
    }
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
}
</script>

<style scoped lang="scss"></style>
