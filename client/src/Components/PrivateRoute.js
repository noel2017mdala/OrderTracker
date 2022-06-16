import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
    return (
        currentUser ? <Outlet /> :  <Navigate to="/signup" />
    )
};

export default PrivateRoute;