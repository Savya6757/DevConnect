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
        <Link to="/profiles">
          <i className="fa-solid fa-laptop-code"></i>
          <span className="hide-sm"> Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i className="fa-solid fa-user-plus"></i>
          <span className="hide-sm"> Register</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fa-solid fa-box-check"></i>
          <span className="hide-sm"> Login</span>
        </Link>
      </li>
    </ul>
  );

  const userLoggedIn = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fa-solid fa-laptop-code"></i>
          <span className="hide-sm"> Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fa-solid fa-sitemap"></i>
          <span className="hide-sm"> Posts</span>
        </Link>
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
        <Link to="/">
          <i className="fa-solid fa-code"></i> DevConnect
        </Link>
      </h1>
      {!loading && <Fragment>{isAuthenticated ? userLoggedIn : userLoggedOut}</Fragment>}
    </nav>
  );
};

export default Navbar;
