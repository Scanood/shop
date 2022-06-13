<template>
  <div class="flex flex-row">
    <BasicCount />
    <OrderSummary />
  </div>
</template>

<script>
import OrderSummary from "@/components/dashboard/orderSummary";
import BasicCount from "@/components/dashboard/basicCount";
export default {
  components: {
    OrderSummary,
    BasicCount,
  },
};
</script>

<style>
</style>