import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Orders from "../pages/Orders/Orders";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import DeliveryDashboard from "../pages/AdminDashboard/DeliveryDashboard";
import RetailerDashboard from "../pages/AdminDashboard/RetailerDashboard";

function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/retailer-dashboard"
        element={
          <ProtectedRoute>
            <RetailerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/delivery-dashboard"
        element={
          <ProtectedRoute>
            <DeliveryDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>

  );
}

export default AppRoutes;