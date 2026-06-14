import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const location = useLocation();

  const hideNavbarRoutes = [
    "/login",
    "/register"
  ];

  return (
    <div>

      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar />
      )}

      <AppRoutes />

    </div>
  );
}

export default App;