import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute({ authState }) {
  return authState ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default AdminRoute;
