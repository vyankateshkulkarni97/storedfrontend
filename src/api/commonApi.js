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

  // Delivery APIs
  getDeliveryProfile: () =>
    backendAPI.get("/delivery/profile/"),

  getDeliveryDashboardSummary: () =>
    backendAPI.get("/delivery/dashboard-summary/"),

  getDeliveryOrders: () =>
    backendAPI.get("/delivery/orders/"),

  markDelivered: (id) =>
    backendAPI.put(`/delivery/order/${id}/delivered/`),

  markOutForDelivery: (id) =>
    backendAPI.put(`/delivery/order/${id}/out-for-delivery/`),

  // Retailer APIs
  getRetailerProfile: () =>
    backendAPI.get("/retailer/profile/"),

  getRetailerDashboard: () =>
    backendAPI.get("/retailer/dashboard/"),

  getRetailerProducts: () =>
    backendAPI.get("/retailer/products/"),

  addRetailerProduct: (data) =>
    backendAPI.post("/retailer/products/add/", data),

  updateRetailerProduct: (id, data) =>
    backendAPI.put(`/retailer/products/${id}/`, data),

  deleteRetailerProduct: (id) =>
    backendAPI.delete(`/retailer/products/${id}/delete/`),

  getRetailerOrders: () =>
    backendAPI.get("/retailer/orders/"),

  getRetailerRevenue: () =>
    backendAPI.get("/retailer/revenue/"),

};

export default CommonApi;