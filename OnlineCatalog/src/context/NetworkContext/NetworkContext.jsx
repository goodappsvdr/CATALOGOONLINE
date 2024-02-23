import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

export const NetworkContext = createContext();

export const NetworkContextProvider = ({ children }) => {
  const [renderList, setRenderList] = useState(false);

  return (
    <NetworkContext.Provider value={{ renderList, setRenderList }}>
      {children}
    </NetworkContext.Provider>
  );
};

export function useNetworkContext() {
  return useContext(NetworkContext);
}
