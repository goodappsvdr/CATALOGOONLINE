/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import styles from "./ItemsList.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CardItem from "./CardItem/CardItem";
import { useCartContext } from "../../../context/CartContext/CartContext";
import NoResultsIcon from "../Icons/NoResultsIcon/NoResultsIcon";
import NoProductsIcon from "../Icons/NoProductsIcon/NoProductsIcon";
import DueDateCalendarIcon from "../Icons/DueDateCalendarIcon/DueDateCalendarIcon";

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
    staleTime: 365 * 24 * 60 * 60 * 1000,
    cacheTime: 365 * 24 * 60 * 60 * 1000,
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
      id: id,
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
      {dataHeader != null &&
      dataHeader.dueDate.toISOString() > new Date().toISOString() ? (
        <>
          {/* // SI LA BUSQUEDA NO TRAE RESULTADOS */}
          {getCatalogItems.data.detalles.length > 0 &&
            dataFilter.length === 0 && (
              <div className="w-full flex flex-col items-center h-full justify-center">
                <NoResultsIcon className="max-w-40 w-full" />
                <h6 className="w-full text-3xl font-black text-center pt-6">
                  Lo sentimos!
                </h6>
                <p className="w-full text-xl text-center">
                  No se encontraron resultados.
                </p>
              </div>
            )}
          {/* // SI LA PATICÍON NO TRAE RESULTADOS */}
          {getCatalogItems.data.detalles.length === 0 && (
            <div className="w-full flex flex-col items-center h-full justify-center">
              <NoProductsIcon className="max-w-40 w-full" />
              <h6 className="w-full text-3xl font-black text-center pt-6">
                Lo sentimos!
              </h6>
              <p className="w-full text-xl text-center">
                No se encontraron productos en este catálogo.
              </p>
              {dataHeader != null && dataHeader.phone != null && (
                <a
                  href={
                    dataHeader != null &&
                    `https://wa.me/${dataHeader.phone}?text=Hola!%20Quiero%20solicitar%20un%20nuevo%20catálogo`
                  }
                  className="bg-neutral-500 hover:bg-neutral-800 text-lg mt-3 text-white font-bold py-1 px-4 rounded-md w-fit flex justify-center items-center gap-1"
                >
                  Solicitar nuevo catálogo
                </a>
              )}
            </div>
          )}
          {/* LISTADO DE ITEMS */}
          <div
            className={`${styles.itemslist} grid grid-cols-1 gap-8 md:gap-2 relative px-4`}
          >
            {dataFilter.map((item, index) => (
              <div key={item.id}>
                {/* TITULO DE RUBRO SI CAMBIA */}
                {dataFilter.indexOf(item) === 0 ||
                dataFilter[dataFilter.indexOf(item) - 1].rubro !==
                  item.rubro ? (
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
                {/* TITULO DE SUBRUBRO SI CAMBIA */}
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
      ) : (
        // SI LA FECHA DE VIGENCIA DEL CATALOGO EXPIRO
        <div className="w-full flex flex-col items-center h-full justify-center">
          <DueDateCalendarIcon className="max-w-40 w-full" />
          <h6 className="w-full text-3xl font-black text-center pt-6">
            Lo sentimos!
          </h6>
          <p className="w-full text-xl text-center">
            Este catálogo ha excedido la fecha de vigencia.
          </p>
          {dataHeader != null && dataHeader.phone != null && (
            <a
              href={
                dataHeader != null &&
                `https://wa.me/${dataHeader.phone}?text=Hola!%20Quiero%20solicitar%20un%20nuevo%20catálogo`
              }
              className="bg-neutral-500 hover:bg-neutral-800 text-lg mt-3 text-white font-bold py-1 px-4 rounded-md w-fit flex justify-center items-center gap-1"
            >
              Solicitar nuevo catálogo
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default ItemsList;
