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
    <UpdateComponent :updateMethod="this.CreateCategoty" title="保存" />
  </div>
</template>
<script>
import CategoryForm from "./Form";
import { FATHER_CATRGORIES } from "../../graphql/category/queries";
import { CREATE_CATEGORY } from "../../graphql/category/mutations";
import UpdateComponent from "@/components/updateComponent";
import { ElMessage } from "element-plus";
export default {
  name: "add-category",
  components: {
    CategoryForm,
    UpdateComponent,
  },
  data() {
    return {
      parent: "",
      category: {
        name: "",
        description: "",
        backgroudImage: "",
      },
      categories: {
        categories: [],
      },
    };
  },
  methods: {
    mutationCategory() {
      const category = this.$refs.form.category;
      const name = category.name;
      const description = category.description;
      const parentSlug = this.$refs.form.parent;
      let backgroundImage = null;
      const uploadfiles = this.$refs.form.uploadcomponent.uploadfiles;
      if (uploadfiles.length > 0) backgroundImage = uploadfiles[0].raw;
      this.$apollo
        .mutate({
          mutation: CREATE_CATEGORY,
          variables: {
            backgroundImage,
            name,
            description,
            parentSlug,
          },
        })
        .then((res) => {
          if (res.data.categoryCreate.success) {
            ElMessage({
              message: "商品种类信息添加成功！",
              type: "success",
            });
          }
        })
        .catch((e) => {
          ElMessage.error(e.message);
        });
    },
    CreateCategoty() {
      // 先进行表单的验证
      const formrules = this.$refs.form.formrules;
      if (!formrules) return;
       formrules.validate((valid) => {
        if (valid) this.mutationCategory();
        else ElMessage.error("种类信息填写不完整！");
      });
    },
    
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