<template>
  <div>
    <el-checkbox-group v-model="checkList" class="infinite-list">
      <el-scrollbar style="height: 100%" wrap-class="scrollbar-wrapper">
        <ul v-infinite-scroll="load">
          <li
            v-for="item in products.products"
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
import { PRODUCTS } from "@/graphql/product/queries";
export default {
  props: ["addProducts"],
  data() {
    return {
      checkList: [],
      products: {
        count: 0,
        products: [],
      },
      perCount: 5,
      page: 1,
    };
  },
  methods: {
    load() {
      console.log("调用load");
      if (this.perCount < this.products.count) this.perCount += 2;
    },
  },
  watch: {
    addProducts: {
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
    products: {
      query: PRODUCTS,
      variables() {
        return {
          perCount: this.perCount,
          number: this.page,
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
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
  padding-left: 20px;
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>