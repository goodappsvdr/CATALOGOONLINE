import { useContext } from "react";
import { createContext, useState } from "react";

export const OpenMenuContext = createContext();

export const OpenMenuContextProvider = ({ children }) => {
  const [OpenMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <OpenMenuContext.Provider
      value={{ OpenMenu, handleOpenMenu, handleCloseMenu, setOpenMenu }}
    >
      {children}
    </OpenMenuContext.Provider>
  );
};

export function useOpenMenuContext() {
  return useContext(OpenMenuContext);
}
