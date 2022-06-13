<template>
  <div>
    <el-tag :type="tagStyle">
      {{ orderStatus }}
    </el-tag>
  </div>
</template>
<script>
export default {
  props: ["scope"],
  computed: {
    orderStatus() {
      switch (this.scope.row.status) {
        case "UNFULFILLED":
          return "未付款";
        case "FULFILLED":
          return "已付款";
        case "CANCELED":
          return "已取消";
        case "REFUND":
          return "已退款";
        case "SHIPPED":
          return "已发货";
        case "RECEIVED":
          return "已收货";
      }
    },
    tagStyle() {
      switch (this.scope.row.status) {
        case "UNFULFILLED":
          return "danger";
        case "FULFILLED":
          return "success";
        case "CANCELED":
          return "warning";
        case "REFUND":
          return "info";
        case "SHIPPED":
          return "success";
        case "RECEIVED":
          return "success";
      }
    },
  },
};
</script>