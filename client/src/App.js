import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<SignUp />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
