import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row nav-links">
          <li className="mx-1 access-signup">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1 access-login">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1 header">
      <h1 className="title">
        <Link to="/">
        <span  role="client/src/logo.svg" aria-label="client/src/logo.svg"></span>
          <div className="title-color">Vintage Vinyl Records</div>
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
