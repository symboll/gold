<template>
  <div>
    用户列表
    <!-- <el-table>
      <el-table-item></el-table-item>
    </el-table> -->
  </div>
</template>
<script>
import { getUserList } from '@/api/apple.js'
export default {
  name: '',
  data () {
    return {

    }
  },
  methods: {
    getUserList () {
      getUserList().then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getUserList()
  }
}
</script>
