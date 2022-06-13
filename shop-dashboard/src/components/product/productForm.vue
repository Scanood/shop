<template>
  <el-form
    :model="product"
    label-width="120px"
    ref="productform"
    :rules="rules"
  >
    <el-form-item label="商品名称：" prop="name">
      <el-input v-model="product.name"></el-input>
    </el-form-item>
    <el-form-item label="商品简介：">
      <el-input
        :rows="5"
        type="textarea"
        v-model="product.description"
      ></el-input>
    </el-form-item>
    <Upload :imgurl="product.productImage" ref="uploadcomponent" />
    <el-form-item label="商品种类：">
      <el-select v-model="category" placeholder="请选择商品种类。" clearable>
        <el-option
          v-for="category in categories.categories"
          :label="category.name"
          :value="category.slug"
          :key="category.slug"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { toRef, ref, watch, reactive } from "vue";
import Upload from "../Upload";
const uploadcomponent = ref(null);
const props = defineProps({
  outproduct: Object,
  outcategories: Object,
});
let category = ref(null);
const product = toRef(props, "outproduct");
const categories = toRef(props, "outcategories");
const productform = ref(null);
const rules = reactive({
  name: [
    {
      required: true,
      message: "产品名称不能为空！",
      trigger: "blur",
    },
  ],
});
watch(product, () => {
  if (product.value.category) category.value = product.value.category.slug;
});
defineExpose({
  category,
  product,
  uploadcomponent,
  productform,
});
</script>