import { useCartContext } from "../../../context/CartContext/CartContext";
import styles from "./CartProducts.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
// import CardItem from "../ItemsList/CardItem/CardItem";
import { Paper, TextField } from "@mui/material";
import { useState } from "react";
import CardProduct from "./CardProduct/CardProduct";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const newOrder = async (form) => {
  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Type", "application/json");
  // if (token) {
  //   myHeaders.append("Authorization", "Bearer " + token);
  // }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(form),
    redirect: "follow",
  };
  const response = await fetch(
    "https://goodappscore.com.ar/precioscuidados/api/CatalogosPedidos/Add",
    requestOptions
  );

  if (!response.ok) {
    // El servidor respondió con un estado de error, lanzamos una excepción con el mensaje de error del servidor
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  // sale status 200
  // devolver un un array vacio
  if (response.status === 200) {
    return [];
  }
};

const CartProducts = () => {
  const {
    cart,
    handleCloseModalCart,
    dataHeader,
    getClientData,
    clientData,
    saveClientData,
    clearCart,
  } = useCartContext();
  const [openList, setOpenList] = useState(true);
  const [changeStep, setChangeStep] = useState("CartProducts");
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      nombre: clientData == null ? "" : clientData.nombre,
      email: clientData == null ? "" : clientData.email,
      telefono: clientData == null ? "" : clientData.telefono,
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Campo requerido"),
      email: Yup.string().email("Email inválido").required("Campo requerido"),
      telefono: Yup.string().required("Campo requerido"),
    }),
    onSubmit: (values) => {
      const newCart = cart.map((item) => {
        return {
          idItem: item.id,
          codFabrica: item.codFabrica,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          precioUnitario: item.precioVenta,
          total: item.precioVenta * item.cantidad,
          observaciones: item.observaciones ? item.observaciones : "",
        };
      });

      saveClientData({
        nombre: values.nombre,
        email: values.email,
        telefono: values.telefono,
      });

      const data = {
        idCatalago: parseInt(id),
        nombre: values.nombre,
        email: values.email,
        telefono: values.telefono,
        total: parseFloat(
          cart
            .reduce((acc, item) => {
              return acc + item.precioVenta * item.cantidad;
            }, 0)
            .toFixed(2)
        ),
        catalagoPedidoDetalle: newCart,
      };
      mutation.mutate(data);
    },
  });

  const mutation = useMutation({
    mutationFn: newOrder,
    onSuccess: () => {
      toast.success("Exito", {
        description: "Tu pedido fue realizado con éxito!",
        duration: 3000,
      });
      clearCart();
      handleCloseModalCart();
    },
    onError: (error) => {
      toast.error("Hubo un error", {
        description: `${error.message}`,
        duration: 3000,
      });
    },
  });

  return (
    <div className="w-full overflow-hidden">
      {/* <div className="w-full rounded-3xl overflow-hidden"> */}
      <Paper className="p-4 w-full h-full flex flex-col gap-3">
        <div className="w-full flex justify-between items-start">
          <h1 className="font-bold text-xl md:text-3xl">Pedido de compra</h1>
          <button
            type="button"
            className="w-fit m-0 p-0"
            onClick={() => handleCloseModalCart()}
          >
            <CancelIcon />
          </button>
        </div>

        {cart.length !== 0 ? (
          <>
            {changeStep == "CartProducts" && (
              <>
                <div className="h-full max-h-full flex flex-col items-center justify-between relative">
                  <div className="w-full flex justify-center flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setOpenList(!openList)}
                      className=" px-5 bg-neutral-700 text-white rounded-3xl py-2 w-fit text-xs"
                    >
                      {openList ? "Ocultar" : "Ver"} productos{" "}
                      {openList ? "▲" : "▼"}
                    </button>

                    {openList && (
                      <>
                        <div className="w-full flex justify-between p-3">
                          <p className="font-bold">Producto</p>
                          <p className="pr-3 font-bold">Subtotal</p>
                        </div>
                        <div
                          className={`${styles.cartproducts} flex flex-1 gap-1 flex-col w-full max-h-[72vh] overflow-y-scroll`}
                        >
                          {cart.map((i) => {
                            return (
                              <>
                                <CardProduct product={i} />
                              </>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="w-full flex items-end justify-end flex-col">
                    <div className="py-1 flex justify-between w-full">
                      <h3 className="font-bold text-xl">Total</h3>
                      <h3 className="font-bold text-xl">
                        $
                        {cart
                          .reduce((acc, item) => {
                            return acc + item.precioVenta * item.cantidad;
                          }, 0)
                          .toFixed(2)}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="font-bold px-5 bg-green-700 text-white rounded-md py-2 w-full"
                      disabled={
                        dataHeader.dueDate.toISOString() <
                        new Date().toISOString()
                      }
                      onClick={() => {
                        getClientData();
                        setChangeStep("Form");
                      }}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </>
            )}
            {changeStep == "Form" && (
              <>
                <h6 className="font-bold text-lg">Información personal</h6>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={formik.handleSubmit}
                >
                  <TextField
                    className="w-full"
                    input
                    InputProps={{
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
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    variant="filled"
                    color={"primary"}
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      formik.touched.nombre && Boolean(formik.errors.nombre)
                    }
                    helperText={formik.touched.nombre && formik.errors.nombre}
                  />
                  <TextField
                    className="w-full"
                    input
                    InputProps={{
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
                    id="email"
                    name="email"
                    label="Email"
                    variant="filled"
                    color={"primary"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="small"
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    className="w-full"
                    input
                    InputProps={{
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
                    id="telefono"
                    name="telefono"
                    label="Teléfono "
                    variant="filled"
                    color={"primary"}
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="small"
                    error={
                      formik.touched.telefono && Boolean(formik.errors.telefono)
                    }
                    helperText={
                      formik.touched.telefono && formik.errors.telefono
                    }
                  />
                  <h6 className="font-bold text-lg mt-3 flex flex-col gap-1">
                    Información del pedido
                  </h6>
                  <div className="w-full flex justify-between items-center">
                    <h6>Cantidad de productos</h6>
                    <span className="font-bold">
                      {cart.reduce((acc, item) => acc + item.cantidad, 0)}
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <h6>Cantidad de rubros</h6>
                    <span className="font-bold">
                      {/* recore cart y cuenta cuantos cart.rubros diferntes hay */}
                      {
                        cart.reduce(
                          (acc, item) =>
                            acc.includes(item.rubro)
                              ? acc
                              : [...acc, item.rubro],
                          []
                        ).length
                      }
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center mb-3">
                    <h6>Total</h6>
                    <span className="font-bold">
                      $
                      {cart
                        .reduce((acc, item) => {
                          return acc + item.precioVenta * item.cantidad;
                        }, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full flex gap-3">
                    <button
                      type="button"
                      className="font-bold px-5 bg-neutral-700 text-white rounded-md py-2 w-full"
                      onClick={() => setChangeStep("CartProducts")}
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      className="font-bold px-5 bg-green-700 text-white rounded-md py-2 w-full"
                    >
                      Finalizar pedido
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        ) : (
          <h2 className="text-lg md:text-2xl">No hay productos en el pedido</h2>
        )}
      </Paper>
    </div>
  );
};

export default CartProducts;
