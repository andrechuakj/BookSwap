import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const defaultImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-_1dfk_DXSabBEiXoeHZxumOfsR6pawfgQ&usqp=CAU";

const CardDialog = ({ open, handleClose, book }) => {
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
        </div>
        <DialogFooter>
          <Button type="submit">Swap now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
