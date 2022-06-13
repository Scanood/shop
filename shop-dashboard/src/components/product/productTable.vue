<template>
  <el-input
    v-model="keyword"
    class="mb-1"
    placeholder="请输入商品名称"
    clearable
  />
  <el-table
    style="width: 100%; margin-bottom: 20px"
    row-key="slug"
    :data="products.products"
    v-loading="this.$apollo.loading"
  >
    <el-table-column>
      <template #default="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="`${IMG_URL}${scope.row.productImage}`"
          fit="fill"
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="商品名称" />
    <el-table-column prop="category.name" label="商品种类" />
    <el-table-column label="状态">
      <template #default="scope">
        <el-tag class="ml-2" type="success" v-if="scope.row.published"
          >已上架</el-tag
        >
        <el-tag class="ml-2" type="danger" v-else>未上架</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button circle @click="clickItem(scope.row)">
          <el-icon> <search /></el-icon
        ></el-button>
        <el-popconfirm
          title="确定删除当前商品吗？"
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
    layout="prev, pager, next"
    v-model:pageSize="perCount"
    :page-count="products.pages"
    v-model:currentPage="page"
    style="float: right"
  >
  </el-pagination>
</template>
<script>
import { Search, DeleteFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { DELETE_PRODUCT } from "@/graphql/product/mutations";
import { PRODUCTS } from "@/graphql/product/queries";
import { IMG_URL } from "@/lib/config";
export default {
  name: "table-product",
  components: { Search, DeleteFilled },
  data() {
    return {
      keyword: "",
      perCount: 5,
      page: 1,
      products: {
        pages: 0,
        products: [],
      },
      IMG_URL,
    };
  },
  methods: {
    clickItem(row) {
      this.$router.push(`/dashboard/product/detail/${row.slug}`);
    },
    deteleItem(row) {
      this.$apollo
        .mutate({
          mutation: DELETE_PRODUCT,
          variables: {
            slug: row.slug,
          },
        })
        .then((res) => {
          if (res.data.ProductDelete.success) {
            ElMessage({
              message: "删除成功！",
              type: "success",
            });
            // 重新刷新当前页数据
            this.$apollo.queries.products.refetch();
          }
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    },
  },
  apollo: {
    products: {
      query: PRODUCTS,
      variables() {
        return {
          perCount: this.perCount,
          number: this.page,
          keyword: this.keyword,
        };
      },
    },
  },
};
</script>