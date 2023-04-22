import React from "react";
import UseAuth from "../Hooks/UseAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = UseAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
