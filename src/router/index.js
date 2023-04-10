import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../components/ProductList.vue";
import ProductCreate from "../components/ProductCreate.vue";
import ProductDetails from "../components/ProductDetails.vue";
import ProductEdit from "../components/ProductEdit.vue";
import UserList from "../components/UserList.vue";
import UserCreate from "../components/UserCreate.vue";
import UserDetails from "../components/UserDetails.vue";
import UserEdit from "../components/UserEdit.vue";
import Login from "../components/Login.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ProductList,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
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
    {
      path: "/users",
      name: "userlist",
      component: UserList,
    },
    {
      path: "/users/create",
      name: "usercreate",
      component: UserCreate,
    },
    {
      path: "/users/:id",
      name: "userdetail",
      component: UserDetails,
    },
    {
      path: "/users/:id/edit",
      name: "useredit",
      component: UserEdit,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name !== "login" && !authStore.isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
