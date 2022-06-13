<template>
  <div class="app-wrapper">
    <div class="menu-container" :class="{ 'hide-menu-container': state }">
      <sidebar />
    </div>
    <div class="main-container" :class="{ 'hide-main-container': state }">
      <div class="header">
        <hamburger class="hamburger-container" />
        <avatar class="avatar" />
      </div>
      <div class="work-container">
        <el-scrollbar height="calc(100vh - 50px)">
          <router-view v-slot="{ Component }" class="mt-10">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" :key="key" />
            </transition>
          </router-view>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import Hamburger from "@/components/Hamburger";
import { MENUCOLLAPSESTATE } from "@/graphql/Hamburger/queries";
export default {
  components: {
    Hamburger,
  },
  data() {
    return {
      state: true,
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  apollo: {
    state: {
      query: MENUCOLLAPSESTATE,
      variables: {
        id: 1,
      },
      update(data) {
        return data.state;
      },
      fetchPolicy: "cache-only",
    },
  },
};
</script>
<style scoped>
.menu-container {
  transition: width 0.28s;
  width: 210px !important;
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.menu-container .el-menu {
  /* 去掉menu的边框 */
  border: 0px;
  min-width: 210px !important;
}
.hide-menu-container {
  width: 64px !important;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 210px;
  position: relative;
}
.hide-main-container {
  margin-left: 64px;
}
.work-container {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  @apply bg-gray-50;
}
.avatar {
  float: right;
  margin-right: 30px;
}
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.header {
  position: sticky;
  top: 0px;
  z-index: 1001;
  @apply bg-white h-12 border opacity-80;
}
.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.5s;
}
.hamburger-container:hover {
  background: rgba(15, 1, 1, 0.025);
}

/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>