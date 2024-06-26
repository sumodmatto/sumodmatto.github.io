import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Sumodmatto Pages</h1>
      <ul>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/webapp">Web App</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
