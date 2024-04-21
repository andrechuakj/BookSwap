import {useState} from "react";
import BookCard from "./BookCard";
import CardDialog from "./CardDialog";

const CardList = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }
  return (
    <>
      <CardDialog open={open} handleClose={handleClose}/>
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-5 gap-4">
          <BookCard handleOpen={handleOpen}/>
          <BookCard handleOpen={handleOpen}/>
          <BookCard handleOpen={handleOpen}/>
          <BookCard handleOpen={handleOpen}/>
          <BookCard handleOpen={handleOpen}/>
          <BookCard handleOpen={handleOpen}/>
        </div>
      </div>
    </>
  );
};

export default CardList;
