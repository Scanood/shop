<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <div class="w-11/12 flex flex-row justify-between mb-10">
      <div class="font-black text-3xl">用户</div>
    </div>
    <div class="w-11/12">
    <el-input
    v-model="keyword"
    class="mb-1"
    placeholder="请输入用户名称"
    clearable
  />
      <el-table
        style="width: 100%; margin-bottom: 20px"
        row-key="token"
        :data="activeUsers.activeUsers"
        v-loading="this.$apollo.loading"
      >
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
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
        :page-count="activeUsers.pages"
        v-model:currentPage="page"
        style="float: right"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ALLUSERS } from "@/graphql/user/queries";
import { Search } from "@element-plus/icons-vue";
export default {
  name: "index-user",
  components: {
    Search,
  },
  data() {
    return {
      keyword:"",
      perCount: 5,
      page: 1,
      activeUsers: {
        pages:0,
        activeUsers: [],
      },
    };
  },
  methods: {
    clickItem(row) {
      this.$router.push(`/dashboard/user/detail/${row.token}`);
    },
  },
  apollo: {
    activeUsers: {
      query: ALLUSERS,
      variables() {
        return {
          perCount: this.perCount,
          number: this.page,
          keyword:this.keyword
        };
      },
    },
  },
};
</script>

<style>
</style>