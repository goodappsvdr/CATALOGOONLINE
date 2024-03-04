/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import styles from "./CardProduct.module.css";
import { useCartContext } from "../../../../context/CartContext/CartContext";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import DeleteIcon from "../../Icons/DeleteIcon/DeleteIcon";
import DeleteHoverIcon from "../../Icons/DeleteHoverIcon/DeleteHoverIcon";
import ObservationsIcon from "../../Icons/ObservationsIcon/ObservationsIcon";
import ObservationsHoverIcon from "../../Icons/ObservationsHoverIcon/ObservationsHoverIcon";
import AddIcon from "../../Icons/AddIcon/AddIcon";
import RemoveIcon from "../../Icons/RemoveIcon/RemoveIcon";
import AddHoverIcon from "../../Icons/AddHoverIcon/AddHoverIcon";
import RemoveHoverIcon from "../../Icons/RemoveHoverIcon/RemoveHoverIcon";
import ObservationsTrueIcon from "../../Icons/ObservationsTrueIcon/ObservationsTrueIcon";
import ObservationsTrueHoverIcon from "../../Icons/ObservationsTrueHoverIcon/ObservationsTrueHoverIcon";

const CardProduct = ({ product }) => {
  const {
    cart,
    add,
    remove,
    dataHeader,
    clearItemCart,
    addObservation,
    addQuantity,
  } = useCartContext();
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

  // pasar a entero el precio redondeado
  product.precioVenta = isNaN(product.precioVenta)
    ? ""
    : Math.round(product.precioVenta);

  return (
    <>
      {openComent && (
        <form onSubmit={formik.handleSubmit}>
          <div className="border-black border-2 p-2 mt-6 mb-2 flex gap-3 flex-col">
            <TextField
              className="w-full"
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
        <div className="border-black border-2 p-2 mt-8 mb-2 flex gap-3 h-36">
          <div className="relative flex justify-start w-fit h-fit">
            <img
              src={product.imagen}
              alt=""
              className="mt-[-34px] left-0 w-40 h-40 object-cover aspect-[1]"
            />
          </div>
          <div className="h-full w-full flex flex-col flex-1">
            <h2 className="p-0 m-0 font-bold one-line-ellipsis w-full">
              {product.descripcion}
            </h2>
            <p className="text-neutral-600 font-medium text-sm">
              $ {Math.round(product.precioVenta)}
            </p>
            <div className="flex justify-between w-full items-end flex-1">
              <div className="w-fit">
                {dataHeader != null &&
                  dataHeader.dueDate.toISOString() >
                    new Date().toISOString() && (
                    <div className="w-fit">
                      {itemInCart ? (
                        <div className="w-fit flex items-center gap-">
                          <button
                            type="button"
                            className="iconContainer"
                            onClick={() => {
                              remove(product);
                              formik.setFieldValue(
                                "quantity",
                                itemInCart ? itemInCart.cantidad : 0
                              );
                            }}
                          >
                            <RemoveIcon className={`w-8 icon`} />
                            <RemoveHoverIcon className={`w-8 iconHover`} />
                          </button>
                          <input
                            className="w-10 border-0 text-center font-black text-3xl max-h-8"
                            inputMode="numeric"
                            type="number"
                            onPaste={(e) => e.preventDefault()}
                            onKeyDown={(e) =>
                              ["e", "E", "+", "-", ".", ","].includes(e.key) &&
                              e.preventDefault()
                            }
                            id="quantity"
                            name="quantity"
                            color={"primary"}
                            value={itemInCart ? itemInCart.cantidad : ""}
                            onBlur={(e) => {
                              if (e.target.value === "" || e.target.value < 1) {
                                e.target.value = 1;
                                addQuantity(product, 1);
                              }
                            }}
                            onChange={(e) => {
                              if (e.target.value > 99) {
                                e.target.value = 99;
                              }
                              addQuantity(product, e.target.value);
                            }}
                            size="small"
                          />
                          <button
                            type="button"
                            className="iconContainer"
                            onClick={() => {
                              add(product);
                              formik.setFieldValue(
                                "quantity",
                                itemInCart ? itemInCart.cantidad : 0
                              );
                            }}
                          >
                            <AddIcon className={`w-8 icon`} />
                            <AddHoverIcon className={`w-8 iconHover`} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="bg-black hover:bg-neutral-900 text-white w-fit py-2 mt-3 px-5 rounded-xl font-bold text-sm"
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
                    ? (
                        itemInCart.cantidad * Math.round(product.precioVenta)
                      ).toFixed(2)
                    : ""}
                </p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="iconContainer flex items-center w-full"
                    onClick={() => setOpenComent(true)}
                  >
                    {itemInCart && itemInCart.observaciones ? (
                      <>
                        <ObservationsTrueIcon className={`w-8 icon bg-white`} />
                        <ObservationsTrueHoverIcon
                          className={`w-8 iconHover`}
                        />
                      </>
                    ) : (
                      <>
                        <ObservationsIcon className={`w-8 icon bg-white`} />
                        <ObservationsHoverIcon className={`w-8 iconHover`} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="iconContainer flex items-center w-full"
                    onClick={() => {
                      clearItemCart(product);
                    }}
                  >
                    <DeleteIcon className={`w-8 icon`} />
                    <DeleteHoverIcon className={`w-8 iconHover`} />
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
