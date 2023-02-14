import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [trackingNo, setTrackingNo] = useState("");
  const navigate = useNavigate();

  function search() {
    if (trackingNo === "") {
      alert("Please enter tracking number");
    } else {
      navigate(`/tracking?trackingNo=${trackingNo}`);
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Home
          {/* <img
            src="assets/images/bosta_logo.png"
            alt="logo"
            width={"150px"}
            className="me-3"
          /> */}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item mx-3">
              <Link className="nav-Link active" to={"/"}>
                Products
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-Link" to={"/"}>
                Integrations
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-Link" to={"/"}>
                Pricing
              </Link>
            </li>
            <li className="nav-item dropdown mx-3">
              <Link
                className="nav-Link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
              >
                Use Cases
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    Bussinesses
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    SMEs
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown mx-3">
              <Link
                className="nav-Link dropdown-toggle"
                id="searchTrackingDropdownMenuLink"
                data-bs-toggle="dropdown"
              >
                Tracking
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="searchTrackingDropdownMenuLink"
              >
                <li className="search-form">
                  <label className="fs-6 mb-3">Track your shipment</label>
                  <div class="input-group input-group-sm mb-2">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Tracking No."
                      value={trackingNo}
                      onChange={(e) => setTrackingNo(e.target.value)}
                    />
                    <button
                      class="btn btn-outline-danger"
                      type="button"
                      id="button-addon2"
                      onClick={search}
                    >
                      Search
                    </button>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <button className="btn btn-outline-danger rounded-pill fw-bold py-3 px-4">
            {" "}
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
