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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const defaultImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-_1dfk_DXSabBEiXoeHZxumOfsR6pawfgQ&usqp=CAU";

const CardDialog = ({ open, handleClose, book, update }) => {
  const handleSwapNow = () => {
    console.log("Swap now!");
  };

  const handleSwapped = async () => {
    const bookDoc = doc(db, "books", book.id);
    await updateDoc(bookDoc, { exchanged: true })
      .then(() => {
        console.log("book.exchange successfully changed to true");
        update();
      })
      .catch((error) => {
        console.log("book.exchange cannot be changed", error);
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
          {book.owner === auth.currentUser.displayName && !book.exchanged && (
            <Button onClick={handleSwapped}>Swapped!</Button>
          )}
          {book.owner == auth.currentUser.displayName && book.exchanged && (
            <Button disabled>Swapped!</Button>
          )}
          {book.owner !== auth.currentUser.displayName && (
            <Button onClick={handleSwapNow}>Swap now!</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
