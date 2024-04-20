import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthProvider";

const SignInButton = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSignInWithGoogle = async (e) => {
    return loginUser();
  };
  return <Button onClick={handleSignInWithGoogle}>Sign In</Button>;
};

export default SignInButton;
