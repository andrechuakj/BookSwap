import { useState, useEffect } from "react";
import CardList from "@/components/custom/CardList";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "books"));
        const items = snapshot.docs
          .map((doc) => doc.data())
          .filter((book) => !book.exchanged)
          .sort((x, y) => Date.parse(y.createdAt) - Date.parse(x.createdAt));
        setIsLoading(false);
        setBooks(items);
      } catch (error) {
        console.error("Error fetching data from Firebase: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <CardList books={books} isLoading={isLoading}/>
    </>
  );
};

export default HomePage;
