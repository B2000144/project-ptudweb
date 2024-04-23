import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Product from "../views/product/List.vue";
import Create from "../views/product/Create.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product",
    name: "product.list",
    component: Product,
  },
  {
    path: "/product/create",
    name: "product.create",
    component: Create,
  },
  {
    path: "/product/edit/:id",
    name: "product.edit",
    component: () => import("../views/product/Create.vue"),
  },
  {
    path: "/admin/login",
    name: "admin.login",
    component: () => import("../views/admin/login.vue"),
  },
  {
    path: "/book/form/:id",
    name: "BrrowBook",
    component: () => import("../views-user/BrrowBooks/Brrow.vue"),
  },
  {
    path: "/checkBorrow",
    name: "checkBorrow",
    component: () => import("../views/admin/checkBorrow.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
