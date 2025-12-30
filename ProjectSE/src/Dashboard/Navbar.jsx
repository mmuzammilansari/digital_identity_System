import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Nav.css";
import Logo from "../assets/nadra.png";
// import Home from './Home';

const Nav = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" >
          <Link to={"/"} style={{color:"white", textDecoration:"none"}}>
          DIGITAL IDENTITY HUB</Link></div>
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard">
              <i className="icon fas fa-home"></i>Home
            </Link>
          </li>
         

          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
      <div className="scroll-watcher"></div>
    </div>
  );
};

export default Nav;
