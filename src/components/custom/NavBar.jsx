import { useContext, useState } from "react";
import SignInButton from "./SignInButton";
import { auth } from "../../firebase";
import { AuthContext } from "@/contexts/AuthProvider";
import { MessageCircle } from "lucide-react";
import { ProfileDropDown } from "@/components/custom/ProfileDropDown";
import { useLocation } from "react-router-dom";
import AddBook from "@/components/custom/AddBook";

const NavBar = ({ update }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation().pathname;
  const [dialogOpen, setDialogOpen] = useState(false);
  const menustyle = {
    active:
      "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
    inactive:
      "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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
                      href="/home"
                      className={
                        location === "/home"
                          ? menustyle.active
                          : menustyle.inactive
                      }
                    >
                      Home
                    </a>
                    <a
                      href="/locations"
                      className={
                        location === "/locations"
                          ? menustyle.active
                          : menustyle.inactive
                      }
                    >
                      BookSwap shelves near you
                    </a>
                  </div>
                )}
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {!user && <SignInButton />}
                {user && (
                  <>
                    <MessageCircle
                      className="cursor-pointer hover:bg-gray-100 rounded-xl p-2"
                      size={50}
                      strokeWidth={0.8}
                      color="#6b6b6b"
                    />
                    <ProfileDropDown />
                    <AddBook
                      open={dialogOpen}
                      handleClose={handleDialogClose}
                      handleOpen={handleDialogOpen}
                      update={update}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
