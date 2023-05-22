import React, { createContext, useState } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  const store = {
    token,
    setToken,
  };

  return <TokenContext.Provider value={store}>{children}</TokenContext.Provider>;
};
