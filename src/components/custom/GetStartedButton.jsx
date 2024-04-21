import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const GetStartedButton = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignInWithGoogle = async (e) => {
    if (!auth.currentUser) {
      return loginUser();
    } else {
      navigate("/home");
    }
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg"
      onClick={handleSignInWithGoogle}
    >
      Get Started
    </button>
  );
};

export default GetStartedButton;
