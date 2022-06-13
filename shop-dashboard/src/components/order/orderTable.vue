<template>
  <div class="p-3">
    <el-table
      style="width: 100%; margin-bottom: 20px"
      row-key="variant.product.slug"
      :data="lines"
    >
      <el-table-column>
        <template #default="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="`${IMG_URL}${scope.row.variant.product.productImage}`"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="variant.product.name"
        label="商品信息"
        :formatter="formatName"
      />
      <el-table-column prop="price" label="原价" />
      <el-table-column prop="realPrice" label="折扣价" />
    </el-table>
    <div class="float-right mr-5 font-serif">共计：{{ totalPrice }}元</div>
  </div>
</template>

<script>
import { IMG_URL } from "@/lib/config";
export default {
  props: {
    lines: Array,
  },
  data() {
    return {
      IMG_URL,
    };
  },
  methods: {
    formatName(row) {
      const v = row.variant;
      return v.product.name + "[" + v.name + "] x " + row.quantiy;
    },
  },
  computed: {
    totalPrice() {
      return this.lines.reduce((price, line) => price + line.realPrice*line.quantiy, 0);
    },
  },
};
</script>

<style>
</style>