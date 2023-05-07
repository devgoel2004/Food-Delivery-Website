import React from "react";

import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light text-white">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/">
            <img className="icon" src="../images/download.png"></img> The
            Originals
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-Link active fs-5"
                  aria-current="page"
                  to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem(`authToken`) ? (
                <li className="nav-item">
                  <Link
                    className="nav-Link active fs-5"
                    aria-current="page"
                    to="/">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem(`authToken`) ? (
              <div className="d-flex">
                <Link
                  className="nav-Link active btn mx-1 "
                  aria-current="page"
                  to="/login">
                  Login
                </Link>
                <Link
                  className="nav-Link active btn mx-1"
                  aria-current="page"
                  to="/createuser">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2">My Cart</div>
                <div
                  className="btn text-light bg-danger mx-2"
                  onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
