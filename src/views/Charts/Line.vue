<template>
  <div>
    <div v-if="show" >
      <div v-for="item in show" :key="item">{{item}}</div>
    </div>
    <div>{{ name }}</div>
    <div v-text="name"></div>
    <div>{{info}}</div>
    <button @click="handleClick">Change</button>
    <div v-for="(value,key) in obj" :key="key">{{key}}-- {{value}}</div>
    <div v-for="(item,index) in arr" :key="item">{{index}}--{{item}}</div>
    <div v-for="item in objArr" :key="item.id">name: {{item.name}}  age: {{item.age}}</div>
    <button @click="handleOAChange">OAchange</button>

    <div>{{cat.info.maose}}</div>
    <div v-for="item in cat.family" :key="item">{{item}}</div>
    <button @click="handleCatChange">change Cat</button>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      show: null,
      name: '李雷',
      sex: 'male',
      obj: {
        name: '张三',
        age: 18,
        sex: 'male'
      },
      arr: ['张三', '李四', '王五'],
      objArr: [
        { id: 1, name: '张三', age: 18 },
        { id: 2, name: '李四', age: 19 },
        { id: 3, name: '王五', age: 20 }
      ],
      cat: {
        info: {
          pinzhong: '加菲猫',
          maose: '黄色'
        },
        family: ['f', 'm', 'b', 's']
      }
    }
  },
  computed: {
    info () {
      return this.name + this.sex
    }
  },
  watch: {
    name (newVal, oldVal) {
      console.log('name change', newVal, oldVal)
    },
    objArr: {
      deep: true,
      handler () {
        console.log('objArr change')
      }
    }
  },
  methods: {
    handleClick () {
      this.name = this.name + 1
    },
    handleOAChange () {
      this.objArr[0].name = '王二麻子'
    },
    handleCatChange () {
      // this.cat.family[3] = 'dd'
      // this.$forceUpdate()
    }
  },
  created () {
    // console.log(111)
  }
}
</script>
