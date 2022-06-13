<template>
  <el-form :model="category" label-width="120px" ref="formrules" :rules="rules">
    <el-form-item label="种类名称：" prop="name">
      <el-input v-model="category.name"></el-input>
    </el-form-item>
    <el-form-item label="描述信息：">
      <el-input
        :rows="5"
        type="textarea"
        v-model="category.description"
      ></el-input>
    </el-form-item>
    <Upload :imgurl="category.backgroundImage" ref="uploadcomponent" />
    <el-form-item label="父级种类：">
      <el-select v-model="parent" placeholder="请选择父级种类。" clearable>
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
const formrules = ref(null)
const rules=reactive({
name:[
  {
    required:true,
    message:"种类名称不能为空！",
    trigger:'blur'
  }
]
})
const props = defineProps({
  outCategory: Object,
  outCategories: Object,
  outParent: String,
});
// ref 接受一个内部值并返回一个响应式且可变的 ref 对象
// toRef 为源响应对象创建一个ref
const category = toRef(props, "outCategory");
const categories = toRef(props, "outCategories");
const outParent = toRef(props, "outParent");
const parent = ref("");
watch(outParent, () => {
  if (outParent.value != "") parent.value = outParent.value;
});
defineExpose({
  parent,
  category,
  uploadcomponent,
  formrules,
});
</script>