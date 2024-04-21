import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
  const [genreValue, setGenreValue] = useState("");
  const [conditionValue, setConditionValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const update = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const filterByGenre = (book) => {
    return genreValue ? book.genre === genreValue : true;
  };

  const filterByCondition = (book) => {
    return conditionValue ? book.condition === conditionValue : true;
  };

  const filterByLocation = (book) => {
    return locationValue ? book.location === locationValue : true;
  };

  const values = {
    genreValue,
    conditionValue,
    locationValue,
    update,
    refreshKey,
    setGenreValue,
    setConditionValue,
    setLocationValue,
    filterByGenre,
    filterByCondition,
    filterByLocation,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
