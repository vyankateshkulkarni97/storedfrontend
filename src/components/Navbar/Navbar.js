import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="nav-logo">
        <img
          src="/logo12.png"
          alt="logo"
          className="logo-img"
        />
        <span>5mint Store</span>
      </div>

      <div className="nav-links">

        <Link to="/home">Home</Link>

        <Link to="/orders">Orders</Link>

        <div className="profile-container">

          <FaUserCircle
            className="profile-icon"
            onClick={() =>
              setShowProfile(!showProfile)
            }
          />

          {showProfile && (

            <div className="profile-card">

              <div className="profile-header">
                <FaUserCircle className="profile-avatar" />
              </div>

              <h3>{user?.username}</h3>

              <p>{user?.email}</p>

              <p>
                Role:
                <strong> {user?.role}</strong>
              </p>

              <hr />

              <button
                className="profile-btn settings-btn"
                onClick={() =>
                  navigate("/settings")
                }
              >
                <FaCog />
                Settings
              </button>

              <button
                className="profile-btn logout-btn"
                onClick={logout}
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;