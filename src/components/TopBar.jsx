import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="App-header">
      <nav className="navbar navbar-expand-lg bg-light py-1 py-md-2">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} height="40px" className="App-logo" alt="logo" />
            <h5 className="mb-0">User Data</h5>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="users" className="nav-link active" aria-current="page">
                Users
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
