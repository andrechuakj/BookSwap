import { useState, useEffect, useContext } from "react";
import SignInButton from "./SignInButton";
import LogOutButton from "./LogOutButton";
import { auth } from "../../firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/contexts/AuthProvider";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <header>
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <a className="font-semibold text-lg" href="/">
                    BookSwap
                  </a>
                </div>
                {auth.currentUser && (
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    <a
                      href="/"
                      className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Locations
                    </a>
                  </div>
                )}
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {!user && <SignInButton />}
                {user && (
                  <Avatar className="mr-6">
                    <AvatarImage
                      src={auth.currentUser.photoURL}
                      alt="@shadcn"
                    />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                )}
                {user && <LogOutButton />}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
