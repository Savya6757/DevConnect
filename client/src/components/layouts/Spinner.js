import React, { Fragment } from "react";
import spinner from "./Spin-0.5s-100px.svg";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "100px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
