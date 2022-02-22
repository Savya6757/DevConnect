import React from "react";
import { useLocation } from "react-router-dom";

const WrapperContainer = (props) => {
  const location = useLocation();
  return <div className={location.pathname !== "/" ? "container" : ""}>{props.children}</div>;
};

export default WrapperContainer;
