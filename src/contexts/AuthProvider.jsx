import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, or, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  const loginUser = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(getAuth(), provider);
      const resUser = result.user;
      const chatRef = doc(db, "userChats", resUser.uid);
      const userRef = doc(db, "users", resUser.uid);

      // Check if the user's chat document exists
      const chatDoc = await getDoc(chatRef);
      const userDoc = await getDoc(userRef);
      console.log(chatDoc.exists())
      console.log(userDoc.exists())
      if (!chatDoc.exists()) {
        await setDoc(chatRef, {});
        console.log("Chat ref created");
      }

      // Check if the user's profile document exists
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          displayName: resUser.displayName,
          email: resUser.email,
          photoURL: resUser.photoURL,
          uid: resUser.uid,
        });
        console.log("User ref created");
      }

      navigateTo("/home");
    } catch (error) {
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
    }
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
