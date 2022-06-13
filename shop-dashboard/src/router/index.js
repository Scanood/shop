import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue");
const Category = () =>
  import(
    /* webpackChunkName: "index-category" */ "../components/category/index.vue"
  );
const DetailCategory = () =>
  import(
    /* webpackChunkName: "detail-category" */ "../components/category/detail.vue"
  );
const AddCategory = () =>
  import(
    /* webpackChunkName: "add-category" */ "../components/category/add.vue"
  );
//Product
const Product = () =>
  import(
    /* webpackChunkName: "index-product" */ "../components/product/index.vue"
  );

const AddProduct = () =>
  import(/* webpackChunkName: "add-product" */ "@/components/product/add.vue");

const DetailProduct = () =>
  import(
    /* webpackChunkName: "detail-product" */ "@/components/product/detail.vue"
  );
const AddProductVariant = () =>
  import(
    /* webpackChunkName: "add-variant" */ "@/components/product/variant/add.vue"
  );
const DetailProductVariant = () =>
  import(
    /* webpackChunkName: "detail-variant" */ "@/components/product/variant/detail.vue"
  );
const Order = () =>
  import(/* webpackChunkName: "order" */ "@/components/order/index.vue");
const DetailOrder = () =>
  import(
    /* webpackChunkName: "detail-order" */ "@/components/order/detail.vue"
  );
// user
const User = () =>
  import(/* webpackChunkName: "index-user" */ "@/components/user/index.vue");
const UserDetail = () =>
  import(/* webpackChunkName: "detail-user" */ "@/components/user/detail.vue");

//discount
const Discount = () =>
  import(
    /* webpackChunkName: "index-discount" */ "@/components/discount/index.vue"
  );

const DetailDsicount = () =>
  import(
    /* webpackChunkName: "detail-discount" */ "@/components/discount/detail.vue"
  );
const AddDiscount = () =>
  import(
    /* webpackChunkName: "detail-discount" */ "@/components/discount/add.vue"
  );

const Account = () =>
  import(
    /* webpackChunkName: "detail-discount" */ "@/components/account/index.vue"
  );
const Summary = () =>
  import(/* webpackChunkName: "summary" */ "@/components/dashboard/index.vue");
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: ckeckoutUser,
    children: [
      {
        path: "",
        name: "summary",
        component: Summary,
      },
      // category
      {
        path: "category",
        name: "category",
        component: Category,
      },
      {
        path: "category/detail/:slug",
        name: "detail-category",
        component: DetailCategory,
      },
      {
        path: "category/add",
        name: "add-category",
        component: AddCategory,
      },
      //product
      {
        path: "product",
        name: "index-product",
        component: Product,
      },
      {
        path: "product/add",
        name: "add-product",
        component: AddProduct,
      },
      {
        path: "product/detail/:slug",
        name: "detail-product",
        component: DetailProduct,
      },
      {
        path: "product/detail/:slug/variant/add",
        name: "add-variant",
        component: AddProductVariant,
      },
      {
        path: "product/detail/:slug/variant/:vslug",
        name: "detail-variant",
        component: DetailProductVariant,
      },
      // orders
      {
        path: "order",
        name: "index-order",
        component: Order,
      },
      {
        path: "order/detail/:uuid",
        name: "detail-order",
        component: DetailOrder,
      },
      {
        path: "user",
        name: "index-user",
        component: User,
      },
      // user
      {
        path: "user/detail/:token",
        name: "detail-user",
        component: UserDetail,
      },
      //discount
      {
        path: "discount",
        name: "index-discount",
        component: Discount,
      },
      {
        path: "discount/detail/:slug",
        name: "detail-discount",
        component: DetailDsicount,
      },
      {
        path: "discount/add",
        name: "add-discount",
        component: AddDiscount,
      },
      {
        path: "account",
        name: "index-account",
        component: Account,
      },
    ],
  },
  { path: "/:pathMatch(.*)", redirect: "/404" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

function ckeckoutUser(to, from, next) {
  if (localStorage.getItem("Authorization") == null) next({ name: "Login" });
  else next();
}
