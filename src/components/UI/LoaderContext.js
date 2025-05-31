import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <LoaderContext.Provider value={{ hasLoaded, setHasLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
