import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const history = useNavigate();

  const { name, email, password } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    localStorage.setItem("token", json.authtoken);
    history("/");
    props.showAlert("Account create Successfully", "success");
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
        // backdropFilter: "blur(25px)",
        boxShadow: " 0 25px 45px rgba(235, 5, 5, 0.756)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "5px",
      }}
    >
      <h1
        className="canva"
        style={{ textAlign: "center", color: "white", padding: "30px" }}
      >
        Signup
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          className="form-group mb-3"
          style={{ color: "white", marginTop: "10px" }}
        >
          {/* <label htmlFor="name" className="form-label">Name</label> */}
          <input
            type="text"
            className="form-control"
            placeholder="Name Should Be min.3 charecter"
            value={credentials.name}
            onChange={onChange}
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div
          className="form-group mb-3"
          style={{ color: "white", marginTop: "10px" }}
        >
          {/* <label htmlFor="email" className="form-label">Email address</label> */}
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
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
        <div
          className="form-group mb-3"
          style={{ color: "white", marginTop: "10px" }}
        >
          {/* <label htmlFor="password" className="form-label">Password</label> */}
          <input
            type="password"
            className="form-control"
            placeholder="Password"
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
