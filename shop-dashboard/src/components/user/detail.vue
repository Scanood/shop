<template>
  <div class="mb-10">
    <div class="w-3/4 mt-10 m-auto p-10 bg-white rounded-2xl shadow-md">
      <el-form>
        <el-form-item label="用户名：" label-width="100px">
          <el-input v-model="user.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱：" label-width="100px">
          <el-input v-model="user.email" disabled />
        </el-form-item>
      </el-form>
    </div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white rounded-2xl shadow-md">
      <el-table
        style="width: 100%; margin-bottom: 20px"
        row-key="token"
        :data="userOrders.orders"
        v-loading="this.$apollo.loading"
      >
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
        :page-count="userOrders.pages"
        v-model:currentPage="page"
        style="float: right"
      >
      </el-pagination>
    </div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white rounded-2xl shadow-md">
      <MenuBar :token="token" />
    </div>
  </div>
</template>

<script>
import { USERINFO, USERORDER } from "@/graphql/user/queries";
import { Search } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import orderStatus from "@/components/order/orderStatus";
import MenuBar from "@/components/user/menuBar";
export default {
  name: "detail-user",
  components: {
    orderStatus,
    Search,
    MenuBar,
  },
  data() {
    return {
      user: {},
      userOrders: {
        pages: 0,
        orders: [],
      },
      token: "",
      perCount: 5,
      page: 1,
    };
  },
  created() {
    this.token = this.$route.params.token;
    this.$apollo.queries.user.start();
    this.$apollo.queries.userOrders.start();
  },
  methods: {
    dateFormatter(row) {
      return dayjs(row.date).format("YYYY-M-D HH:mm:ss");
    },
    priceFormatter(row) {
      return "￥" + row.price;
    },
    clickItem(row) {
      this.$router.push(`/dashboard/order/detail/${row.token}`);
    },
  },
  apollo: {
    user: {
      query: USERINFO,
      variables() {
        return {
          token: this.token,
        };
      },
      skip: true,
    },
    userOrders: {
      query: USERORDER,
      variables() {
        return {
          token: this.token,
          perCount: this.perCount,
          number: this.page,
        };
      },
      skip: true,
    },
  },
};
</script>

<style>
</style>