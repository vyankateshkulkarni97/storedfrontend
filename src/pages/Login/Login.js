import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CommonApi from "../../api/commonApi";
import "./Login.css";


function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {
  
      const loginResponse = await CommonApi.login({
        username,
        password,
      });
      // console.log("LOGIN RESPONSE:", loginResponse.data);
  
      localStorage.setItem(
        "access_token",
        loginResponse.data.access
      );
  
      localStorage.setItem(
        "refresh_token",
        loginResponse.data.refresh
      );
  
      const profileResponse =
        await CommonApi.getProfile();
  
      localStorage.setItem(
        "user",
        JSON.stringify(profileResponse.data)
      );
  
      const user = profileResponse.data;
  
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${user.username}`
      }).then(() => {
  
        switch (user.role) {
  
          case "admin":
            navigate("/admin-dashboard");
            break;
  
          case "customer":
            navigate("/home");
            break;
  
          case "retailer":
            navigate("/retailer-dashboard");
            break;
  
          case "delivery":
            navigate("/delivery-dashboard");
            break;
  
          default:
            navigate("/");
        }
  
      });
  
    } catch (error) {
  
      // console.error(error);
  
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error?.response?.data?.detail ||
          "Invalid username or password"
      });
  
    }
  
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Login</h2>

        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={loginUser}
        >
          Login
        </button>

        <p className="register-text">
          Don't have an account?
          <Link
            to="/register"
            className="register-link"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;