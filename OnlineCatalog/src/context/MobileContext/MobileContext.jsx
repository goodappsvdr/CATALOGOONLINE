import { createContext, useState, useLayoutEffect, useContext } from "react";

const MobileContext = createContext();

const MobileContextProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Ejecutar una vez al cargar para establecer el valor inicial

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
  );
};

export { MobileContext, MobileContextProvider };

export function useMobileContext() {
  return useContext(MobileContext);
}
