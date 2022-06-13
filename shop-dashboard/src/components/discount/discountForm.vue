<template>
  <div>
    <div>
      <el-form>
        <el-form-item label="折扣名称：">
          <el-input v-model="insideDiscount.name" />
        </el-form-item>
        <el-form-item label="折扣方式：">
          <el-radio-group
            v-model="insideDiscount.type"
            @change="inputTypeChange"
          >
            <el-radio label="FIXED">固定金额</el-radio>
            <el-radio label="PERCENTAGE">固定比例</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="折扣数值：">
          <el-input-number
            v-model="insideDiscount.value"
            :min="0"
            :max="inputMax"
          />
        </el-form-item>
        <el-form-item label="起始时间：">
          <el-date-picker
            v-model="insideDiscount.startDate"
            type="datetime"
            placeholder="选择活动起始时间"
          />
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            v-model="insideDiscount.endDate"
            type="datetime"
            placeholder="选择活动结束时间"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { DeepCopy } from "../utils";
export default {
  props: ["discount"],
  data() {
    return {
     
      insideDiscount: {
        name: "",
        type: null,
        value: 0,
        startDate: null,
        endDate: null,
      },
    };
  },
  watch: {
    discount: {
      handler(newValue) {
        this.insideDiscount = DeepCopy(newValue);
      },
      immediate: true,
    },
  },
  computed: {
    // 根据当前选择的折扣方式计算数值最大值
    inputMax() {
      if (this.insideDiscount.type == "PERCENTAGE") return 100;
      else return NaN;
    },
  },
  methods: {
    // 切换折扣方式后进行数值的改变
    inputTypeChange(type) {
      if (type == "PERCENTAGE" && this.insideDiscount.value > 100)
        this.insideDiscount.value = 100;
    },
  },
};
</script>

<style>
</style>