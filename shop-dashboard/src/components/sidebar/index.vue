<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#304156"
    :default-active="defaultActive"
    text-color="#fff"
    :collapse="state"
    :collapse-transition="false"
    mode="vertical"
    router
  >
    <el-menu-item index="/dashboard/">
      <el-icon><home-filled /></el-icon>
      <span>Dashboard</span>
    </el-menu-item>
    <el-menu-item index="/dashboard/category/">
      <el-icon><reading-lamp /></el-icon>
      <span>种类管理</span>
    </el-menu-item>
    <el-menu-item index="/dashboard/product/">
      <el-icon><shopping-bag /></el-icon>
      <span>商品管理</span>
    </el-menu-item>
    <el-menu-item index="/dashboard/order/">
      <el-icon><suitcase /></el-icon>
      <span>订单管理</span>
    </el-menu-item>
    <el-menu-item index="/dashboard/user/">
      <el-icon><user-filled /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="/dashboard/discount/">
      <el-icon><ticket /></el-icon>
      <span>商城优惠</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
import {
  HomeFilled,
  ReadingLamp,
  UserFilled,
  Ticket,
  Suitcase,
  ShoppingBag,
} from "@element-plus/icons-vue";
import { MENUCOLLAPSESTATE } from "@/graphql/Hamburger/queries";
export default {
  components: {
    HomeFilled,
    ReadingLamp,
    UserFilled,
    Ticket,
    Suitcase,
    ShoppingBag,
  },
  data() {
    return {
      state: true,
      defaultActive: "/dashboard/",
    };
  },
  created() {
    // 使用正则进行选中菜单栏初始化
    const url = this.$route.path;
    const pattern = new RegExp("/dashboard/((.*?)/)?");
    this.defaultActive = url.match(pattern)[0];
  },
  apollo: {
    state: {
      query: MENUCOLLAPSESTATE,
      variables: {
        id: 1,
      },
      update(data) {
        return data.state;
      },
      fetchPolicy: "cache-only",
    },
  },
};
</script>
<style scoped>
</style>