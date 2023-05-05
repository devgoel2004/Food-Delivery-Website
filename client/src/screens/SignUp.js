import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      navigate(`/`);
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Navbar />
      <div className="container-form">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="exampleInputPassword1">Name</label>
              <input
                onChange={onChange}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Name"
                name="name"
                value={credentials.name}
              />
            </div>
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
            <div className="form-group">
              <label for="exampleInputPassword1">Address</label>
              <input
                onChange={onChange}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Location"
                name="geolocation"
                value={credentials.geolocation}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/login">
              <button className="btn btn-danger">Already a User</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
