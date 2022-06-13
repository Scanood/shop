<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <div class="w-11/12 flex flex-row justify-between mb-10">
      <div class="font-black text-3xl">折扣</div>
      <div>
        <el-button
          type="primary"
          size="large"
          plain
          @click="this.$router.push('/dashboard/discount/add')"
          >创建新折扣</el-button
        >
      </div>
    </div>
    <div class="w-11/12">
      <el-table
        style="width: 100%; margin-bottom: 20px"
        row-key="slug"
        :data="discounts.discounts"
        v-loading="this.$apollo.loading"
      >
        <el-table-column prop="name" label="折扣名称" />
        <el-table-column prop="value" label="折扣量">
          <template #default="scope">
            <DiscountValue :row="scope.row" />
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <ValidDate :row="scope.row" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle @click="clickItem(scope.row)">
              <el-icon> <search /></el-icon
            ></el-button>
            <el-popconfirm
              title="确定删除该折扣吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deteleItem(scope.row)"
            >
              <template #reference>
                <el-button circle>
                  <el-icon><delete-filled /></el-icon
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager,next"
        v-model:pageSize="perCount"
        v-model:currentPage="page"
        :page-count="discounts.pages"
        style="float: right"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Search, DeleteFilled } from "@element-plus/icons-vue";
import { ALLDISCOUNT } from "@/graphql/discount/queries";
import { DISCOUNTDELETE } from "@/graphql/discount/mutations";
import DiscountValue from "@/components/discount/discountValue";
import ValidDate from "@/components/discount/validDate";
import { ElMessage } from "element-plus";
export default {
  components: {
    Search,
    DeleteFilled,
    DiscountValue,
    ValidDate,
  },
  data() {
    return {
      perCount: 5,
      page: 1,
      discounts: {
        pages: 0,
        discounts: [],
      },
    };
  },
  methods: {
    clickItem(row) {
      this.$router.push(`/dashboard/discount/detail/${row.slug}`);
    },
    deteleItem(row) {
      const slug = row.slug;
      this.$apollo
        .mutate({
          mutation: DISCOUNTDELETE,
          variables: { slug },
        })
        .then((res) => {
          if (res.data.DiscountDelete.success) {
            ElMessage({
              message: "删除成功！",
              type: "success",
            });
            // 重新刷新当前页数据
            this.$apollo.queries.discounts.refetch();
          }
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    },
  },
  apollo: {
    discounts: {
      query: ALLDISCOUNT,
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

<style>
</style>