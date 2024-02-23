/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import styles from "./ItemsList.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CardItem from "./CardItem/CardItem";
import { useCartContext } from "../../../context/CartContext/CartContext";

const fechGetCatalogItems = async ({ id }) => {
  var myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Content-Type", "application/json");
  // if (token) {
  //   myHeaders.append("Authorization", "Bearer " + token);
  // }

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "https://goodappscore.com.ar/precioscuidados/api/Items/GetCatalogo/" + id,
    requestOptions
  );

  if (!response.ok) {
    throw new Error("Error al traer la lista");
  } else if (response.status === 204) {
    return [];
  }

  const data = await response.json();
  return data;
};

const ItemsList = ({ searchParams }) => {
  const { id } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const { setDataHeader, dataHeader } = useCartContext();

  const search = searchParams.get("search");
  let dataFilter = [];

  const getCatalogItems = useQuery({
    queryKey: ["getCboCatalogItems", id],
    queryFn: () => fechGetCatalogItems({ id }),
    suspense: true,
    staleTime: 24 * 60 * 60 * 1000,
    // cacheTime: 60 * 20,
  });
  // // #################################################

  if (search) {
    dataFilter = getCatalogItems.data.detalles.filter((item) => {
      return (
        item.codFabrica.toLowerCase().includes(search.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
        item.subRubro.toLowerCase().includes(search.toLowerCase()) ||
        item.rubro.toLowerCase().includes(search.toLowerCase())
      );
    });
  } else {
    dataFilter = getCatalogItems.data.detalles;
  }
  // #################################################

  useEffect(() => {
    setDataHeader({
      title: getCatalogItems.data.fantasia,
      phone: getCatalogItems.data.telefono,
      image: getCatalogItems.data.logo,
      date: getCatalogItems.data.fecha,
      dueDate:
        getCatalogItems.data.fecha != ""
          ? new Date(
              new Date(getCatalogItems.data.fecha).getTime() +
                20 * 24 * 60 * 60 * 1000
            )
          : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* // SI LA BUSQUEDA NO TRAE RESULTADOS */}
      {getCatalogItems.data.detalles.length > 0 && dataFilter.length === 0 && (
        <div className="w-full flex flex-col items-center">
          <img
            src="https://img.freepik.com/vector-premium/ilustracion-preguntas-frecuentes-ilustracion-diseno-moderno-plano_566886-222.jpg"
            alt=""
            className="max-w-lg w-full"
          />
          <p className="w-full text-xl font-bold text-center pt-10">
            Lo sentimos, no se encontraron resultados para esa busqueda
          </p>
        </div>
      )}
      {/* // SI LA PATICÍON NO TRAE RESULTADOS */}
      {getCatalogItems.data.detalles.length === 0 && (
        <div className="w-full flex flex-col items-center">
          <img
            src="https://img.freepik.com/vector-gratis/no-hay-ilustracion-concepto-datos_114360-2506.jpg?w=1380&t=st=1708623045~exp=1708623645~hmac=d9ee7433d27a02db941283cc21ff7365ebb3a55b25e8c5a3f41f5cc192cda10e"
            alt=""
            className="max-w-lg w-full"
          />
          <p className="w-full text-xl font-bold text-center pt-10">
            Lo sentimos, no hay items en este catalogo
          </p>
        </div>
      )}

      {/* LISTADO DE ITEMS */}
      <div
        className={`${styles.itemslist} grid grid-cols-1 gap-8 md:gap-2 relative px-4`}
      >
        {dataFilter.map((item, index) => (
          <div key={item.id}>
            {/* aca agregare una titulo cuando el rubro cambie del anterior */}
            {dataFilter.indexOf(item) === 0 ||
            dataFilter[dataFilter.indexOf(item) - 1].rubro !== item.rubro ? (
              <h2
                className={
                  index == 0
                    ? "w-full h-auto bg-black p-2 uppercase text-white text-4xl font-bold"
                    : "mt-16 w-full h-auto bg-black p-2 uppercase text-white text-4xl font-bold"
                }
              >
                {item.rubro}
              </h2>
            ) : (
              ""
            )}
            {/* aca agregare una titulo cuando el subrubro cambie del anterior */}
            {dataFilter.indexOf(item) === 0 ||
            dataFilter[dataFilter.indexOf(item) - 1].subRubro !==
              item.subRubro ? (
              <h4
                className={
                  index == 0
                    ? "w-full h-auto bg-zinc-600 p-2 mt-6 mb-10 uppercase text-white text-xs md:text-base font-bold"
                    : "w-full h-auto bg-zinc-600 p-2 mt-8 mb-10 uppercase text-white text-xs md:text-base font-bold"
                }
              >
                {item.subRubro}
              </h4>
            ) : (
              ""
            )}
            <CardItem
              item={item}
              // dueDate={dataHeader == null ? null : dataHeader.dueDate}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemsList;
