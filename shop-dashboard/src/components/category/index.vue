<template>
  <div class="flex flex-col justify-center items-center w-full h-full">
    <div class="w-11/12 flex flex-row justify-between mb-10">
      <div class="font-black text-3xl">种类</div>
      <div>
        <el-button
          type="primary"
          size="large"
          plain
          @click="this.$router.push('/dashboard/category/add')"
          >创建新种类</el-button
        >
      </div>
    </div>
    <div class="w-11/12">
      <el-table
        style="width: 100%; margin-bottom: 20px"
        row-key="slug"
        :data="categories.categories"
        v-loading="this.$apollo.loading"
      >
        <el-table-column prop="name" label="种类名称" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle @click="clickItem(scope.row)">
              <el-icon> <search /></el-icon
            ></el-button>
            <el-popconfirm
              title="确定删除吗？这将删除类别下的所有商品！"
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
        :page-count="categories.pages"
        style="float: right"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { CATEGORIES } from "../../graphql/category/queries";
import { DELETE_CATEGORY } from "../../graphql/category/mutations";
import { Search, DeleteFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
export default {
  name: "index-category",
  components: { Search, DeleteFilled },
  data() {
    return {
      perCount: 5,
      page: 1,
      categories: {
        pages: 0,
        categories: [],
      },
    };
  },
  methods: {
    // 查看种类详情
    clickItem(row) {
      this.$router.push(`/dashboard/category/detail/${row.slug}`);
    },
    // 删除种类
    deteleItem(row) {
      this.$apollo
        .mutate({
          mutation: DELETE_CATEGORY,
          variables: {
            slug: row.slug,
          },
        })
        .then((res) => {
          if (res.data.categoryDelete.success) {
            ElMessage({
              message: "删除成功！",
              type: "success",
            });
            // 重新刷新当前页数据
            this.$apollo.queries.categories.refetch();
          }
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    },
  },
  apollo: {
    categories: {
      query: CATEGORIES,
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
