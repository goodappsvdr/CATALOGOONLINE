import { createContext, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";

const ProductFilterContext = createContext();

const ProductFilterContextProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Obtener los parámetros de la URL y convertirlos a un objeto
  const params = Object.fromEntries(searchParams.entries());

  // Convertir el objeto de parámetros a un string formateado
  const formattedParams = Object.keys(params)
    .map((key) => `${key.toLowerCase()}=${params[key]}`)
    .join("&");

  return (
    <ProductFilterContext.Provider
      value={{ searchParams, setSearchParams, formattedParams }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};

export { ProductFilterContext, ProductFilterContextProvider };

export function useProductFilterContext() {
  return useContext(ProductFilterContext);
}
