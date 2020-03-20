<template>
  <div class="home">
    <el-button @click="handleClick">按钮</el-button>
  </div>
</template>
<script>
export default {
  name: 'home',
  components: {
  },
  methods: {
    handleClick () {
      this.$message({
        message: '点我',
        type: 'error'
      })
    }
  }
}
</script>
