import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function StaffRoute({ authState }) {
  return authState ? <Outlet /> : <Navigate to="/" />;
}

export default StaffRoute;
