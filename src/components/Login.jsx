import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://r-notes-np7o.onrender.com/api/auth/login",
      // "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("Login Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "error");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container"
      style={{
        height: "400px",
        width: "400px",
        marginTop: "80px",
        backgroundColor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(25px)",
        boxShadow: " 0 25px 45px rgba(235, 5, 5, 0.756)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "5px",
      }}
    >
      <h1
        className="canva"
        style={{ textAlign: "center", color: "white", padding: "30px" }}
      >
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3" style={{ color: "white", marginTop: "10px" }}>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email address"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text" style={{ color: "white" }}>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3" style={{ color: "white", marginTop: "20px" }}>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: "darkblue",
            color: "white",
            width: "50%",
            marginLeft: "90px",
            marginTop: "20px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
