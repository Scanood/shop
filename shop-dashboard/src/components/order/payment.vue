<template>
  <div>
    <div v-if="!payment">
      <el-result
        icon="error"
        title="支付信息不存在"
        sub-title="当前订单未支付"
      />
    </div>
    <div v-else-if="!staffFill">
      <el-form class="w-3/5 ml-5 mt-5">
        <el-form-item label="交易单号：">
          <el-input disabled v-model="payment.outTradeNo" />
        </el-form-item>
        <el-form-item label="支付金额：">
          <el-input disabled v-model="payment.money" />
        </el-form-item>
        <el-form-item label="支付方式：">
          <span v-if="payment.method === 'ALIPAY'">支付宝</span>
          <span v-else-if="payment.method === 'WEXINPAY'">微信</span>
          <span v-else>无</span>
        </el-form-item>
        <el-form-item label="支付状态：">
          <el-tag type="success" v-if="payment.paid">已支付</el-tag>
          <el-tag type="danger" v-else>待支付</el-tag>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["payment", "staffFill"],
};
</script>

<style>
</style>