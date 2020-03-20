<template>
  <div>
    <template v-for="item in list">

      <el-submenu v-if="item.children && !item.redirect" :key="`menu_${item.name}`" :index="`${item.name}`">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <side-menu-item :list="item.children"></side-menu-item>
      </el-submenu>

      <!-- <el-menu-item v-else-if="item.children && item.redirect" :key="`menu_${item.name}`" :index="`${item.name}`" >
        <i :class="item.icon"></i>
        <span slot="title">{{item.children[0].meta.title}}</span>
      </el-menu-item> -->

      <el-menu-item v-else :key="`menu_${item.name}`" :index="`${item.name}`">
        <i v-if="item.meta.icon != ''" :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'sideMenuItem',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
