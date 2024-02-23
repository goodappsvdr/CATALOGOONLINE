import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

// crear contexto
export const CartContext = createContext();

//  hook para usar el contexto
export const useCartContext = () => useContext(CartContext);

// crear el provider
// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [clientData, setClientData] = useState(
    JSON.parse(localStorage.getItem("clientData"))
  );
  const [modalCart, setModalCart] = useState(false);
  const [dataHeader, setDataHeader] = useState(null);

  const add = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].cantidad += 1;
      // toast.info("Agregado", {
      //   description: "Correc agregado al pedido",
      //   duration: 3000,
      // });
      return setCart(newCart);
    }
    toast.info("Agregado", {
      description: "Artículo agregado al pedido",
      duration: 3000,
    });
    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        cantidad: 1,
      },
    ]);
  };

  const remove = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      if (newCart[productInCartIndex].cantidad == 1) {
        newCart.splice(productInCartIndex, 1);
        toast.warning("Retirado", {
          description: "Artículo retirado del pedido",
          duration: 3000,
        });
        return setCart(newCart);
      }
      newCart[productInCartIndex].cantidad -= 1;
      // toast.warning("Quitado", {
      //   description: "Artículo quitado del pedido",
      //   duration: 3000,
      // });
      return setCart(newCart);
    }
  };

  const quantity = () => {
    return cart.reduce((acc, item) => acc + item.cantidad, 0);
  };

  const total = () => {
    return cart.reduce((acc, item) => acc + item.cantidad * item.price, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearItemCart = (product) => {
    // como el remove pero con cantidad 0
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart.splice(productInCartIndex, 1);
      toast.warning("Retirado", {
        description: "Artículo retirado del pedido",
        duration: 3000,
      });
      return setCart(newCart);
    }
  };

  const handleCloseModalCart = () => {
    setModalCart(false);
  };

  const handleOpenModalCart = () => {
    setModalCart(true);
  };

  const addObservation = (product, observation) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].observaciones = observation;
      return setCart(newCart);
    }
  };

  const saveClientData = (data) => {
    localStorage.setItem("clientData", JSON.stringify(data));
    setClientData(data);
  };

  const getClientData = () => {
    if (localStorage.getItem("clientData") !== null) {
      setClientData(JSON.parse(localStorage.getItem("clientData")));
    }
    // si no hay datos, se agrega datos vacios
    if (clientData === null) {
      setClientData({
        nombre: "",
        email: "",
        telefono: "",
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        add,
        remove,
        quantity,
        total,
        clearItemCart,
        clearCart,
        modalCart,
        handleCloseModalCart,
        handleOpenModalCart,
        dataHeader,
        setDataHeader,
        addObservation,
        clientData,
        saveClientData,
        getClientData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
