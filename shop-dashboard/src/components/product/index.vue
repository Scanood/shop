<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <div class="w-11/12 flex flex-row justify-between mb-10">
      <div class="font-black text-3xl">商品</div>
      <div>
        <el-button
          type="primary"
          plain
          size="large"
          @click="this.$router.push('/dashboard/product/add')"
          >添加新商品</el-button
        >
      </div>
    </div>
    <div class="w-11/12 mb-10">
      <ProductTable />
    </div>
  </div>
</template>
<script>
import ProductTable from "./productTable";
export default {
  name: "index-product",
  components: { ProductTable },
};
</script>
