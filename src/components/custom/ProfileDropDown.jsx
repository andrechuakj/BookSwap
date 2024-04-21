import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileDropDown() {
  const { logOut } = useContext(AuthContext);
  const handleSignOut = async () => {
    return logOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ml-5 mr-6 cursor-pointer">
          <AvatarImage
            src={auth.currentUser.photoURL}
            alt={auth.currentUser.displayName}
          />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <a href="/home">Personal Listings</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="text-red-500" onClick={handleSignOut}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
