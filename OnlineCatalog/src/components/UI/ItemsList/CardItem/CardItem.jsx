/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import styles from "./CardItem.module.css";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useCartContext } from "../../../../context/CartContext/CartContext";

// eslint-disable-next-line no-unused-vars
const CardItem = ({ item, dueDate = null }) => {
  const { cart, add, dataHeader, handleOpenModalCart } = useCartContext();

  const itemInCart = cart.find((i) => i.codFabrica === item.codFabrica);

  return (
    <div className="border-black border-2 p-4 px-0 flex my-4 flex-col md:flex-row md:pl-4">
      <div className="relative h-[450] flex justify-center">
        <img
          src={item.imagen}
          alt=""
          className="mt-[-34px] left-0 w-60 max-w-2xl object-cover aspect-[1]"
        />
      </div>
      <div className="flex-1 px-5 flex flex-col">
        <h2 className="font-bold p-2 pt-0 text-lg md:text-3xl">
          {item.descripcion}
        </h2>
        <h3 className="w-full h-auto bg-zinc-400 p-2 mb-2 uppercase text-white text-xs md:text-base">
          Rubro: <span className="font-black">{item.rubro} </span>
          <span>{" // "}</span>
          Sububro: <span className="font-bold"> {item.subRubro}</span>
        </h3>
        {/* aqui va un sumador para el pedido y un btn */}
        {/* {dueDate != null &&
          dueDate.toISOString() > new Date().toISOString() && ( */}
        {dataHeader != null &&
          dataHeader.dueDate.toISOString() > new Date().toISOString() && (
            <div>
              {itemInCart ? (
                // <div className="w-fit flex items-center mt-3 gap-3">
                //   <button
                //     type="button"
                //     className=""
                //     onClick={() => {
                //       remove(item);
                //     }}
                //   >
                //     <RemoveCircleIcon fontSize="large" />
                //   </button>
                //   <span className="font-black text-3xl">
                //     {itemInCart ? itemInCart.cantidad : ""}
                //   </span>
                //   <button
                //     type="button"
                //     className=""
                //     onClick={() => {
                //       add(item);
                //     }}
                //   >
                //     <AddCircleIcon fontSize="large" />
                //   </button>
                // </div>
                <div className="bg-green-600 p-4 w-fit font-black text-white uppercase">
                  Agregado
                </div>
              ) : (
                <button
                  type="button"
                  className="bg-black text-white w-fit py-2 mt-3 px-5 rounded-xl font-bold text-sm"
                  onClick={() => {
                    add(item);
                    handleOpenModalCart();
                  }}
                >
                  Agregar al pedido
                </button>
              )}
            </div>
          )}
        <div className="flex-1 flex items-end">
          <div className="w-full sm:flex justify-between items-end">
            <div>
              <p className="pl-2 text-xs md:text-base">CÓDIGO DE PRODUCTO:</p>
              <p className="pl-2 text-lg md:text-2xl font-bold">
                {item.codFabrica}
              </p>
            </div>
            <p className="text-2xl font-bold bg-black text-center px-5 py-1 text-white">
              ${item.precioVenta}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
