import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileDropDown() {
  const { logOut } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const handleSignOut = async () => {
    return logOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ml-5 mr-6 cursor-pointer hover:bg-gray-200">
          <AvatarImage
            className="rounded-full px-1 py-1 w-15"
            src={auth.currentUser.photoURL}
            alt={auth.currentUser.displayName}
          />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => navigateTo("/profile")}>
          <a>Personal Listings</a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          <div className="text-red-500">Log out</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
