import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  const logoutClickHandler = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  const userLoggedOut = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const userLoggedIn = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="#!" onClick={logoutClickHandler}>
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm"> Logout</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className={`${styles.navbar} bg-dark`}>
      <h1>
        <Link to="/">&lt;/&gt; DevConnect</Link>
      </h1>
      {!loading && <Fragment>{isAuthenticated ? userLoggedIn : userLoggedOut}</Fragment>}
    </nav>
  );
};

export default Navbar;
