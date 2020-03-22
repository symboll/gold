<template>
  <div>
    <slot name="title"></slot>
    <span :id="elementId" :class="classGroup" ref="countTo"></span>
    <slot name="icon"></slot>
  </div>
</template>
<script>
import CountUp from 'countup'
export default {
  name: '',
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      required: true
    },
    /***
     * @description 小数点后保留几位
     */
    decimals: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1
    },
    delay: {
      type: Number,
      default: 0
    },
    useEasing: {
      type: Boolean,
      default: false
    },
    useGrouping: {
      type: Boolean,
      default: true
    },
    separator: {
      type: String,
      default: ','
    },
    /***
     * @description 整数和小数分隔符号
     */
    decimal: {
      type: String,
      default: '.'
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      counter: null
    }
  },
  computed: {
    elementId () {
      return `count_up_${this._uid}`
    },
    classGroup () {
      return [
        'count_style',
        this.className
      ]
    }
  },
  methods: {
    getCount () {
      // console.log(this.$refs.countTo.innerText)
      return this.$refs.countTo.innerText
    }
  },
  watch: {
    endVal (newVal, oldVal) {
      this.counter.update(newVal)
    }
  },
  updated () {
    // this.counter.update(this.endVal)
  },
  mounted () {
    this.$nextTick(() => {
      this.counter = new CountUp(this.elementId, this.startVal, this.endVal, this.decimals, this.duration, {
        useEasing: this.useEasing,
        useGrouping: this.useGrouping,
        separator: this.separator,
        decimal: this.decimal
      })
      this.counter.start()
    })
  }
}
</script>
