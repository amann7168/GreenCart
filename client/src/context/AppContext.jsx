import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create context
export const AppContext = createContext();

// Context provider
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowuserLogin] = useState(false);


  const value = { navigate, user, setUser, setIsSeller,isSeller ,showUserLogin,setShowuserLogin};

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  return useContext(AppContext);
};
