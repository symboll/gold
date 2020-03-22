<template>
  <div class="about">
    <h1>This is an about page</h1>

    <child
      :pName="childName"
    />

    <input type="text" v-model="value">
    <button @click="handeChange">改变</button>
    <div>{{ fatherValue }}</div>
  </div>
</template>
<script>
import Child from './child'
export default {
  name: '',
  components: {
    Child
  },
  data () {
    return {
      childName: '子元素',
      value: '',
      fatherValue: ''
    }
  },
  methods: {
    handeChange () {
      // this.childName = this.value
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
</script>>
