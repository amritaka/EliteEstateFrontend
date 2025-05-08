import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [token,setToken] = useState(null)

  useEffect(() => {
    const userDetail = localStorage.getItem("userInfo");
    if (userDetail) {
      const authentication = JSON.parse(userDetail);
      // console.log(authentication)
      setAuth(authentication.authtype);
      setToken(authentication.token)
    }
  },[]);

  const login = (authType) => {
    const userInfo = { authtype: authType };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setAuth(authType);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setAuth(null);
    setToken(null)
  };

  return (
    <AuthContext.Provider value={{ auth,setAuth, login, logout ,token,setToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
