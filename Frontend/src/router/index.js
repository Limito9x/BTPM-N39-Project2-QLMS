import { createWebHistory, createRouter } from "vue-router";
import clientRouter from "./client.Router";
import adminRouter from "./admin.Router";
const routes = [
  ...adminRouter,
  ...clientRouter,
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Nếu chưa đăng nhập và không phải trang chủ k cho truy cập
  if (!user && (to.path !== "/" && to.path !== "/login")) {
    alert("Bạn cần đăng nhập để truy cập trang này!");
    // Chuyển hướng về trang chủ
    next("/login")
  }
  // độc giả vào admin => chặn
  else if (to.path.startsWith("/admin") && (!user || user.role !== "staff")) {
    alert("Bạn không có quyền truy cập vào khu vực quản trị!");
    next("/"); // Chuyển hướng về trang chủ nếu không phải nhân viên
  }
  // đúng => iếp tục điều hướng
  else {
    next();
  }
});

export default router;
