<template>
  <div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white shadow-md rounded-2xl">
      <DiscountForm :discount="this.discount" ref="basicForm" />
    </div>
    <div class="w-3/4 m-auto mt-10 p-10 bg-white shadow-md rounded-2xl mb-24">
      <el-tabs v-model="activeName">
        <el-tab-pane label="种类" name="category">
          <CategoryList
            :addCategories="this.discount.categories"
            ref="categoryList"
          />
        </el-tab-pane>
        <el-tab-pane label="产品" name="product">
          <ProductList
            :addProducts="this.discount.products"
            ref="productList"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <UpdateComponent :updateMethod="this.addDiscount" title="创建" />
  </div>
</template>

<script>
import DiscountForm from "@/components/discount/discountForm";
import CategoryList from "@/components/discount/category";
import ProductList from "@/components/discount/product";
import UpdateComponent from "@/components/updateComponent";
import { DISCOUNTCREATE } from "@/graphql/discount/mutations";
import { ElMessage } from "element-plus";
export default {
  components: {
    DiscountForm,
    CategoryList,
    ProductList,
    UpdateComponent,
  },
  data() {
    return {
      activeName: "category",
      discount: {
        categories: [],
        products: [],
        value: 0,
      },
    };
  },
  methods: {
    addDiscount() {
      const basicForm = this.$refs.basicForm.insideDiscount;
      const productList = this.$refs.productList.checkList;
      const categoryList = this.$refs.categoryList.checkList;
      delete basicForm.slug;
      delete basicForm.__typename;
      basicForm.categories = categoryList;
      basicForm.products = productList;
      this.$apollo
        .mutate({
          mutation: DISCOUNTCREATE,
          variables: {
            input: basicForm,
          },
        })
        .then((res) => {
          if (res.data.DiscountCreate.success) {
            ElMessage({
              message: "折扣信息添加成功！",
              type: "success",
            });
            const slug = res.data.DiscountCreate.discount.slug;
            this.$router.push(`/dashboard/discount/detail/${slug}`);
          }
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    },
  },
};
</script>

<style>
</style>