<template>
  <div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white mb-24 shadow-md rounded-2xl">
      <ProductForm
        :outproduct="product"
        :outcategories="categories"
        ref="form"
      />
    </div>
    <UpdateComponent title="保存" :updateMethod="this.createProduct" />
  </div>
</template>
<script>
import ProductForm from "./productForm";
import UpdateComponent from "@/components/updateComponent";
import { CATEGORIES } from "@/graphql/category/queries";
import { CREATE_PRODUCT } from "@/graphql/product/mutations";
import { ElMessage } from "element-plus";
export default {
  name: "add-product",
  components: {
    ProductForm,
    UpdateComponent,
  },
  data() {
    return {
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
      const form = this.$refs.form;
      const name = form.product.name;
      const description = form.product.description;
      const categorySlug = form.category;
      let productImage = null;
      const uploadfiles = form.uploadcomponent.uploadfiles;
      if (uploadfiles.length > 0) productImage = uploadfiles[0].raw;
      this.$apollo
        .mutate({
          mutation: CREATE_PRODUCT,
          variables: {
            input: {
              name,
              description,
              categorySlug,
              productImage,
            },
          },
        })
        .then((res) => {
          if (res.data.ProductCreate.success)
            ElMessage({
              message: "商品信息添加成功！",
              type: "success",
            });
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    },
    createProduct() {
      // 进行表单验证
      const productForm = this.$refs.form.productform;
      productForm.validate((vaild) => {
        if (vaild) this.mutationProduct();
        else ElMessage.error("商品信息不完整！");
      });
    },
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