import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const dummyOrders = [
      {
        id: 101,
        status: "Delivered",
        total: 320,
        date: "2026-03-15",
        items: ["Apple", "Milk", "Bread"]
      },
      {
        id: 102,
        status: "Pending",
        total: 150,
        date: "2026-03-16",
        items: ["Eggs", "Rice"]
      },
      {
        id: 103,
        status: "Cancelled",
        total: 220,
        date: "2026-03-14",
        items: ["Tomato", "Potato"]
      }
    ];

    setOrders(dummyOrders);
  }, []);

  return (

    <div className="orders-container">

      <h1 className="orders-title">My Orders</h1>

      <div className="orders-list">
        {orders.map(order => (

          <div className="order-card" key={order.id}>

            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <p className="order-date">Date: {order.date}</p>

            <p className="order-items">
              Items: {order.items.join(", ")}
            </p>

            <p className="order-total">Total: ₹{order.total}</p>

          </div>

        ))}
      </div>

    </div>

  );
}

export default Orders;