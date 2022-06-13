<template>
  <div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white rounded-2xl shadow-md">
      <ProductForm
        :outproduct="product"
        :outcategories="categories"
        ref="form"
      />
    </div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white rounded-2xl shadow-md mb-24">
      <div class="flex flex-row justify-between">
        <div class="font-serif font-semibold text-2xl mb-10">商品规格</div>
        <el-button
          type="primary"
          plain
          size="large"
          @click="this.$router.push(`${this.slug}/variant/add`)"
          >添加规格</el-button
        >
      </div>
      <ProductVariants :slug="slug" class="mb-10" />
      <el-form label-width="120px">
        <el-form-item label="上架：">
          <el-switch
            v-model="product.published"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="this.changePublishStatus"
          />
        </el-form-item>
      </el-form>
    </div>
    <UpdateComponent :updateMethod="this.updateProduct" title="更新" />
  </div>
</template>
<script>
import ProductVariants from "./variant/variantTable";
import ProductForm from "./productForm";
import UpdateComponent from "@/components/updateComponent";
import { CATEGORIES } from "@/graphql/category/queries";
import { PRODUCT_SLUG } from "@/graphql/product/queries";
import { DeepCopy } from "../utils";
import { UPDATE_PRODUCT } from "@/graphql/product/mutations";
import {
  PUBLISH_PRODUCT,
  UNPUBLISH_PRODUCT,
} from "@/graphql/product/mutations";
import { ElMessage } from "element-plus/lib/components";
export default {
  name: "detail-product",
  components: {
    ProductForm,
    UpdateComponent,
    ProductVariants,
  },
  data() {
    return {
      slug: this.$route.params.slug,
      product: {
        name: "",
        description: "",
        productImage: "",
        published: "",
        category: {
          name: "",
          slug: "",
        },
      },
      categories: {
        categories: [],
      },
    };
  },
  methods: {
    mutationProduct() {
      const slug = this.slug;
      const form = this.$refs.form;
      const name = form.product.name;
      const description = form.product.description;
      const categorySlug = form.category;
      let productImage = null;
      const uploadfiles = form.uploadcomponent.uploadfiles;
      if (uploadfiles.length > 0) productImage = uploadfiles[0].raw;
      this.$apollo
        .mutate({
          mutation: UPDATE_PRODUCT,
          variables: {
            input: {
              name,
              description,
              categorySlug,
              productImage,
            },
            slug,
          },
        })
        .then((res) => {
          if (res.data.ProductUpdate.success)
            ElMessage({
              message: "商品信息修改成功！",
              type: "success",
            });
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    },
    updateProduct() {
      // 进行表单验证
      const productForm = this.$refs.form.productform;
      productForm.validate((vaild) => {
        if (vaild) this.mutationProduct();
        else ElMessage.error("商品信息不完整！");
      });
    },
    changePublishStatus(status) {
      let mutation = null;
      if (status) mutation = PUBLISH_PRODUCT;
      else mutation = UNPUBLISH_PRODUCT;
      this.$apollo
        .mutate({
          mutation,
          variables: {
            slug: this.slug,
          },
        })
        .catch((e) => {
          ElMessage.error(e);
          this.product.published = !status;
        });
    },
  },
  async created() {
    // 获取当前商品的信息
    const slug = this.slug;
    const { data } = await this.$apollo.query({
      query: PRODUCT_SLUG,
      variables: {
        slug,
      },
    });
    this.product = DeepCopy(data.productSlug);
  },
  apollo: {
    categories: {
      query: CATEGORIES,
      variables: {
        perCount: 100,
        tree: false,
      },
    },
  },
};
</script>
