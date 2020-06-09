<template>
  <div>
    <el-card class="base_card">
      <div class="base_card_header">
        <el-input v-model="value"></el-input>
        <el-button @click="handleClick" type="primary">Button</el-button>
      </div>
      <div class="base_card_body">
        <div v-text="value"></div>
        <div>{{ name }}</div>
        <div>{{ sex }}</div>
        <div>{{info}}</div>
      </div>
    </el-card>

    <el-card class="base_card">
      <div class="base_card_header">
        <el-button @click="handleArrChange">arr Button</el-button>
      </div>
      <div v-for="(value,key) in obj" :key="key">{{key}}-- {{value}}</div>
      ==============
      <div v-for="(item,index) in arr" :key="item">{{index}}--{{item}}</div>
    </el-card>

    <el-card class="base_card">
      <div class="base_card_header">
        <el-button @click="baseInfoChange" type="warning">Button</el-button>
      </div>
      <div class="base_card_body">
        <div
          v-for="item in baseInfo"
          :key="item.id"
        >
          name: {{item.name}}  age: {{item.age}}
        </div>
      </div>
    </el-card>

    <el-card class="base_card">
      <div class="base_card_header">
        <el-button
          @click="handleCatChange"
          type="danger">cat Button</el-button>
      </div>
      <div class="base_card_body">
        <div>{{cat.info}}</div>
      </div>
    </el-card>
  </div>
</template>
<script>
// import Vue from 'vue';
export default {
  name: '',
  data () {
    return {
      value: '',
      name: '李雷',
      sex: 'male',
      obj: {
        name: '张三',
        age: 18,
        sex: 'male'
      },
      arr: ['张三', '李四', '王五'],
      baseInfo: [
        { id: 1, name: '张三', age: 18 },
        { id: 2, name: '李四', age: 19 },
        { id: 3, name: '王五', age: 20 }
      ],
      cat: {}
    }
  },
  computed: {
    info () {
      return `${this.name}_ ${this.sex}`
    }
  },
  watch: {
    name (newVal, oldVal) {
      console.log('name change', newVal, oldVal)
    },
    baseInfo: {
      deep: true,
      handler () {
        console.log('baseInfo change')
      }
    }
  },
  methods: {
    handleClick () {
      this.name = this.name + this.value
    },
    handleArrChange () {
      // console.log(this.arr[1])
      // this.arr[1] = '赵六'  //不能修改， 但是能取到值。
      this.arr.splice(1, 1) // push, pop, unshift, shift, reverse, sort, splice(index,count,item)
    },
    baseInfoChange () {
      this.baseInfo[0].name = '王二麻子'
    },
    handleCatChange () {
      this.cat.info = '英国短毛猫'
      this.$forceUpdate()
      // Vue.set(this.cat, 'info', '英国短毛猫')
    }
  },
  created () {
    // console.log(111)
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
