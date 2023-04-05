import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../components/ProductList.vue";
import ProductCreate from "../components/ProductCreate.vue";
import ProductDetails from "../components/ProductDetails.vue";
import ProductEdit from "../components/ProductEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ProductList,
    },
    {
      path: "/create",
      name: "productcreate",
      component: ProductCreate,
    },
    {
      path: "/product/:id",
      name: "productdetail",
      component: ProductDetails,
    },
    {
      path: "/product/:id/edit",
      name: "productedit",
      component: ProductEdit,
    },
  ],
});

export default router;
