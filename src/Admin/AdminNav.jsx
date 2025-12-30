import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin.css";
import { Link } from "react-router-dom";
// import Databases from "./DataBases";

function Navbar({ onLogout }) {
  return (
    <nav
      className="navbar navbar-expand-xl navbar-light"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      
       
     

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

     <div className="collapse navbar-collapse" id="navbarNav">
  {/* LEFT MENU */}
  <ul className="navbar-nav">
    <li>
{/* <Link to="/admin"> Admin Dashboard</Link> */}
</li>
   <li className="nav-item active">
  <Link className="nav-link" to="/data-base-table">Databases</Link>
</li>

<li className="nav-item">
  <Link className="nav-link" to="/">Search</Link>
</li>

<li className="nav-item">
  <Link className="nav-link" to="/">National Identity Card</Link>
</li>

<li className="nav-item">
  <Link className="nav-link" to="/">Change Admin</Link>
</li>


  </ul>

  {/* RIGHT SIDE SIGN OUT */}
  <div className="navbar-signout1">
    <button
      onClick={onLogout}
      className="btn btn-outline-success"
    >
      Sign Out
    </button>
  </div>
</div>

    </nav>
  );
}

export default Navbar;
