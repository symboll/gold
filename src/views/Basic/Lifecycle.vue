<template>
  <el-card class="base_card">
    <div class="base_card_header">
      <el-input v-model="value"></el-input>
      <el-button @click="handeChange" type="primary">Button</el-button>
    </div>
    <div class="base_card_body">
      <child :childValue="childValue" @hook:mounted="handleChildMounted" ></child>
      <div>{{ fatherValue }}</div>
    </div>
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
    handleChildMounted () {
      console.log('child mounted @ father component consolelog')
    },
    handeChange () {
      // this.childValue = this.value
      this.fatherValue = this.value
    }
  },
  beforeCreate () {
    console.log(1, this.$route)
    console.log('->', this.$router)
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
.base_card{
  margin: 10px;
  width: 400px;
  &_header{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &_body{
    margin: 10px;
    >div{
      height: 40px;
    }
  }
}
</style>
