import { useState } from "react";
import BookCard from "./BookCard";
import CardDialog from "./CardDialog";
import CardSkeleton from "./CardSkeleton";

const CardList = ({ books, isLoading, update }) => {
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
      {books.length != 0 && (
        <>
          <CardDialog
            open={open}
            handleClose={handleClose}
            book={selectedBook}
            update={update}
          />
          <div className="flex justify-center mt-6">
            <div className="grid grid-cols-5 gap-4">
              {isLoading &&
                new Array(8)
                  .fill(0)
                  .map((item, index) => <CardSkeleton key={index} />)}
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
      )}
      {books.length == 0 && (
        <div className="flex justify-center mt-6">
          <p className="text-2xl text-gray-400">No books found</p>
        </div>
      )}
    </>
  );
};

export default CardList;
