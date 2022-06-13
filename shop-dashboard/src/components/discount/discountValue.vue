<template>
  <div>
    <el-tag type="" round v-if="row.type == 'PERCENTAGE'">
      {{ row.value }}%
    </el-tag>
    <el-tag type="success" round v-if="row.type == 'FIXED'">
      {{ row.value }}￥
    </el-tag>
  </div>
</template>

<script>
export default {
  props: ["row"],
};
</script>