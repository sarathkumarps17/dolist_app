import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actios/auth";
import PropTypes from "prop-types";
import sprite from "../resorces/sprite.svg";

function Navbar({ auth: { loading, isAuthenticated }, logout }) {
  let location = useLocation().pathname;
  console.log(location);
  const guetsLinks = (
    <div className="navbar">
      <svg className="logo">
        <use xlinkHref={`${sprite}#icon-calendar1`} />
      </svg>
      <nav className="navbar-nav">
        {location !== "/register" && (
          <Link className="navbar-nav-link" to="/register">
            Register{"  "}
            <svg>
              <use xlinkHref={`${sprite}#icon-code`} />
            </svg>
          </Link>
        )}
        {location !== "/login" && (
          <Link className="navbar-nav-link" to="/login">
            Login {"  "}
            <svg>
              <use xlinkHref={`${sprite}#icon-enter`} />
            </svg>
          </Link>
        )}

        {location !== "/" && (
          <Link className="navbar-nav-link" to="/">
            Home {"  "}{" "}
            <svg>
              <use xlinkHref={`${sprite}#icon-blackboard`} />
            </svg>
          </Link>
        )}
      </nav>
    </div>
  );
  const userLinks = (
    <div className="navbar">
      <svg className="logo">
        <use xlinkHref={`${sprite}#icon-calendar1`} />
      </svg>

      <nav className="navbar-nav">
        <a className="navbar-nav-link" href="#!" onClick={logout}>
          <span className="logout-bg">
            Logout{"  "}
            <svg>
              <use xlinkHref={`${sprite}#icon-exit`} />
            </svg>
          </span>
        </a>
        {location !== "/dashboard" && (
          <Link className="navbar-nav-link" to="/dashboard">
            {"  "}Dashboard{"  "}{" "}
            <svg>
              <use xlinkHref={`${sprite}#icon-stats`} />
            </svg>
          </Link>
        )}
        {location !== "/home" && (
          <Link className="navbar-nav-link" to="/home">
            Home {"  "}{" "}
            <svg>
              <use xlinkHref={`${sprite}#icon-blackboard`} />
            </svg>
          </Link>
        )}
      </nav>
    </div>
  );
  return (
    <Fragment>{!loading && isAuthenticated ? userLinks : guetsLinks}</Fragment>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToprops = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToprops, { logout })(Navbar);
