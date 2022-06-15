import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
// import firebase from "firebase";

// const token = await firebase.auth().currentUser().getIdToken(/* forceRefresh */ false);
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
    return (
        currentUser ? <Outlet /> :  <Navigate to="/signup" />
    )
};

export default PrivateRoute;


{/* <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Outlet {...props} />
        ) : (
          
        );
      }}
    ></Route> */}