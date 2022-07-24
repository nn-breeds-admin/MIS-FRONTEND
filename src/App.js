import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddStaff from "./routes/AddStaff";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import OnboardFarmer from "./routes/OnboardFarmer";

import { useSelector } from "react-redux";

import AdminRoute from "./protectedRoutes/AdminRoute";
import StaffRoute from "./protectedRoutes/StaffRoute";

function App() {
  const adminAuth = useSelector((state) => state.adminReducer);
  const staffAuth = useSelector((state) => state.authReducer);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<StaffRoute authState={staffAuth} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/onboard" element={<OnboardFarmer />} />
        <Route element={<AdminRoute authState={adminAuth} />}>
          <Route path="/add-staff" element={<AddStaff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
