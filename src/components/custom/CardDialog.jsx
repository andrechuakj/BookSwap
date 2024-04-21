import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { auth } from "@/firebase";
import { UserRound } from "lucide-react";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import { ChatContext } from "@/contexts/ChatProvider";
import { useNavigate } from "react-router-dom";

const defaultImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-_1dfk_DXSabBEiXoeHZxumOfsR6pawfgQ&usqp=CAU";

const CardDialog = ({ open, handleClose, book, update }) => {
  const { dispatch } = useContext(ChatContext);
  const [otherUser, setOtherUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSwapNow = () => {
    // Load other user, then useEffect hooks will
    // load current user, then chat
    const fetchData = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", book.uid));
        if (snapshot.exists()) {
          setOtherUser(snapshot.data());
          dispatch({
            type: "CHANGE_USER",
            payload: snapshot.data(),
          });
        } else {
          alert("No user found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    // After loading other user, load current user
    if (otherUser) {
      const fetchData = async () => {
        try {
          const snapshot = await getDoc(doc(db, "users", user.uid));
          if (snapshot.exists()) {
            setCurrentUser(snapshot.data());
          } else {
            alert("No user found");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [otherUser]);

  useEffect(() => {
    // After loading current user, create and load chat
    if (currentUser && otherUser) {
      const createChat = async () => {
        const combinedId =
          currentUser.uid > otherUser.uid
            ? currentUser.uid + otherUser.uid
            : otherUser.uid + currentUser.uid;
        try {
          const chatsRes = await getDoc(doc(db, "chats", combinedId));
          console.log(chatsRes.exists());
          if (!chatsRes.exists()) {
            // Create the chat document
            await setDoc(doc(db, "chats", combinedId), { messages: [] });
          }

          // Update userChats for current user
          const currentUserRes = await getDoc(
            doc(db, "userChats", currentUser.uid)
          );
          if (!currentUserRes.exists()) {
            await setDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId]: {
                userInfo: {
                  uid: otherUser.uid,
                  displayName: otherUser.displayName,
                  photoURL: otherUser.photoURL,
                },
                date: new Date(),
              },
            });
          }

          // Update userChats for other user
          const otherUserRes = await getDoc(
            doc(db, "userChats", otherUser.uid)
          );
          if (!otherUserRes.exists()) {
            await setDoc(doc(db, "userChats", otherUser.uid), {
              [combinedId]: {
                userInfo: {
                  uid: currentUser.uid,
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL,
                },
                date: new Date(),
              },
            });
          }
          
        } catch (err) {
          console.log(err);
        }
        navigate("/messages");
      };
      createChat();
    }
  }, [currentUser]);

  const handleSwapped = async () => {
    const bookDoc = doc(db, "books", book.id);
    await updateDoc(bookDoc, { exchanged: true }).then(() => {
      update();
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={handleClose}
        onInteractOutside={handleClose}
      >
        <img
          src={book.image || defaultImg}
          className="h-60 w-full object-cover"
        />
        <DialogHeader>
          <DialogTitle>{book.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <span>{book.condition}</span>
          <div className="overflow-hidden flex items-center">
            <UserRound size={15} className="mr-1" /> {book.owner}
          </div>
        </div>
        <DialogFooter>
          {book.uid === auth.currentUser.uid && !book.exchanged && (
            <Button onClick={handleSwapped}>Swapped!</Button>
          )}
          {book.uid == auth.currentUser.uid && book.exchanged && (
            <Button disabled>Swapped!</Button>
          )}
          {book.uid !== auth.currentUser.uid && (
            <Button onClick={handleSwapNow}>Swap now!</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
