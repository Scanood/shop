<template>
  <div class="p-5">
    <span class="font-semibold">备注：</span>
    <el-scrollbar height="200px">
      <span class="font-mono">{{ note }}</span>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  props: ["note"],
};
</script>

<style>
</style>