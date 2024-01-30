import { useState, createContext } from "react";

export const loginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <loginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </loginContext.Provider>
  );
};
