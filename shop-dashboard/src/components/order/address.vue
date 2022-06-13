<template>
  <div class="p-5">
    <span class="font-semibold">收货信息：</span>
    <el-scrollbar height="100px" class="font-serif">
      <span>{{ address.province }}</span>-
      <span>{{ address.city }}</span>-
      <span>{{ address.streetAddress }}</span>
      <div>联系方式：{{ address.phone }}</div>
      <div>收件人：{{address.lastName}}{{address.firstName}}</div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: ["address"],
};
</script>

<style>
</style>