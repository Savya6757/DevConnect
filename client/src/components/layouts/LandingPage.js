import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className={styles.landing}>
      <div className="dark-overlay">
        <div className={styles["landing-inner"]}>
          <h1 className="x-large">&lt; DevConnect /&gt;</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
