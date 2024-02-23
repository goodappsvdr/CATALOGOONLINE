/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import styles from "./CardProduct.module.css";
import { useCartContext } from "../../../../context/CartContext/CartContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const CardProduct = ({ product }) => {
  const { cart, add, remove, dataHeader, clearItemCart, addObservation } =
    useCartContext();
  const itemInCart = cart.find((i) => i.codFabrica === product.codFabrica);
  const [openComent, setOpenComent] = useState(false);

  const formik = useFormik({
    initialValues: {
      observaciones: product.observaciones,
    },
    validationSchema: Yup.object({
      observaciones: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      {openComent && (
        <form onSubmit={formik.handleSubmit}>
          <div className="border-black border-2 p-2 mt-6 mb-2 flex gap-3 flex-col">
            <TextField
              className="w-full"
              input
              InputProps={{
                multiline: true,
                rows: 3,
                sx: {
                  overflow: "hidden",
                  borderRadius: "8px",
                  color: "#282828",
                  // ":hover": { bgcolor: "#f7d4d8" },
                },
              }}
              InputLabelProps={{
                sx: { color: "#282828" },
              }}
              id="observaciones"
              name="observaciones"
              label="Observaciónes"
              variant="filled"
              color={"primary"}
              placeholder="Escribe aquí tus observaciones o preferencias"
              value={formik.values.observaciones}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="small"
              error={
                formik.touched.observaciones &&
                Boolean(formik.errors.observaciones)
              }
              helperText={
                formik.touched.observaciones && formik.errors.observaciones
              }
            />
            <div className="w-full flex justify-end items-end gap-2">
              <button
                type="button"
                className="w-full bg-neutral-500 rounded-2xl text-white py-1 px-5 font-bold"
                onClick={() => setOpenComent(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="w-full bg-green-700 rounded-2xl text-white py-1 px-5 font-bold"
                onClick={() => {
                  addObservation(product, formik.values.observaciones);
                  setOpenComent(false);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      )}
      {!openComent && (
        <div className="border-black border-2 p-2 mt-6 mb-2 flex gap-3">
          <div className="relative flex justify-start w-fit h-fit">
            <img
              src={product.imagen}
              alt=""
              className="mt-[-34px] left-0 w-40 h-40 object-cover aspect-[1]"
            />
          </div>
          <div className="h-full w-full flex flex-col">
            <h2 className="p-0 m-0 font-bold two-line-ellipsis w-full">
              {product.descripcion}
            </h2>
            <p className="text-neutral-600 font-medium text-sm">
              {/* <span className="font-bold"> */}${product.precioVenta}
            </p>
            <div className="flex justify-between w-full items-end flex-1">
              <div className="w-fit">
                {dataHeader != null &&
                  dataHeader.dueDate.toISOString() >
                    new Date().toISOString() && (
                    <div className="w-fit">
                      {itemInCart ? (
                        <div className="w-fit flex items-center py-1 gap-3">
                          <button
                            type="button"
                            className=""
                            onClick={() => {
                              remove(product);
                            }}
                          >
                            <RemoveCircleIcon
                              fontSize="medium"
                              className="hover:text-red-800"
                            />
                          </button>
                          <span className="font-black text-xl">
                            {itemInCart ? itemInCart.cantidad : ""}
                          </span>
                          <button
                            type="button"
                            className=""
                            onClick={() => {
                              add(product);
                            }}
                          >
                            <AddCircleIcon
                              fontSize="medium"
                              className="hover:text-green-800"
                            />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="bg-black text-white w-fit py-2 mt-3 px-5 rounded-xl font-bold text-sm"
                          onClick={() => {
                            add(product);
                          }}
                        >
                          Agregar al pedido
                        </button>
                      )}
                    </div>
                  )}
              </div>
              <div className="flex flex-col items-end">
                <p className="font-bold pb-1 text-lg">
                  {/* <p className="font-bold px-3 py-1 md:text-xl text-white bg-black "> */}
                  $
                  {itemInCart
                    ? (itemInCart.cantidad * product.precioVenta).toFixed(2)
                    : ""}
                </p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="flex items-center gap-1 font-bold text-xs text-white bg-neutral-600 rounded-full p-2 w-full hover:bg-blue-600"
                    onClick={() => setOpenComent(true)}
                  >
                    <AddCommentIcon
                      fontSize="small"
                      className={
                        product.observaciones &&
                        product.observaciones !== "" &&
                        "text-green-400"
                      }
                    />
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 font-bold text-xs text-white bg-neutral-900 rounded-full p-2 w-full hover:bg-red-600"
                    onClick={() => {
                      clearItemCart(product);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardProduct;
