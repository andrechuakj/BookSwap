import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const image = "https://source.unsplash.com/1600x900/?book";
const another =
  "https://plus.unsplash.com/premium_photo-1681977755496-205f938f7ade?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8";

const CardDialog = ({open, handleClose}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={handleClose} onInteractOutside={handleClose}>
        <img src={another} className="h-60 w-full object-cover" />
        <DialogHeader>
          <DialogTitle>Book name</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <span>Brand New</span>
        </div>
        <DialogFooter>
          <Button type="submit">Swap now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardDialog;
