import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Esta funcion es para cambiar el titulo de la pagina
export const useDocumentTitle = (title) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);
};
