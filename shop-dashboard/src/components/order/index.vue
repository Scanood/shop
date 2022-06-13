<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <div class="w-11/12 flex flex-row justify-between mb-10">
      <div class="font-black text-3xl">订单</div>
    </div>
    <div class="w-11/12">
      <el-table
        style="width: 100%; margin-bottom: 20px"
        row-key="token"
        :data="orders.orders"
        v-loading="this.$apollo.loading"
      >
        <el-table-column prop="user.username" label="用户名" />
        <el-table-column prop="date" label="时间" :formatter="dateFormatter" />
        <el-table-column prop="status" label="订单状态">
          <template #default="scope">
            <orderStatus :scope="scope" />
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="总价"
          :formatter="priceFormatter"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle @click="clickItem(scope.row)">
              <el-icon> <search /></el-icon
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:pageSize="perCount"
        :page-count="orders.pages"
        v-model:currentPage="page"
        style="float: right"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { ORDERS } from "@/graphql/order/queries";
import { Search } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import orderStatus from "@/components/order/orderStatus";
export default {
  data() {
    return {
      perCount: 5,
      page: 1,
      orders: {
        pages: 0,
        orders: [],
      },
    };
  },
  components: { Search, orderStatus },
  methods: {
    clickItem(row) {
      this.$router.push(`/dashboard/order/detail/${row.token}`);
    },
    dateFormatter(row) {
      return dayjs(row.date).format("YYYY-M-D HH:mm:ss");
    },
    priceFormatter(row) {
      return "￥" + row.price;
    },
  },
  apollo: {
    orders: {
      query: ORDERS,
      variables() {
        return {
          perCount: this.perCount,
          number: this.page,
        };
      },
    },
  },
};
</script>
<style scoped>
</style>