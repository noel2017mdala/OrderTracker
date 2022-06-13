import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const logIn = (email, password) =>{
    return auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

//   auth.onAuthStateChanged((user) => {
//     setCurrentUser(user);
//   });

  const value = {
    currentUser,
    signUp,
    logIn
  };
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
};
