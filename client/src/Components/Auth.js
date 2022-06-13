import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
const Auth = () => {
  const [tabState, changeStabState] = useState({
    login: true,
    createAccount: false,
  });

  return (
    <div className="flex h-screen">
      <div className="m-auto w-9/12">
        <div className="md:max-w-md md:m-auto sm:px-3 shadow-2xl rounded">
          {tabState.login ? (
            <h1 className="sm:text-xl md:text-2xl font-bold text-center">
              Log in
            </h1>
          ) : (
            <h1 className="sm:text-xl md:text-2xl font-bold text-center text-black">
              Create Account
            </h1>
          )}

          <nav className="tabs flex flex-row pt-6 my-2">
            <button
              className={`flex-1 ${
                tabState.login
                  ? "bg-main sm:py-3 text-white rounded hover:bg-mainHover"
                  : ""
              }`}
              onClick={() => {
                changeStabState({
                  ...tabState,
                  login: true,
                  createAccount: false,
                });
              }}
            >
              Login
            </button>

            <button
              className={`flex-1 ${
                tabState.createAccount
                  ? "bg-main sm:py-3 text-white rounded hover:bg-mainHover"
                  : ""
              }`}
              onClick={() => {
                changeStabState({
                  ...tabState,
                  login: false,
                  createAccount: true,
                });
              }}
            >
              Create Account
            </button>
          </nav>
          {tabState.login ? (
            <Login />
          ) : (
            <Signup
              tabs={{
                state: tabState,
                method: changeStabState,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

// Hello Auth
// <Signup />
