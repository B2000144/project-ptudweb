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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
