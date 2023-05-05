import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(json.authToken);
      navigate(`/`);
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="container-form">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  onChange={onChange}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  value={credentials.email}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  onChange={onChange}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link to="/createuser">
                <button className="btn btn-danger">Not A User</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
