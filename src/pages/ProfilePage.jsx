import { useState, useEffect } from "react";
import CardList from "@/components/custom/CardList";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "@/firebase";

const ProfilePage = ({ update }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "books"));
        const items = snapshot.docs
          .map((doc) => doc.data())
          .filter((book) => book.owner === auth.currentUser.displayName)
          .sort((x, y) => Date.parse(y.createdAt) - Date.parse(x.createdAt))
          .sort((x, y) =>
            x.exchanged === y.exchanged ? 0 : x.exchanged ? 1 : -1
          );
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
      <CardList books={books} isLoading={isLoading} update={update}/>
    </>
  );
};

export default ProfilePage;
