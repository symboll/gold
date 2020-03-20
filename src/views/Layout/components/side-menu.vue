<template>
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper" > -->
    <el-menu
      unique-opened
      background-color="#111948"
      text-color="#fff"
      class="el_menu_custom"
      @select="handleSelect"
    >
      <side-menu-item :list="router"></side-menu-item>
    </el-menu>
  <!-- </el-scrollbar> -->
</template>
<script>
import sideMenuItem from './side-menu-item'
import { mapState } from 'vuex'
export default {
  name: 'SideMenu',
  components: {
    sideMenuItem
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      router: state => state.router
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      if (this.$route.name === key) {
        return
      }
      this.$router.push({ name: key })
    }
  }
}
</script>
<style lang="scss" scoped>
.el_menu_custom{
  width:220px;
}
</style>
