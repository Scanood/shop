<template>
  <div>
    <div class="w-3/4 mt-10 m-auto p-10 bg-white shadow-md rounded-2xl mb-24">
      <CategoryForm
        :outCategories="categories"
        :outCategory="category"
        :outParent="parent"
        ref="form"
      />
    </div>
    <UpdateComponent :updateMethod="this.updateCategoty" title="更新" />
  </div>
</template>

<script>
import { CATEGORY, FATHER_CATRGORIES } from "../../graphql/category/queries";
import { UPDATE_CATEGORY } from "../../graphql/category/mutations";
import CategoryForm from "@/components/category/Form";
import UpdateComponent from "@/components/updateComponent";
import { DeepCopy } from "../utils.js";
import { ElMessage } from "element-plus";
export default {
  name: "detail-category",
  components: {
    CategoryForm,
    UpdateComponent,
  },
  data() {
    return {
      parent: "",
      category: {
        name: "",
        slug: "",
        description: "",
        backgroudImage: "",
        parent: {
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
    mutationCategory() {
      const category = this.$refs.form.category;
      const slug = category.slug;
      const name = category.name;
      const description = category.description;
      const parentSlug = this.$refs.form.parent;
      let file = null;
      const uploadfiles = this.$refs.form.uploadcomponent.uploadfiles;
      if (uploadfiles.length > 0) file = uploadfiles[0].raw;
      this.$apollo
        .mutate({
          mutation: UPDATE_CATEGORY,
          variables: {
            file,
            slug,
            name,
            description,
            parentSlug,
          },
        })
        .then((res) => {
          if (res.data.categoryUpdate.success) {
            ElMessage({
              message: "产品种类信息更新成功！",
              type: "success",
            });
          }
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    },
    updateCategoty() {
      // 先进行表单的验证
      const formrules = this.$refs.form.formrules;
      if (!formrules) return;
      formrules.validate((valid) => {
        if (valid) this.mutationCategory();
        else ElMessage.error("种类信息填写不完整！");
      });
    },
  },
  async created() {
    const slug = this.$route.params.slug;
    const { data } = await this.$apollo.query({
      query: CATEGORY,
      variables: {
        slug,
      },
    });
    this.category = DeepCopy(data.category);
    if (data.category.parent) this.parent = data.category.parent.slug;
  },
  apollo: {
    categories: {
      query: FATHER_CATRGORIES,
      variables: {
        perCount: 100,
      },
    },
  },
};
</script>