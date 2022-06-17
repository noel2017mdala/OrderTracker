import React, { useState } from "react";
import { css } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import EmailValidator from "../helper/EmailValidator";
const Login = () => {
  const { logIn } = useAuth();
  const [errorState, setErrorState] = useState({
    emailError: false,
    passwordErr: false,
  });

  const [loginState, setLoginState] = useState(false);
  const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const [uiState, setUi] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState({
    state: false,
    msg: "",
  });
  const navigate = useNavigate();

  const validate = (input) => {
    if (/^\s/.test(input.target.value) && input.target.value !== undefined) {
      input.target.value = "";
    }
  };

  let notify = {
    success: (message) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },

    fail: (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  };

  const validateLogin = async (e) => {
    setLoginState(true);
    e.preventDefault();

    if (uiState.email === "" && uiState.password === "") {
      setErrorState({
        emailError: true,
        passwordErr: true,
      });

      setLoginState(false);
    } else if (uiState.email === "") {
      setErrorState({
        emailError: true,
      });
      setLoginState(false);
    } else if (uiState.password === "") {
      setErrorState({
        passwordErr: true,
      });
      setLoginState(false);
    } else if (!EmailValidator(uiState.email)) {
      setErrorState({
        emailError: true,
      });
      setLoginState(false);
    } else {
      try {
        let userLogin = await logIn(uiState.email, uiState.password);
        if (userLogin) {
          navigate("/");
        }
      } catch (error) {
        setErrMsg({
          state: true,
          msg: "failed to login please try again",
        });
        setLoginState(false);
      }
    }
  };

  const override = css`
    display: block;
    border-color: #ffffff;
  `;

  return (
    <>
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
                    errorState.emailError
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
                  emailError: false,
                  passwordErr: false,
                });

                setErrMsg({
                  state: false,
                  msg: "",
                });
              }}
            />

            <p className="text-red-500 text-sm italic pt-3">
              {errorState.emailError
                ? "Please enter a valid Email Address."
                : null}
            </p>
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
                  border
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
                  emailError: false,
                  passwordErr: false,
                });

                setErrMsg({
                  state: false,
                  msg: "",
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
          </div>
        </form>
        {errMsg.state ? (
          <p className="text-center font-bold text-red-400">{errMsg.msg}</p>
        ) : null}
      </div>
    </>
  );
};

export default Login;
