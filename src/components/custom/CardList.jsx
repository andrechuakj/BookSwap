import BookCard from "./BookCard";
import CardDialog from "./CardDialog";
import CardSkeleton from "./CardSkeleton";
import { useState, useEffect, useContext } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { SearchContext } from "@/contexts/SearchProvider";

const CardList = ({ update, page }) => {
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    filterByGenre,
    filterByCondition,
    filterByLocation,
    filterBySearchKey,
  } = useContext(SearchContext);

  const filterSwapped = (book) => {
    if (page == "/home") {
      return !book.exchanged;
    } else {
      return true;
    }
  };

  const sortSwapped = (x, y) => {
    if (page == "/profile") {
      return x.exchanged === y.exchanged ? 0 : x.exchanged ? 1 : -1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "books"));
        const items = snapshot.docs
          .map((doc) => doc.data())
          .filter(filterSwapped)
          .filter(filterBySearchKey)
          .filter(filterByGenre)
          .filter(filterByCondition)
          .filter(filterByLocation)
          .sort((x, y) => Date.parse(y.createdAt) - Date.parse(x.createdAt))
          .sort(sortSwapped);
        setIsLoading(false);
        setBooks(items);
      } catch (error) {
        console.error("Error fetching data from Firebase: ", error);
      }
    };

    fetchData();
  }, []);

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
