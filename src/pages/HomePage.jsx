import CardList from "@/components/custom/CardList";
import SearchBar from "@/components/custom/SearchBar";
import { useContext } from "react";
import { SearchContext } from "@/contexts/SearchProvider";

const HomePage = ({ update }) => {
  const { refreshKey } = useContext(SearchContext);
  return (
    <>
      <SearchBar />
      <CardList update={update} key={refreshKey} page="/home" />
    </>
  );
};

export default HomePage;
