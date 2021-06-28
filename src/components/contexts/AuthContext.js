import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import firebase from "firebase/app";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const history = useHistory();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function signupGoogle() {
    return auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  function signupFacebook() {
    return auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }
  function setUsername(name) {
    return setName(name)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      history.push("/dashboard");
    });

    return unsubscribe;
  }, [history]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    name,
    setUsername,
    signupGoogle,
    signupFacebook,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
