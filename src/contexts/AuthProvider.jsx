import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  const loginUser = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(getAuth(), provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigateTo("/home");
      })
      .catch((error) => {
        console.log(
          "Error signing in with Google: ",
          error.code,
          error.message,
          error.customData.email,
          GoogleAuthProvider.credentialFromError(error)
        );
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(getAuth())
      .then(() => {
        navigateTo("/");
      })
      .catch((error) => {
        console.log("Error signing out: ", error);
      });
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authValue = {
    user,
    loginUser,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
