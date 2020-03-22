<template>
  <div>
    <el-dialog
      title="登录"
      :visible.sync="visible"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :show-close="false"
      width="400px"
    >
      <el-form :model="login_form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="login_form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="login_form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'login_modal',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      login_form: {}
    }
  },
  methods: {
    handleLogin () {
      this.$emit('login', this.login_form)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
