<template>
  <div>
    <div :options="pieOptions"  ref="pie" ></div>
  </div>
</template>
<script>
import Highcharts3d from 'highcharts/highcharts-3d'
// const Highcharts = require('highcharts')
import Highcharts from 'highcharts'
export default {
  name: 'pie',
  props: {
    title: {
      type: String,
      require: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    seriesName: {
      type: String,
      require: true
    },
    seriesData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    seriesData () {
      this.pieChart.update({
        series: [{
          data: this.seriesData
        }]
      })
    }
  },
  data () {
    return {
      pieChart: null,
      pieOptions: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: this.title
        },
        subtitle: {
          text: this.subtitle
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [{
          name: this.seriesName,
          data: this.seriesData
        }]
      }
    }
  },
  methods: {

  },
  mounted () {
    Highcharts3d(Highcharts)
    this.pieChart = Highcharts.chart(this.$refs.pie, this.pieOptions)
  },
  destroyed () {
    this.pieOptions = null
  }
}
</script>
