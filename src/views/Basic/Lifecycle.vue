<template>
  <el-card class="wrapper">
    <div class="header">
      <el-input type="text" v-model="value" />
      <el-button @click="handeChange">改变</el-button>
    </div>

    <child :childValue="childValue" />
    <div>{{ fatherValue }}</div>
  </el-card>
</template>
<script>
import Child from './Child'
export default {
  name: '',
  components: {
    Child
  },
  data () {
    return {
      value: '',
      childValue: '子元素',
      fatherValue: ''
    }
  },
  methods: {
    handeChange () {
      // this.childValue = this.value
      this.fatherValue = this.value
    }
  },
  beforeCreate () {
    console.log('father beforeCreate')
  },
  created () {
    console.log('father created')
  },
  beforeMount () {
    console.log('father beforeMount')
  },
  mounted () {
    console.log('father mounted')
  },
  beforeUpdate () {
    console.log('father beforeUpdate')
  },
  updated () {
    console.log('father updated')
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  margin: 20px;
  .header{
    display: flex;
  }
}
</style>
