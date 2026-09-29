import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const loginTime = localStorage.getItem("loginTime");

  if (!token || !loginTime) {
    return <Navigate to="/login" />;
  }

  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  if (now - loginTime > oneDay) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;