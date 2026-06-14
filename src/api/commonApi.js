import { backendAPI } from "./api";

const CommonApi = {
  // Auth Service - Port 8000
  login: (data) => backendAPI.post("/login/", data),

  register: (data) => backendAPI.post("/register/", data),
  getProfile: () => backendAPI.get("/profile/"),
  getUsers: () =>  backendAPI.get("/users/"),

  // Dashboard APIs
  getDashboardSummary: () =>
    backendAPI.get("/dashboard/summary/"),

  getRevenueAnalysis: () =>
    backendAPI.get("/dashboard/revenue/"),

  getOrderStatus: () =>
    backendAPI.get("/dashboard/order-status/"),

  getCustomerGrowth: () =>
    backendAPI.get("/dashboard/customer-growth/"),

  getRetailerAnalysis: () =>
    backendAPI.get("/dashboard/retailer-analysis/"),

  getRecentOrders: () =>
    backendAPI.get("/dashboard/recent-orders/"),

  getTopProducts: () =>
    backendAPI.get("/dashboard/top-products/"),

};

export default CommonApi;