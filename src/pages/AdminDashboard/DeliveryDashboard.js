import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaMotorcycle,
} from "react-icons/fa";

import CommonApi from "../../api/commonApi";
import "bootstrap/dist/css/bootstrap.min.css";

function DeliveryDashboard() {
  const [profile, setProfile] = useState({});
  const [summary, setSummary] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        profileRes,
        summaryRes,
        ordersRes,
      ] = await Promise.all([
        CommonApi.getDeliveryProfile(),
        CommonApi.getDeliveryDashboardSummary(),
        CommonApi.getDeliveryOrders(),
      ]);

      setProfile(profileRes.data);
      setSummary(summaryRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const markDelivered = async (id) => {
    try {
      await CommonApi.markDelivered(id);
      loadDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const markOutForDelivery = async (id) => {
    try {
      await CommonApi.markOutForDelivery(id);
      loadDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const stats = [
    {
      title: "Assigned Orders",
      value: summary.assigned_orders || 0,
      icon: <FaBox size={30} />,
      color: "#0d6efd",
    },
    {
      title: "Delivered",
      value: summary.delivered_orders || 0,
      icon: <FaCheckCircle size={30} />,
      color: "#198754",
    },
    {
      title: "Pending",
      value: summary.pending_orders || 0,
      icon: <FaClock size={30} />,
      color: "#ffc107",
    },
    {
      title: "Earnings",
      value: `₹${summary.earnings || 0}`,
      icon: <FaMoneyBillWave size={30} />,
      color: "#dc3545",
    },
  ];

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <h2 className="mb-4">🚚 Delivery Dashboard</h2>

      {/* Profile */}
      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-2 text-center">
              <FaMotorcycle
                size={70}
                color="#0d6efd"
              />
            </div>

            <div className="col-md-10">
              <h4>Delivery Executive</h4>

              <div className="row">
                <div className="col-md-4">
                  <strong>Name:</strong>{" "}
                  {profile.name}
                </div>

                <div className="col-md-4">
                  <strong>Employee ID:</strong>{" "}
                  {profile.employee_id}
                </div>

                <div className="col-md-4">
                  <strong>Mobile:</strong>{" "}
                  {profile.mobile}
                </div>

                <div className="col-md-4 mt-2">
                  <strong>Vehicle:</strong>{" "}
                  {profile.vehicle_no}
                </div>

                <div className="col-md-4 mt-2">
                  <strong>Area:</strong>{" "}
                  {profile.area}
                </div>

                <div className="col-md-4 mt-2">
                  <strong>Status:</strong>

                  <span
                    className={`badge ms-2 ${
                      profile.status === "online"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {profile.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row">
        {stats.map((item, index) => (
          <div
            className="col-lg-3 col-md-6 mb-4"
            key={index}
          >
            <div
              className="card text-white shadow border-0"
              style={{
                backgroundColor: item.color,
              }}
            >
              <div className="card-body text-center">
                {item.icon}
                <h5 className="mt-2">
                  {item.title}
                </h5>
                <h3>{item.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Orders */}
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white">
          Assigned Orders
        </div>

        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Status</th>
                <th width="250">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.order_id}</td>
                  <td>
                    {order.customer_name}
                  </td>
                  <td>
                    {order.customer_mobile}
                  </td>
                  <td>{order.address}</td>
                  <td>₹{order.amount}</td>

                  <td>
                    <span
                      className={`badge ${
                        order.status ===
                        "delivered"
                          ? "bg-success"
                          : order.status ===
                            "assigned"
                          ? "bg-warning text-dark"
                          : "bg-primary"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    {order.status !==
                      "out_for_delivery" &&
                      order.status !==
                        "delivered" && (
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() =>
                            markOutForDelivery(
                              order.id
                            )
                          }
                        >
                          Out For Delivery
                        </button>
                      )}

                    {order.status !==
                      "delivered" && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          markDelivered(
                            order.id
                          )
                        }
                      >
                        Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="text-center p-4">
              No Orders Assigned
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryDashboard;