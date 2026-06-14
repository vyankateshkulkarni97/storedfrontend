import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaShoppingCart,
  FaStore,
  FaRupeeSign,
  FaTruck,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import CommonApi from "../../api/commonApi";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [retailerData, setRetailerData] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const COLORS = ["#28a745", "#ffc107", "#dc3545", "#6c757d"];

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        summaryRes,
        revenueRes,
        orderRes,
        customerRes,
        retailerRes,
        recentOrderRes,
        topProductRes,
      ] = await Promise.all([
        CommonApi.getDashboardSummary(),
        CommonApi.getRevenueAnalysis(),
        CommonApi.getOrderStatus(),
        CommonApi.getCustomerGrowth(),
        CommonApi.getRetailerAnalysis(),
        CommonApi.getRecentOrders(),
        CommonApi.getTopProducts(),
      ]);

      setSummary(summaryRes.data);
      setRevenueData(revenueRes.data);
      setCustomerData(customerRes.data);
      setRetailerData(retailerRes.data);
      setRecentOrders(recentOrderRes.data);
      setTopProducts(topProductRes.data);

      setOrderData([
        {
          name: "Delivered",
          value: orderRes.data.delivered,
        },
        {
          name: "Transit",
          value: orderRes.data.transit,
        },
        {
          name: "Cancelled",
          value: orderRes.data.cancelled,
        },
        {
          name: "Returned",
          value: orderRes.data.returned,
        },
      ]);
    } catch (error) {
      console.error("Dashboard API Error:", error);
    }
  };

  const cards = [
    {
      title: "Total Users",
      value: summary.total_users || 0,
      icon: <FaUsers size={35} />,
      color: "#3498db",
    },
    {
      title: "Total Orders",
      value: summary.total_orders || 0,
      icon: <FaShoppingCart size={35} />,
      color: "#2ecc71",
    },
    {
      title: "Retailers",
      value: summary.total_retailers || 0,
      icon: <FaStore size={35} />,
      color: "#f39c12",
    },
    {
      title: "Revenue",
      value: `₹${summary.total_revenue || 0}`,
      icon: <FaRupeeSign size={35} />,
      color: "#9b59b6",
    },
    {
      title: "Transit Orders",
      value: summary.orders_in_transit || 0,
      icon: <FaTruck size={35} />,
      color: "#e74c3c",
    },
  ];

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <h2 className="mb-4 fw-bold">📊 Admin Dashboard</h2>

      {/* KPI Cards */}
      <div className="row">
        {cards.map((card, index) => (
          <div className="col-lg-2 col-md-4 col-sm-6 mb-4" key={index}>
            <div
              className="card text-white shadow border-0"
              style={{
                backgroundColor: card.color,
                borderRadius: "15px",
              }}
            >
              <div className="card-body text-center">
                {card.icon}
                <h6 className="mt-3">{card.title}</h6>
                <h4>{card.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + Pie */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              Revenue Trend
            </div>

            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0d6efd"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              Order Status
            </div>

            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {orderData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Growth */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow">
            <div className="card-header bg-warning">
              Customer Growth
            </div>

            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="customers"
                    fill="#ffc107"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Retailer Analytics */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow h-100">
            <div className="card-header bg-info text-white">
              Retailer Analytics
            </div>

            <div className="card-body">
              <p>
                <strong>Active Retailers:</strong>{" "}
                {retailerData.active_retailers}
              </p>

              <p>
                <strong>Pending Approval:</strong>{" "}
                {retailerData.pending_approval}
              </p>

              <p>
                <strong>Blocked Retailers:</strong>{" "}
                {retailerData.blocked_retailers}
              </p>

              <p>
                <strong>Top Retailer Revenue:</strong> ₹
                {retailerData.top_retailer_revenue}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card shadow mb-4">
        <div className="card-header bg-dark text-white">
          Recent Orders
        </div>

        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.customer}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          Top Selling Products
        </div>

        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Orders</th>
                <th>Revenue</th>
              </tr>
            </thead>

            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.product}</td>
                  <td>{product.orders}</td>
                  <td>₹{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;