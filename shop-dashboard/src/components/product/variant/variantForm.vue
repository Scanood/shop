<template>
  <el-form
    :model="productVariant"
    label-width="130px"
    ref="productVariantform"
    :rules="rules"
  >
    <el-form-item label="商品规格名称：" prop="name">
      <el-input v-model="productVariant.name"></el-input>
    </el-form-item>
    <el-form-item label="商品规格简介：">
      <el-input
        :rows="5"
        type="textarea"
        v-model="productVariant.description"
      ></el-input>
    </el-form-item>
    <Upload
      :imgurl="productVariant.productVariantImage"
      ref="uploadcomponent"
    />
    <el-form-item label="库存：">
      <el-input-number v-model="productVariant.stock" :min="0" />
    </el-form-item>
    <el-form-item label="价格：">
      <el-input-number
        v-model="productVariant.price"
        :precision="2"
        :step="0.1"
        :min="0.01"
        :controls="false"
      />
    </el-form-item>
    <el-form-item label="现价：" v-if="props.showDisCountPrice">
      <el-input-number
        v-model="productVariant.discountPrice"
        :precision="2"
        :step="0.1"
        :min="0.01"
        :controls="false"
        disabled
      />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { toRef, ref, watch, reactive } from "vue";
import Upload from "../../Upload";
const uploadcomponent = ref(null);
const props = defineProps({
  outproductVariant: Object,
  showDisCountPrice:Boolean
});
const productVariant = toRef(props, "outproductVariant");
const productVariantform = ref(null);
const rules = reactive({
  name: [
    {
      required: true,
      message: "名称不能为空！",
      trigger: "blur",
    },
  ],
});
defineExpose({
  uploadcomponent,
  productVariant,
  productVariantform,
});
</script>