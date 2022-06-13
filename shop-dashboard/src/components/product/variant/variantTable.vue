<template>
  <div>
    <el-table
      :data="productVariants.productVariants"
      style="width: 100%"
      v-loading="this.$apollo.loading"
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="price" label="单价（元）" />
      <el-table-column prop="stock" label="库存" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button circle @click="clickItem(scope.row)">
            <el-icon> <search /></el-icon
          ></el-button>
          <el-popconfirm
            title="确定删除当前商品规格吗？"
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
      :page-count="productVariants.pages"
      v-model:currentPage="number"
      style="float: right"
    >
    </el-pagination>
  </div>
</template>
<script>
import { VARIANT_PRODUCT } from "@/graphql/product/queries";
import { DELETE_PRODUCT_VARIANT } from "@/graphql/product/mutations";
import { Search, DeleteFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
export default {
  props: ["slug"],
  components: { Search, DeleteFilled },
  data() {
    return {
      perCount: 5,
      number: 1,
      productVariants: {
        pages:0,
        productVariants: [],
      },
    };
  },
  methods: {
    deteleItem(row) {
      const slug = row.slug;
      this.$apollo
        .mutate({
          mutation: DELETE_PRODUCT_VARIANT,
          variables: {
            slug,
          },
        })
        .then((res) => {
          if (res.data.ProductVariantDelete.success)
            ElMessage({
              message: "商品规格删除成功！",
              type: "success",
            });
          this.$apollo.queries.productVariants.refetch();
        })
        .catch((e) => {
          ElMessage.error(e);
        });
    },
    clickItem(row) {
      this.$router.push(`${this.slug}/variant/${row.slug}`);
    },
  },
  apollo: {
    productVariants: {
      query: VARIANT_PRODUCT,
      variables() {
        return {
          slug: this.slug,
          perCount: this.perCount,
          number: this.number,
        };
      },
    },
  },
};
</script>