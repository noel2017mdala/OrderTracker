import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import EmailValidator from "../helper/EmailValidator";
const Signup = ({ tabs }) => {
  const { signUp, currentUser } = useAuth();
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [ConfirmPasswordField, setConfirmPasswordField] = useState("");

  const [errorState, setErrorState] = useState({
    emailErr: false,
    passwordErr: false,
    confirmPasswordErr: false,
  });

  const [loginState, setLoginState] = useState(false);
  const [msgState, setMsg] = useState({
    state: false,
    message: "",
  });

  const [uiState, setUi] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = (input) => {
    if (/^\s/.test(input.target.value) && input.target.value !== undefined) {
      input.target.value = "";
    }
  };

  const validateLogin = async (e) => {
    e.preventDefault();
    setLoginState(true);

    if (
      emailField === "" &&
      passwordField === "" &&
      ConfirmPasswordField === ""
    ) {
      setErrorState({
        emailErr: true,
        passwordErr: true,
        confirmPasswordErr: true,
      });
      setLoginState(false);
    } else if (emailField === "") {
      setErrorState({
        emailErr: true,
        passwordErr: false,
        confirmPasswordErr: false,
      });

      setLoginState(false);
    } else if (passwordField === "") {
      setErrorState({
        emailErr: false,
        passwordErr: true,
        confirmPasswordErr: false,
      });
    } else if (ConfirmPasswordField === "") {
      setErrorState({
        emailErr: false,
        passwordErr: false,
        confirmPasswordErr: true,
      });

      setLoginState(false);
    } else if (passwordField !== ConfirmPasswordField) {
      setErrorState({
        emailErr: false,
        passwordErr: false,
        confirmPasswordErr: false,
      });

      setMsg({
        state: true,
        message: "password and confirm password do not match",
      });

      setLoginState(false);
    } else if (!EmailValidator(emailField)) {
      setErrorState({
        emailErr: true,
        passwordErr: false,
        confirmPasswordErr: false,
      });

      setLoginState(false);
    } else {
      try {
        await signUp(emailField, passwordField);
        tabs.method({ login: true, createAccount: false });
      } catch (error) {
        setMsg({
          state: false,
          message: "Failed to create user please try again later",
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
    <div className="w-full sm:max-w-xs md:max-w-md m-auto pb-4">
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
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
            errorState.emailErr
              ? ` border-solid
          border-red-500
            border-3`
              : null
          }
`}
            id="username"
            type="text"
            value={emailField}
            placeholder="Email"
            onInput={validate}
            onChange={(e) => {
              setEmailField(e.target.value);

              setErrorState({
                ...errorState,
                emailErr: false,
                passwordErr: false,
              });
            }}
          />

          <p className="text-red-500 text-sm italic pt-3">
            {errorState.emailErr
              ? "Please enter a valid Phone Email address."
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
          w-full
          border
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
            value={passwordField}
            placeholder="******************"
            onInput={validate}
            onChange={(e) => {
              setPasswordField(e.target.value);

              setErrorState({
                ...errorState,
                emailErr: false,
                passwordErr: false,
              });
            }}
          />
          <p className="text-red-500 text-sm italic pt-3">
            {errorState.passwordErr ? "Please enter a valid password." : null}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase ">
            Confirm Password
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
            errorState.confirmPasswordErr
              ? ` border-solid
          border-red-500
            border-3`
              : null
          }
        `}
            type="password"
            value={ConfirmPasswordField}
            placeholder="******************"
            onInput={validate}
            onChange={(e) => {
              setConfirmPasswordField(e.target.value);

              setErrorState({
                ...errorState,
                emailErr: false,
                passwordErr: false,
                confirmPasswordErr: false,
              });
            }}
          />
          <p className="text-red-500 text-sm italic pt-3">
            {errorState.confirmPasswordErr
              ? "Please enter a valid password."
              : null}
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
              "Sign up"
            )}
          </button>
        </div>
      </form>

      {msgState.state ? (
        <p className="text-center font-bold text-red-400">{msgState.message}</p>
      ) : null}
    </div>
  );
};

export default Signup;
