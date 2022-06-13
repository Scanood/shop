<template>
  <div>
    <el-checkbox-group v-model="checkList" class="infinite-list">
      <el-scrollbar style="height: 100%" wrap-class="scrollbar-wrapper">
        <ul v-infinite-scroll="load">
          <li
            v-for="item in categories.categories"
            class="infinite-list-item"
            :key="item.slug"
          >
            <el-checkbox :label="item.slug">{{ item.name }}</el-checkbox>
          </li>
        </ul>
      </el-scrollbar>
    </el-checkbox-group>
  </div>
</template>

<script>
import { CATEGORIES } from "@/graphql/category/queries";
export default {
  props: ["addCategories"],
  data() {
    return {
      checkList: [],
      categories: {
        count: 0,
        categories: [],
      },
      perCount: 5,
      page: 1,
    };
  },
  methods: {
    load() {
      console.log("调用load");
      if (this.perCount < this.categories.count) this.perCount += 2;
    },
  },
  watch: {
    addCategories: {
      handler(newValue) {
        const attr = [];
        for (let i in newValue) {
          attr.push(newValue[i].slug);
        }
        this.checkList = attr;
      },
      immediate: true,
    },
  },
  apollo: {
    categories: {
      query: CATEGORIES,
      variables() {
        return {
          perCount: this.perCount,
          number: this.page,
          tree: false,
        };
      },
    },
  },
};
</script>

<style>
.infinite-list {
  height: 200px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list-item {
  display: flex;
  align-items: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
  padding-left: 20px;
}
.infinite-list-item + .list-item {
  margin-top: 10px;
}
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>