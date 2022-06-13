<template>
  <div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white mb-24 shadow-md rounded-2xl">
      <VariantForm :outproductVariant="this.productVariant" ref="form" />
    </div>
    <UpdateComponent title="保存" :updateMethod="this.CreateVariant" />
  </div>
</template>
<script>
import VariantForm from "./variantForm";
import UpdateComponent from "@/components/updateComponent";
import { ElMessage } from "element-plus";
import { CREATE_PRODUCT_VARIANT } from "@/graphql/product/mutations.js";
export default {
  name: "add-product-variant",
  components: {
    VariantForm,
    UpdateComponent,
  },
  data() {
    return {
      productVariant: {
        name: "",
        stock: 0,
        price: 0,
        description: "",
        discountPrice: 0,
        productVariantImage: "",
      },
    };
  },
  methods: {
    mutationVariant() {
      const variantForm = this.$refs.form.productVariant;
      const name = variantForm.name;
      const price = variantForm.price;
      const stock = variantForm.stock;
      const description = variantForm.description;
      let productVariantImage = null;
      const uploadfiles = this.$refs.form.uploadcomponent.uploadfiles;
      if (uploadfiles.length > 0) productVariantImage = uploadfiles[0].raw;
      const productSlug = this.$route.params.slug;
      this.$apollo
        .mutate({
          mutation: CREATE_PRODUCT_VARIANT,
          variables: {
            input: {
              name,
              price,
              stock,
              description,
              productVariantImage,
              productSlug,
            },
          },
        })
        .then((res) => {
          if (res.data.ProductVariantCreate.success) {
            ElMessage({
              message: "商品规格信息添加成功！",
              type: "success",
            });
          }
        })
        .catch((e) => {
          ElMessage.error(e);
        });
    },
    CreateVariant() {
      // 进行表单验证
      const from = this.$refs.form.productVariantform;
      from.validate((vaild) => {
        if (vaild) this.mutationVariant();
        else ElMessage.error("商品规格信息不完整！");
      });
    },
  },
};
</script>