<template>
  <div class="operation-area w-4/5 m-auto">
    <div class="operation">
      <el-button
        type="primary"
        style="margin-right: 30px"
        @click="this.updateMethod"
        >{{ title }}</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  props: ["updateMethod", "title"],
};
</script>
<style scoped>
.operation {
  box-shadow: 0 -24px 20px -20px rgba(0, 0, 0, 0.15);
  margin: auto;
  border-radius: 0.5rem;
  @apply w-11/12 h-16 flex flex-row-reverse justify-start items-center;
}
.operation-area {
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 99999;
}
</style>