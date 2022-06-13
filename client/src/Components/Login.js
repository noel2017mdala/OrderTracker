import React, { useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../context/authContext";
import {Link, useNavigate} from 'react-router-dom'
const Login = () => {
  const { logIn, currentUser } = useAuth();
  const [errorState, setErrorState] = useState({
    phoneNumberErr: false,
    passwordErr: false,
  });

  const [loginState, setLoginState] = useState(false);

  const [uiState, setUi] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const validate = (input) => {
    if (/^\s/.test(input.target.value) && input.target.value !== undefined) {
      input.target.value = "";
    }
  };

  const validateLogin = async (e) => {
    e.preventDefault();

    console.log(uiState.email, uiState.password);

    try {
      await logIn(uiState.email, uiState.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const override = css`
    display: block;
    border-color: #ffffff;
  `;

  return (
    <div className="w-full sm:max-w-xs md:max-w-md m-auto pb-4">
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase ">
            Email
          </label>

          <input
            className={`
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-3
                  px-3
                  text-gray-500
                  leading-tight
                  focus:outline-none focus:shadow-outline

                  ${
                    errorState.phoneNumberErr
                      ? ` border-solid
                  border-red-500
                    border-3`
                      : null
                  }
  `}
            id="username"
            type="text"
            value={uiState.email}
            placeholder="Email"
            onInput={validate}
            onChange={(e) => {
              setUi({
                ...uiState,
                email: e.target.value,
              });

              setErrorState({
                ...errorState,
                phoneNumberErr: false,
                passwordErr: false,
              });
            }}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase ">
            Password
          </label>
          <input
            className={`
                  shadow
                  appearance-none
                  rounded
                  w-full
                  py-3
                  px-3
                  text-gray-500
                  mb-3
                  leading-tight
                  focus:outline-none 
                  focus:shadow-outline
                  

                  ${
                    errorState.passwordErr
                      ? ` border-solid
                  border-red-500
                    border-3`
                      : null
                  }
                `}
            id="password"
            type="password"
            value={uiState.password}
            placeholder="******************"
            onInput={validate}
            onChange={(e) => {
              setUi({
                ...uiState,
                password: e.target.value,
              });

              setErrorState({
                ...errorState,
                phoneNumberErr: false,
                passwordErr: false,
              });
            }}
          />
          <p className="text-red-500 text-sm italic pt-3">
            {errorState.passwordErr ? "Please enter a valid password." : null}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="
                  bg-main
                  text-white
                  font-bold
                  py-2
                  px-4
                  rounded
                  focus:outline-none focus:shadow-outline
                  shadow
                hover:bg-mainHover"
            type="button"
            onClick={validateLogin}
            disabled={loginState ? "disabled" : ""}
            style={
              loginState
                ? {
                    cursor: "not-allowed",
                  }
                : null
            }
          >
            {loginState ? (
              <ClipLoader color="#FFFFFF" css={override} size={30} />
            ) : (
              "Log in"
            )}
          </button>
          <a
            className="
                  inline-block
                  align-baseline
                  font-bold
                  text-sm text-blue-500
                  hover:text-blue-800
                  cursor-pointer
                "
            onClick={() => {
              //   MySwal.fire({
              //     icon: "info",
              //     title: "Oops...",
              //     text: "This feature will be available shortly",
              //     confirmButtonColor: "#00BFA5",
              //   });
            }}
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
