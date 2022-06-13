<template>
  <el-form-item label="图片：">
    <el-upload
      list-type="picture-card"
      :auto-upload="false"
      :limit="1"
      :on-exceed="handleExceed"
      ref="upload"
      action="localhost:8080"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      accept="image/png, image/jpeg, image/jpg"
    >
      <el-icon><plus /></el-icon>
    </el-upload>
  </el-form-item>
</template>
<script setup>
import { reactive, ref, toRef, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import {IMG_URL} from "@/lib/config"
const upload = ref();
const props = defineProps({
  imgurl: String,
});
const url = toRef(props, "imgurl");

let fileList = reactive([]);
watch(url, () => {
  if (url.value !== "") {
    const oldfile = {
      name: "default",
      url,
    };
    oldfile.url = IMG_URL + url.value;
    fileList.push(oldfile);
  }
});
const uploadfiles = ref([]);
const handleExceed = (files) => {
  upload.value.clearFiles();
  upload.value.handleStart(files[0]);
};
const onChange = (file) => {
  uploadfiles.value[0] = file;
};
const onRemove = () => {
  uploadfiles.value.pop();
};
defineExpose({
  uploadfiles,
});
</script>