import { useState, useContext } from "react";
import BookCard from "./BookCard";
import CardDialog from "./CardDialog";

const CardList = ({ books }) => {
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const handleOpen = (book) => {
    setOpen(true);
    setSelectedBook(book);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CardDialog open={open} handleClose={handleClose} book={selectedBook} />
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-5 gap-4">
          {books.map((book, index) => (
            <BookCard
              key={index}
              handleOpen={() => handleOpen(book)}
              book={book}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardList;
