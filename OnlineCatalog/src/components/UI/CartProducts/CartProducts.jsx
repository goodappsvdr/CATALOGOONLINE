import { useCartContext } from "../../../context/CartContext/CartContext";
import styles from "./CartProducts.module.css";
// import CardItem from "../ItemsList/CardItem/CardItem";
import { Paper, TextField } from "@mui/material";
import { useState } from "react";
import CardProduct from "./CardProduct/CardProduct";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";

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
      telefono: Yup.string()
        .required("Campo requerido")
        .matches(
          // entre 8 y 15 digitos
          /^[0-9]{8,15}$/,
          "El teléfono debe tener entre 8 y 15 dígitos"
        ),
      // .matches(
      //   /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
      //   "Formato de teléfono inválido para Argentina"
      // ),
    }),

    onSubmit: (values) => {
      console.log(values);
      const newCart = cart.map((item) => {
        return {
          idItem: item.id,
          codFabrica: item.codFabrica,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          // precioUnitario: item.precioVenta redondeado a entero
          precioUnitario: Math.round(item.precioVenta),
          total: Math.round(item.precioVenta) * item.cantidad,
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
        // telefono: values.telefono, como cadena de texto
        telefono: `${values.telefono}`,
        total: parseFloat(
          cart
            .reduce((acc, item) => {
              return acc + Math.round(item.precioVenta) * item.cantidad;
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
      <Paper className="p-4 w-full h-full flex flex-col gap-3">
        <div className="w-full flex justify-between items-start">
          <h1 className="font-bold text-xl md:text-3xl">Resumen del pedido</h1>
          <button
            type="button"
            className="w-fit m-0 p-0"
            onClick={() => handleCloseModalCart()}
          >
            <CloseIcon className="w-8 hover:bg-neutral-300 rounded-full" />
          </button>
        </div>
        {/* VALIDA SI EL CATALOGO SE VENCIO */}
        {dataHeader != null &&
        dataHeader.dueDate.toISOString() > new Date().toISOString() ? (
          <>
            {cart.length !== 0 ? (
              <>
                {changeStep == "CartProducts" && (
                  <>
                    <div className="h-full max-h-full flex flex-col items-center justify-between relative">
                      <div className="w-full flex flex-1 justify-center flex-col items-center">
                        <div className="w-full flex justify-between p-3 h-fit">
                          <p className="font-bold">Producto</p>
                          <p className="pr-3 font-bold">Subtotal</p>
                        </div>
                        <div
                          className={`${styles.cartproducts} flex flex-1 gap- flex-col w-full relative`}
                        >
                          <div className="absolute top-0 bottom-0 right-0 left-0 overflow-y-auto">
                            {cart.map((item) => (
                              <CardProduct product={item} key={item.id} />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex items-end justify-end flex-col bg-white">
                        <div className="py-1 flex justify-between w-full">
                          <h3 className="font-bold text-3xl">Total</h3>
                          <h3 className="font-bold text-3xl">
                            $
                            {cart
                              .reduce((acc, item) => {
                                return (
                                  acc +
                                  Math.round(item.precioVenta) * item.cantidad
                                );
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
                        helperText={
                          formik.touched.nombre && formik.errors.nombre
                        }
                      />
                      <TextField
                        className="w-full"
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
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                      <TextField
                        className="w-full"
                        inputMode="numeric"
                        type="number"
                        onPaste={(e) => e.preventDefault()}
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-", ".", ","].includes(e.key) &&
                          e.preventDefault()
                        }
                        placeholder="Formato whatsapp sin 0 ni 15"
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
                          formik.touched.telefono &&
                          Boolean(formik.errors.telefono)
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
                              return (
                                acc +
                                Math.round(item.precioVenta) * item.cantidad
                              );
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
              <h2 className="text-lg md:text-2xl">
                No hay productos en el pedido
              </h2>
            )}
          </>
        ) : (
          <h2 className="text-lg md:text-2xl">
            El catálogo ha excedido la fecha de vigencia. Deberás solicitar el
            catálogo actualizado.
          </h2>
        )}
      </Paper>
    </div>
  );
};

export default CartProducts;
