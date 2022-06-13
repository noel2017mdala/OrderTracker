import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const Signup = () => {
  const { signUp, currentUser } = useAuth();
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [ConfirmPasswordField, setConfirmPasswordField] = useState("");

  const [errorState, setErrorState] = useState({
    email: false,
    passwordErr: false,
    confirmPasswordErr: false,
  });

  const [loginState, setLoginState] = useState(false);

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
    // setLoginState(true);

    // if (uiState.email === "" && uiState.password === "") {
    //   setErrorState({
    //     phoneNumberErr: true,
    //     passwordErr: true,
    //   });
    //   setLoginState(false);
    // }

    try {
      await signUp(uiState.email, uiState.password);
    } catch (error) {
      console.log(error);
    }
  };

  const override = css`
    display: block;
    border-color: #ffffff;
  `;

  const emailValidator = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (emailField === "") {
  //     console.log("Please enter you email");
  //   } else if (passwordField === "") {
  //     console.log("Please enter you email");
  //   } else if (ConfirmPasswordField === "") {
  //     console.log("Please enter you confirm password");
  //   } else if (emailValidator(emailField) === null) {
  //     console.log("Please enter a valid email address");
  //   } else if (passwordField !== ConfirmPasswordField) {
  //     console.log("your passwords do not match");
  //   } else {
  //     try {
  //       await signUp(emailField, passwordField);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //   }
  // };
  return (
    <div className="w-full sm:max-w-xs md:max-w-md m-auto pb-4">
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 dark:bg-darkSecondary">
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
          dark:text-white
          dark:shadow-lg

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
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
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
          dark:text-white
          

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

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 uppercase dark:text-white">
            Confirm Password
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
          dark:text-white
          

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
            value={uiState.confirmPassword}
            placeholder="******************"
            onInput={validate}
            onChange={(e) => {
              setUi({
                ...uiState,
                confirmPassword: e.target.value,
              });

              setErrorState({
                ...errorState,
                phoneNumberErr: false,
                passwordErr: false,
                confirmPasswordErr: false,
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
              "Sign up"
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

export default Signup;
