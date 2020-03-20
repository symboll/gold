<template>
  <div>
    <count-up
      :end-val="endVal"
      className="color_red"
      ref="countup"
      @on-animation-end="handleAnimationEnd"
      >
      <span slot="title">总金额</span>
      <span slot="icon">元</span>
    </count-up>
    <button @click="handleAdd">增加10000</button>
    <button @click="handleConsole">打印当前数值</button>
  </div>
</template>
<script>
import CountUp from '_c/count-up'
export default {
  name: '',
  components: {
    CountUp
  },
  data () {
    return {
      endVal: 1000
    }
  },
  methods: {
    handleAdd () {
      this.endVal += 1000
    },
    handleConsole () {
      this.$refs.countup.getCount()
    },
    handleAnimationEnd (number) {
      console.log('number', number)
    }
  }
}
</script>
