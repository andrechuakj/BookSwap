import { useContext} from "react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../../contexts/AuthProvider";

const LogOutButton = () => {
  const { logOut } = useContext(AuthContext);
  const handleSignOut = async () => {
    return logOut()
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
