import { createRouter, createWebHistory } from "vue-router";
import ShopView from "@/views/ShopView.vue";
import AdminLayout from "@/views/admin/AdminLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "shops",
      component: ShopView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/auth/RegisterView.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/shop",
      name: "shop",
      component: ShopView,
      meta: {
        requiresAuth: true,
        role: "user",
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      meta: {
        requiresAuth: true,
        role: "admin",
      },
      children: [
        {
          path: "productos",
          name: "products", // Check this name matches
          component: () => import("../views/admin/ProductsView.vue"),
        },
        {
          path: "ventas",
          name: "sales",
          component: () => import("../views/admin/SalesView.vue"),
        },
        {
          path: "productos/nuevo",
          name: "new-product",
          component: () => import("../views/admin/NewProductView.vue"),
        },
        {
          path: "productos/editar/:id",
          name: "edit-product",
          component: () => import("../views/admin/EditProductView.vue"),
        },
        {
          path: "productos/seeder",
          name: "seed-products",
          component: () => import("../views/admin/SeederView.vue"),
        },
        {
          path: "categorias",
          name: "categories",
          component: () => import("../views/admin/CategoriesView.vue"),
        },
        {
          path: "categorias/nuevo",
          name: "new-categories",
          component: () => import("../views/admin/NewCategories.vue"),
        },
        {
          path: "categorias/editar/:id",
          name: "edit-category",
          component: () => import("../views/admin/EditCategoriesView.vue"),
        },
        {
          path: "configurar-whatsapp",
          name: "configure-whatsapp",
          component: () => import("../views/admin/WatsappView.vue"),
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Check if the user is logged in
  if (requiresAuth && !storedUser) {
    next("/login");
  } else if (requiresAuth && storedUser) {
    const userRole = storedUser.role;

    if (to.meta.role && to.meta.role !== userRole) {
      next("/"); // Redirect to the main page if the role does not match
    } else {
      next();
    }
  } else if (storedUser && to.path === "/") {
    const userRole = storedUser.role;
    // Redirect to admin or shop based on user role
    next({ name: userRole === "admin" ? "admin" : "shop" });
  } else {
    next();
  }
});

export default router;
