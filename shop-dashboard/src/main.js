import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { apolloProvider } from "./graphql/apolloClient/apolloClient";
import "element-plus/dist/index.css";
import "./index.css";
import VueNumber from "vue-number-animation";
document.title="YOLO商城后台管理系统"
createApp(App).use(router).use(apolloProvider).use(VueNumber).mount("#app");
