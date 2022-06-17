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
    
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(true).then((token) => {
          setUserToken(token);
        });
      }
    });

    return auth.signInWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    return auth.signOut();
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

  const value = {
    currentUser,
    userToken,
    signUp,
    logIn,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
