import React, {Fragment} from "react";
import { AuthProvider } from "./context/authContext";
import Dashboard from "./Components/Dashboard";
import Auth from "./Components/Auth";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
function App() {
  return (
    <Router>
      <Fragment>
      <AuthProvider>
        <Routes>
        <Route exact path="/signup" element={<Auth />} />
        <Route exact path="/" element={<PrivateRoute />} >
          <Route exact path="/"  element={<Dashboard />}/>
        </Route>
        </Routes>
      </AuthProvider>
      </Fragment>
    </Router>
  );
}

export default App;
