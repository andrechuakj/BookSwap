import { createContext, useState } from "react";

export const NavigationContext = createContext(null);

const NavigationProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <NavigationContext.Provider value={{ refreshKey, refresh }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
