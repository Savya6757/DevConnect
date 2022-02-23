import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../layouts/Spinner";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const Component = props.component;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
