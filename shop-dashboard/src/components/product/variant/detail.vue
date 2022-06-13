<template>
  <div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white shadow-md rounded-2xl mb-24">
      <ProductVariantForm
        :outproductVariant="this.variant"
        :showDisCountPrice="true"
        ref="form"
      />
    </div>
    <UpdateComponent title="更新" :updateMethod="this.updateVarant" />
  </div>
</template>
<script>
import ProductVariantForm from "./variantForm";
import { QUERY_VARIANT_SLUG } from "@/graphql/product/queries.js";
import { UPDATE_PRODUCT_VARIANT } from "@/graphql/product/mutations.js";
import UpdateComponent from "@/components/updateComponent";
import { DeepCopy } from "../../utils";
import { ElMessage } from "element-plus/lib/components";
export default {
  name: "detail-variant",
  components: {
    ProductVariantForm,
    UpdateComponent,
  },
  data() {
    return {
      slug: this.$route.params.slug,
      vslug: this.$route.params.vslug,
      variant: {
        name: "",
        stock: 0,
        price: 0,
        description: "",
        discountPrice: 0,
        productVariantImage: "",
      },
    };
  },
  async created() {
    const slug = this.vslug;
    const { data } = await this.$apollo.query({
      query: QUERY_VARIANT_SLUG,
      variables: {
        slug,
      },
    });
    this.variant = DeepCopy(data.variantSlug);
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
          mutation: UPDATE_PRODUCT_VARIANT,
          variables: {
            input: {
              name,
              price,
              stock,
              description,
              productVariantImage,
              productSlug,
            },
            slug: this.vslug,
          },
        })
        .then((res) => {
          if (res.data.ProductVariantUpdate.success) {
            ElMessage({
              message: "商品规格信息修改成功！",
              type: "success",
            });
          }
        })
        .catch((e) => {
          ElMessage.error(e);
        });
    },
    updateVarant() {
      const form = this.$refs.form.productVariantform;
      form.validate((vaild) => {
        if (vaild) this.mutationVariant();
        else ElMessage.error("商品信息不完整！");
      });
    },
  },
};
</script>