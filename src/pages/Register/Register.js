import React, { useState } from "react";
import "./Register.css";
import CommonApi from "../../api/commonApi";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "user",
    password: "",
    confirmPassword: ""
  });

  const registerUser = async () => {
    try {

      if (!data.username || !data.email || !data.phone || !data.password) {
        // alert("Please fill all fields");
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Please fill all fields"
        });
        return;
      }

      if (data.password !== data.confirmPassword) {
        // alert("Passwords do not match");
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "Please fill all fields"
        });
        return;
      }

      const response = await CommonApi.register({
        username: data.username,
        email: data.email,
        phone: data.phone,
        role: data.role,
        password: data.password
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
        confirmButtonText: "Go to Login"
      }).then(() => {
        navigate("/login");
      });

      setData({
        username: "",
        email: "",
        phone: "",
        role: "customer",
        password: "",
        confirmPassword: ""
      });

    } catch (error) {

      // console.log("FULL ERROR:", error);
    
      // console.log("STATUS:", error.response?.status);
    
      // console.log("DATA:", error.response?.data);
    
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        html: `
          <pre>${JSON.stringify(error.response?.data, null, 2)}</pre>
        `
      });
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Create Account</h2>

        <input
          className="register-input"
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          className="register-input"
          type="text"
          placeholder="Phone Number"
          value={data.phone}
          onChange={(e) =>
            setData({ ...data, phone: e.target.value })
          }
        />

        <select
          className="register-input"
          value={data.role}
          onChange={(e) =>
            setData({ ...data, role: e.target.value })
          }
        >
          <option value="customer">User</option>
          <option value="retailer">Retailer</option>
          <option value="delivery">Delivery Boy</option>
          {/* <option value="admin">Admin</option> */}
        </select>

        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <input
          className="register-input"
          type="password"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        />

        <button
          className="register-btn"
          onClick={registerUser}
        >
          Register
        </button>

        <p className="login-text">
          Already have an account?
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;