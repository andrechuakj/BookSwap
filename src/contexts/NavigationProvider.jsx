import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavigationContext = createContext(null);

const NavigationProvider = ({children}) => {
    const [page, setPage] = useState("/home");
    const navigateTo = useNavigate();

    const goto = (page) => {
        setPage(page);
        navigateTo(page);
    };
  return <NavigationContext.Provider value={{ page, goto }}>{children}</NavigationContext.Provider>;
};

export default NavigationProvider;
