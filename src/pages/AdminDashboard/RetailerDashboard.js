import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import CommonApi from "../../api/commonApi";
import "bootstrap/dist/css/bootstrap.min.css";

function RetailerDashboard() {
  const [profile, setProfile] = useState({});
  const [dashboard, setDashboard] = useState({});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [productForm, setProductForm] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [
        profileRes,
        dashboardRes,
        productsRes,
        ordersRes,
      ] = await Promise.all([
        CommonApi.getRetailerProfile(),
        CommonApi.getRetailerDashboard(),
        CommonApi.getRetailerProducts(),
        CommonApi.getRetailerOrders(),
      ]);

      setProfile(profileRes.data);
      setDashboard(dashboardRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error(
        "Retailer Dashboard Error",
        error
      );
    }
  };

  const addProduct = async () => {
    try {
      await CommonApi.addRetailerProduct(
        productForm
      );

      setProductForm({
        product_name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });

      loadDashboardData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await CommonApi.deleteRetailerProduct(
        id
      );

      loadDashboardData();
    } catch (error) {
      console.error(error);
    }
  };

  const stats = [
    {
      title: "Total Products",
      value:
        dashboard.total_products || 0,
      icon: <FaBoxOpen size={30} />,
      color: "#0d6efd",
    },
    {
      title: "Total Orders",
      value:
        dashboard.total_orders || 0,
      icon: <FaShoppingCart size={30} />,
      color: "#198754",
    },
    {
      title: "Pending Orders",
      value:
        dashboard.pending_orders || 0,
      icon: <FaShoppingCart size={30} />,
      color: "#ffc107",
    },
    {
      title: "Revenue",
      value: `₹${
        dashboard.revenue || 0
      }`,
      icon: <FaRupeeSign size={30} />,
      color: "#dc3545",
    },
  ];

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <h2 className="mb-4">
        🏪 Retailer Dashboard
      </h2>

      {/* Retailer Profile */}

      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <h4>
            {profile.company_name}
          </h4>

          <div className="row">
            <div className="col-md-3">
              <strong>
                Retailer ID:
              </strong>{" "}
              {profile.retailer_id}
            </div>

            <div className="col-md-3">
              <strong>
                Mobile:
              </strong>{" "}
              {profile.mobile}
            </div>

            <div className="col-md-3">
              <strong>
                Location:
              </strong>{" "}
              {profile.location}
            </div>

            <div className="col-md-3">
              <strong>
                Status:
              </strong>

              <span className="badge bg-success ms-2">
                {profile.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}

      <div className="row">
        {stats.map(
          (item, index) => (
            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
            >
              <div
                className="card text-white shadow border-0"
                style={{
                  backgroundColor:
                    item.color,
                }}
              >
                <div className="card-body text-center">
                  {item.icon}

                  <h5 className="mt-2">
                    {item.title}
                  </h5>

                  <h3>
                    {item.value}
                  </h3>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Add Product */}

      <div className="card shadow border-0 mb-4">
        <div className="card-header bg-primary text-white">
          Add Product
        </div>

        <div className="card-body">
          <div className="row g-2">

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={
                  productForm.product_name
                }
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    product_name:
                      e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={
                  productForm.price
                }
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    price:
                      e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Stock"
                value={
                  productForm.stock
                }
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    stock:
                      e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Image URL"
                value={
                  productForm.image
                }
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    image:
                      e.target.value,
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-success w-100"
                onClick={
                  addProduct
                }
              >
                <FaPlus /> Add
              </button>
            </div>

            <div className="col-md-12 mt-2">
              <textarea
                className="form-control"
                rows="2"
                placeholder="Description"
                value={
                  productForm.description
                }
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description:
                      e.target.value,
                  })
                }
              />
            </div>

          </div>
        </div>
      </div>

      {/* Product List */}

      <div className="card shadow border-0 mb-4">
        <div className="card-header bg-success text-white">
          Product List
        </div>

        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map(
                (product) => (
                  <tr
                    key={product.id}
                  >
                    <td>
                      {product.id}
                    </td>

                    <td>
                      {
                        product.product_name
                      }
                    </td>

                    <td>
                      ₹
                      {
                        product.price
                      }
                    </td>

                    <td>
                      {
                        product.stock
                      }
                    </td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders */}

      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white">
          Recent Orders
        </div>

        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  Order ID
                </th>
                <th>
                  Customer
                </th>
                <th>
                  Amount
                </th>
                <th>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map(
                (order) => (
                  <tr
                    key={order.id}
                  >
                    <td>
                      {
                        order.order_id
                      }
                    </td>

                    <td>
                      {
                        order.customer_name
                      }
                    </td>

                    <td>
                      ₹
                      {
                        order.amount
                      }
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          order.status ===
                          "delivered"
                            ? "bg-success"
                            : order.status ===
                              "pending"
                            ? "bg-warning text-dark"
                            : "bg-primary"
                        }`}
                      >
                        {
                          order.status
                        }
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {orders.length ===
            0 && (
            <div className="text-center">
              No Orders Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RetailerDashboard;