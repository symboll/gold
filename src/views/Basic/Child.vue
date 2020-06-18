<template>
  <div>
    {{ childValue }}
  </div>
</template>
<script>
export default {
  name: 'child',
  props: {
    childValue: {
      type: String,
      default: ''
    }
  },
  beforeCreate () {
    console.log(2, this.$route)
    console.log('child beforeCreate')
  },
  created () {
    console.log('child created')
  },
  beforeMount () {
    console.log('child beforeMount')
  },
  mounted () {
    console.log('child mounted')
  },
  beforeUpdate () {
    console.log('child beforeUpdate')
  },
  updated () {
    console.log('child updated')
  }
}
</script>
