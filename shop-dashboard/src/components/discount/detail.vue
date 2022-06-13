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
    <UpdateComponent :updateMethod="this.updateDiscount" title="更新" />
  </div>
</template>

<script>
import { DISCOUNTDETAIL } from "@/graphql/discount/queries";
import DiscountForm from "@/components/discount/discountForm";
import CategoryList from "@/components/discount/category";
import ProductList from "@/components/discount/product";
import UpdateComponent from "@/components/updateComponent";
import { DISCOUNTUPDATE } from "@/graphql/discount/mutations";
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
      slug: "",
      activeName: "category",
      discount: {
        categories: [],
      },
    };
  },
  created() {
    this.slug = this.$route.params.slug;
    this.$apollo.queries.discount.start();
  },
  apollo: {
    discount: {
      query: DISCOUNTDETAIL,
      variables() {
        return {
          slug: this.slug,
        };
      },
      skip: true,
    },
  },
  methods: {
    updateDiscount() {
      const basicForm = this.$refs.basicForm.insideDiscount;
      const productList = this.$refs.productList.checkList;
      const categoryList = this.$refs.categoryList.checkList;
      delete basicForm.slug;
      delete basicForm.__typename;
      basicForm.categories = categoryList;
      basicForm.products = productList;
      const slug = this.slug;
      this.$apollo
        .mutate({
          mutation: DISCOUNTUPDATE,
          variables: {
            input: basicForm,
            slug: slug,
          },
        })
        .then((res) => {
          if (res.data.DiscountUpdate.success) {
            ElMessage({
              message: "折扣信息更新成功！",
              type: "success",
            });
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