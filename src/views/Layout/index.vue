<template>
  <el-container class="container_wrapper">
    <el-aside >
      <side-menu />
    </el-aside>

    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import SideMenu from './components/side-menu'
export default {
  name: 'layout',
  components: {
    SideMenu
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.container_wrapper{
  height: 100vh;
}
.el-aside{
  width: 220px  !important;
  height: 100vh;
  background:#111948;
  overflow: auto;
}
.el-main {
  padding: 0px;
}
</style>
