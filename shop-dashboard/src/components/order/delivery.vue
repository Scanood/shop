<template>
  <div class="dilivery flex flex-row justify-start items-center p-5">
    <!-- 取消订单 -->
    <el-popconfirm
      title="确定取消当前订单吗？"
      confirm-button-text="删除"
      cancel-button-text="取消"
      @confirm="updateOrderStatus('CANCELED')"
      v-if="allowCanceled"
    >
      <template #reference>
        <el-button type="primary" plain>取消</el-button>
      </template>
    </el-popconfirm>

    <!-- 发货 -->
    <el-popconfirm
      title="确定发货吗？"
      confirm-button-text="确定"
      cancel-button-text="取消"
      @confirm="updateOrderStatus('SHIPPED')"
      v-if="allowShipped"
    >
      <template #reference>
        <el-button type="primary" plain v-if="allowShipped">发货</el-button>
      </template>
    </el-popconfirm>

    <div>
      <el-alert
        title="当前订单已取消！"
        type="warning"
        :closable="false"
        v-if="this.status == 'CANCELED'"
      />
      <el-alert
        title="当前订单已退款！"
        type="warning"
        :closable="false"
        v-if="this.status == 'REFUND'"
      />
      <el-alert
        title="当前订单已签收！"
        type="success"
        :closable="false"
        v-if="this.status == 'RECEIVED'"
      />
      <el-alert
        title="商品运输中！"
        type="success"
        :closable="false"
        v-if="this.status == 'SHIPPED'"
      />
    </div>
    <div v-if="this.status == 'SHIPPED'" class="flex w-3/5">
      <el-input v-model="vShipping" placeholder="输入快递单号" />
      <el-button @click="updateOrderShipping">更新</el-button>
    </div>
  </div>
</template>

<script>
import {
  UPDATEORDERSTATUS,
  UPDATEORDERSHIPPING,
} from "@/graphql/order/mutations";
import { ElMessage } from "element-plus";
export default {
  props: ["token", "status", "shipping"],
  data() {
    return {
      vShipping: null,
    };
  },
   watch:{
  shipping:function(newVal,oldVal){
    this.vShipping = newVal;
  }
},
  computed: {
    //允许取消
    allowCanceled() {
      const allowArray = ["UNFULFILLED", "FULFILLED"];
      return allowArray.includes(this.status);
    },
    // 允许配送
    allowShipped() {
      const allowArray = ["FULFILLED"];
      return allowArray.includes(this.status);
    },
  },
  methods: {
    updateOrderStatus(status) {
      const order = this.token;
      this.$apollo
        .mutate({
          mutation: UPDATEORDERSTATUS,
          variables: {
            order,
            status,
          },
        })
        .then((res) => {
          ElMessage({
            message: res.data.OrderUpdateStatus.msg,
            type: "success",
          });
          setTimeout(() => location.reload(), 2000);
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    },

    updateOrderShipping() {
      const token = this.token;
      const shipping = this.vShipping;
      if (!shipping) {
        ElMessage.error("快递单号不能为空！");
        return;
      }
      this.$apollo
        .mutate({
          mutation: UPDATEORDERSHIPPING,
          variables: {
            shipping,
            token,
          },
        })
        .then(({ data }) => {
          if (data.OrderShippingUpdate.success) {
            ElMessage({
              message: "快递单号更新成功！",
              type: "success",
            });
            setTimeout(() => location.reload(), 1000);
          }
          else  ElMessage.error("快递单号更新失败！");
        });
    },
  },
};
</script>

<style>
.dilivery {
  min-height: 100px;
}
</style>