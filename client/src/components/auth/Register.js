import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../actions/alertActions";
import { Fragment } from "react";
import { registerAction } from "../../actions/authActions";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const formSubmitHandler = async (e) => {
    const enteredPassword = passwordRef.current.value;
    const enteredPasswordCheck = passwordCheckRef.current.value;
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    e.preventDefault();

    // if (
    //   enteredEmail.trim() === "" ||
    //   enteredName.trim() === "" ||
    //   enteredPassword.trim() === "" ||
    //   enteredPasswordCheck.trim() === ""
    // ) {
    //   return;
    // }

    if (enteredPassword !== enteredPasswordCheck) {
      dispatch(setAlert("Passwords Do Not Match", "danger"));
    } else {
      const newFormData = {
        email: enteredEmail,
        name: enteredName,
        password: enteredPassword,
      };
      dispatch(registerAction({ ...newFormData }));
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" ref={nameRef} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" ref={emailRef} />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            ref={passwordRef}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            ref={passwordCheckRef}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
