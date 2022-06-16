import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import firebase from "../firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userToken, setUserToken] = useState();

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const logIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(true).then((token) => {
          setUserToken(token);
        });
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  //   auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });

  const value = {
    currentUser,
    userToken,
    signUp,
    logIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
