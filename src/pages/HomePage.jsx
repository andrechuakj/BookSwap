import { useState, useEffect, useContext } from "react";
import CardList from "@/components/custom/CardList";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "books"));
        const items = snapshot.docs.map((doc) => doc.data());
        setBooks(items);
      } catch (error) {
        console.error("Error fetching data from Firebase: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <CardList books={books.sort((x, y) => Date.parse(y.createdAt) - Date.parse(x.createdAt))} />
    </>
  );
};

export default HomePage;
