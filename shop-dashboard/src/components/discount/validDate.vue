<template>
  <div>
    <div v-if="validate">
      <el-tooltip content="进行中" placement="top">
        <el-icon color="#529b2e"><circle-check-filled /></el-icon>
      </el-tooltip>
    </div>
    <div v-else>
      <el-tooltip content="已结束" placement="top">
        <el-icon color="#f56c6c"><circle-close-filled /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { CircleCheckFilled, CircleCloseFilled } from "@element-plus/icons-vue";
export default {
  props: ["row"],
  components: {
    CircleCheckFilled,
    CircleCloseFilled,
  },
  computed: {
    validate() {
      const begin = this.row.startDate;
      const end = this.row.endDate;
      const now = dayjs();
      if (end) return now.isAfter(begin) && now.isBefore(end);
      else return now.isAfter(begin);
    },
  },
};
</script>

<style>
</style>