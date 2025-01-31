// Import necessary functions and components from Vue Router and the application
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
import Register from "../components/Register.vue";
import OrderList from "../components/OrderList.vue";
import OrderDetails from "../components/OrderDetails.vue";
import OrderCreate from "../components/OrderCreate.vue";
import OrderEdit from "../components/OrderEdit.vue";
import { useAuthStore } from "../stores/auth";

// Create a router instance with an array of route objects
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home route
    {
      path: "/",
      name: "home",
      component: ProductList,
    },
    // Login route
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path:"/register",
      name:"register",
      component: Register,
    },
    // Create product route
    {
      path: "/create",
      name: "productcreate",
      component: ProductCreate,
    },
    // Product details route
    {
      path: "/product/:id",
      name: "productdetail",
      component: ProductDetails,
    },
    // Edit product route
    {
      path: "/product/:id/edit",
      name: "productedit",
      component: ProductEdit,
    },
    // User list route
    {
      path: "/users",
      name: "userlist",
      component: UserList,
    },
    // Create user route
    {
      path: "/users/create",
      name: "usercreate",
      component: UserCreate,
    },
    // User details route
    {
      path: "/users/:id",
      name: "userdetail",
      component: UserDetails,
    },
    // Edit user route
    {
      path: "/users/:id/edit",
      name: "useredit",
      component: UserEdit,
    },
    // Order list route
    {
      path: "/orders",
      name: "orderlist",
      component: OrderList,
    },
    // Create order route
    {
      path: "/orders/create",
      name: "ordercreate",
      component: OrderCreate,
    },
    // Order details route
    {
      path: "/orders/:id",
      name: "orderdetail",
      component: OrderDetails,
    },
    // Edit order route
    {
      path: "/orders/:id/edit",
      name: "orderedit",
      component: OrderEdit,
    },
  ],
});

// Add global navigation guards to the router
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name !== "login" && !authStore.isLoggedIn) {
    if(to.name === "register"){
      next();
    }else{
      next({ name: "login" });
    }
  } else {
    next();
  }
});

// Export the router instance
export default router;
