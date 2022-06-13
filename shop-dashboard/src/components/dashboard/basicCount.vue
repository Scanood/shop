<template>
  <div class="w-3/5 flex flex-row justify-evenly">
    <el-card class="w-2/5 flex flex-row justify-center items-center h-20">
      <el-icon :size="25"><money /></el-icon>
      <number
        ref="purchase"
        :from="100"
        :to="purchaseCount"
        :duration="2"
        :format="theFormat"
        easing="Power1.easeOut"
        class="font-semibold font-sans text-2xl ml-3"
      />
    </el-card>
    <el-card class="w-2/5 flex flex-row justify-center items-center h-20">
      <el-icon :size="25"><user-filled /></el-icon>
      <number
        ref="purchase"
        :from="100"
        :to="userCount"
        :duration="2"
        easing="Power1.easeOut"
        class="font-semibold font-sans text-2xl ml-3"
      />
    </el-card>
  </div>
</template>

<script>
import { PURCHASECOUNT, USERCOUNT } from "@/graphql/dashboard/queries";
import { Money, UserFilled } from "@element-plus/icons-vue";
export default {
  components: {
    Money,
    UserFilled,
  },
  data() {
    return {
      purchaseCount: 0,
      userCount: 0,
    };
  },
  methods: {
    theFormat(number) {
      return number.toFixed(2);
    },
  },
  apollo: {
    purchaseCount: {
      query: PURCHASECOUNT,
    },
    userCount: {
      query: USERCOUNT,
    },
  },
};
</script>

<style>
</style>