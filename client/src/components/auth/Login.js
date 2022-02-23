import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/authActions";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (enteredEmail.trim() === "" || enteredPassword.trim() === "") {
      return;
    }
    const newFormData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    dispatch(loginAction({ ...newFormData }));
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" required ref={emailRef} />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" ref={passwordRef} />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
