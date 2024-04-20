import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const LogOutButton = () => {
  const handleSignOut = async () => {
    return signOut(auth)
      .then(() => {
        window.alert("Logged out successfully!");
      })
      .catch((error) => {
        window.alert("Logged out failed! Please try again.");
      });
  };
  return <Button onClick={handleSignOut}>Log out</Button>;
};

export default LogOutButton;
