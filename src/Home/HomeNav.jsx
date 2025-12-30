import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function HomeNav() {
  return (
    <>
      <div className="scroll-watcher"></div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: "black", position: "fixed", width: "100vw" }}
      >
        <div
          className="container-fluid"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <Link
            className="navbar-brand ps-5"
            style={{ color: "white", border: "none" }}
            to={"/"}
          >
            DIGITAL IDENTITY HUB
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
            <ul className="navbar-nav">
              <li className="nav-item" style={{ paddingLeft: "40vw" }}>
                <Link
                  className="nav-link active"
                  to={"/About"}
                  style={{ color: "white" }}
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/Contact"}
                  style={{ color: "white" }}
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={"/new"}
                  style={{ color: "white" }}
                >
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={"/Login"}
                  style={{ color: "white" }}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={"/nic"}
                  style={{ color: "white" }}
                >
                  Apply For Nic
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={"/check-nic"}
                  style={{ color: "white" }}
                >
                  Check Nic
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/admin"}
                  style={{ color: "white" }}
                >
                  Admin
                </Link>
              </li> */}

              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <div style={{ height: "60px" }}></div>
    </>
  );
}

export default HomeNav;
