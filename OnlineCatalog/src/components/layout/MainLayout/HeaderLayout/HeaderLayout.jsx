/* eslint-disable react/prop-types */
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
// eslint-disable-next-line no-unused-vars
import styles from "./HeaderLayout.module.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CopyToClipboard from "react-copy-to-clipboard";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import {
  // WhatsappShareButton,
  // TwitterShareButton,
  // FacebookShareButton,
  FacebookIcon,
  // TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { toast } from "sonner";
import { useCartContext } from "../../../../context/CartContext/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const HeaderLayout = ({ setSearchParams, searchParams }) => {
  const search = searchParams.get("search");
  const [share, setShare] = useState(false);
  const { handleOpenModalCart, dataHeader } = useCartContext();

  const currentUrl = window.location.href;

  const shareOnWhatsApp = () => {
    var textToShare = "Hola, te comparto este catalogo";
    var encodedText = encodeURIComponent(textToShare);
    var encodedUrl = encodeURIComponent(currentUrl);
    var whatsappShareLink =
      "https://api.whatsapp.com/send?text=" + encodedText + "%20" + encodedUrl;
    window.open(whatsappShareLink);
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      "_blank"
    );
  };

  // const shareOnTwitter = () => {
  //   window.open(`https://twitter.com/intent/tweet?url=${currentUrl}`, "_blank");
  // };

  return (
    <AppBar position="fixed" className="pt-4 lg:py-4" sx={{ bgcolor: "#FFF" }}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          className="flex justify-between items-center lg:gap-6"
        >
          {dataHeader != null && (
            <>
              <div className="flex items-center">
                <img
                  src={dataHeader.image}
                  alt={"Logo de" + dataHeader.title}
                  className="h-20 hidden lg:flex mr-6"
                />
                <h1 className="text-black text-2xl font-bold hidden lg:flex">
                  {dataHeader != null && dataHeader.title}
                </h1>
              </div>
              <TextField
                input
                className="flex-1"
                InputProps={{
                  sx: {
                    overflow: "hidden",
                    borderRadius: "8px",
                    height: "40px",
                    color: "#282828",
                    // ":hover": { bgcolor: "#f7d4d8" },
                  },
                }}
                InputLabelProps={{
                  sx: { color: "#282828", fontSize: "14px" },
                }}
                label="Buscador"
                placeholder="Escribe el nombre, código, rubro o subrubro"
                variant="filled"
                color={"primary"}
                size="small"
                value={search}
                onChange={(e) => setSearchParams({ search: e.target.value })}
              />
              <div className="hidden lg:flex flex-col">
                <div className="flex">
                  <p className="text-black font-bold pr-1">Télefono:</p>
                  <a
                    href={
                      dataHeader != null &&
                      `https://wa.me/${dataHeader.phone}?text=Hola%20quiero%20hacer%20un%20pedido`
                    }
                    className="text-black  flex items-end border-b-2 gap-1 border-b-black"
                  >
                    {dataHeader != null && dataHeader.phone}
                    <PermPhoneMsgIcon fontSize="small" />
                  </a>
                </div>
                <p className="text-black">
                  <span className="text-black font-bold">
                    Precios vigentes hasta:{" "}
                  </span>
                  {dataHeader != null &&
                  new Date(
                    new Date(dataHeader.date).getTime() +
                      20 * 24 * 60 * 60 * 1000
                  ).toISOString() > new Date().toISOString() ? (
                    new Date(
                      new Date(dataHeader.date).getTime() +
                        20 * 24 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")
                  ) : (
                    <>
                      {"   "}
                      <span className="text-red-500 font-bold uppercase">
                        {" "}
                        Vencido{" "}
                      </span>
                    </>
                  )}
                </p>
                <div className="flex gap-2">
                  <button
                    className="bg-neutral-500 text-white font-bold py-1 px-2 rounded-md w-full flex justify-center items-center gap-1"
                    type="button"
                    onClick={() => {
                      handleOpenModalCart();
                    }}
                  >
                    <p>Ver pedido</p>
                    <ShoppingCartIcon fontSize="small" className="m-0 p-0" />
                  </button>
                  <div className="flex items-center w-full">
                    <button
                      type="button"
                      className="bg-neutral-800 text-white font-bold py-1 px-2 rounded-md w-full relative"
                      onClick={() => setShare(!share)}
                    >
                      Compartir
                      {share && (
                        <div className="absolute top-[40px] flex z-10 p-4 gap-4 left-[calc(50%-85px)] bg-black rounded-md">
                          <button
                            className="p-0 bg-transparent"
                            type="button"
                            onClick={shareOnWhatsApp}
                          >
                            <WhatsappIcon size={36} borderRadius={8} />
                          </button>
                          <button
                            className="p-0 bg-transparent"
                            type="button"
                            onClick={shareOnFacebook}
                          >
                            <FacebookIcon size={36} borderRadius={8} />
                          </button>
                          {/* <button
                            className="p-0 bg-transparent"
                            type="button"
                            onClick={shareOnTwitter}
                          >
                            <TwitterIcon height={36} width={36} />
                          </button> */}
                          <CopyToClipboard
                            text={currentUrl}
                            onCopy={() => {
                              toast("Enlace copiado!", {
                                duration: 1000,
                              });
                            }}
                          >
                            <ContentCopyRoundedIcon
                              style={{ cursor: "pointer" }}
                              fontSize="large"
                            />
                          </CopyToClipboard>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {dataHeader != null && (
            <>
              <div className="flex justify-center items-center flex-col w-full lg:hidden gap-1">
                <img
                  src={dataHeader != null && dataHeader.image}
                  alt="logo"
                  className="h-20 flex lg:hidden"
                />
                <h1 className="text-black text-2xl font-bold text-center py-2">
                  {dataHeader != null && dataHeader.title}
                </h1>
                <TextField
                  input
                  className="w-full"
                  InputProps={{
                    sx: {
                      overflow: "hidden",
                      borderRadius: "8px",
                      height: "36px",
                      color: "#282828",
                      // ":hover": { bgcolor: "#f7d4d8" },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#282828",
                      fontSize: "12px",
                      paddingBottom: "10px",
                    },
                  }}
                  label="Buscador"
                  placeholder="Escribe el nombre, código, rubro o subrubro"
                  variant="filled"
                  color={"primary"}
                  size="small"
                  value={search}
                  onChange={(e) => setSearchParams({ search: e.target.value })}
                />

                <div className="flex lg:hidden flex-col items-center mt-3 w-full">
                  <div className="bg-[#DADADA] w-screen px-6 sm:px-8 py-2">
                    <div className="flex items-center">
                      <p className="text-black font-bold text-sm pr-1">
                        Télefono:{" "}
                      </p>
                      <a
                        href={
                          dataHeader != null &&
                          `https://wa.me/${dataHeader.phone}?text=Hola%20quiero%20hacer%20un%20pedido`
                        }
                        className="text-black text-sm flex items-end border-b-2 gap-1 border-b-black"
                      >
                        {dataHeader != null && dataHeader.phone}
                        <PermPhoneMsgIcon
                          fontSize="small"
                          className="p-[2px]"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="bg-[#CECECE] w-screen px-6 sm:px-8 py-2">
                    <div className="flex items-center">
                      <p className="text-black text-sm">
                        <span className="text-black font-bold text-sm">
                          {" "}
                          Precios vigentes hasta:{" "}
                        </span>
                        {dataHeader != null &&
                        new Date(
                          new Date(dataHeader.date).getTime() +
                            20 * 24 * 60 * 60 * 1000
                        ).toISOString() > new Date().toISOString() ? (
                          new Date(
                            new Date(dataHeader.date).getTime() +
                              20 * 24 * 60 * 60 * 1000
                          )
                            .toISOString()
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")
                        ) : (
                          <>
                            {"   "}
                            <span className="text-red-500 font-bold uppercase">
                              {" "}
                              Vencido{" "}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#bdbdbd] w-screen px-6 sm:px-8 py-2">
                    <div className="flex gap-2">
                      <button
                        className="bg-neutral-500 text-white font-bold py-1 px-2 rounded-md w-full flex justify-center items-center gap-1"
                        type="button"
                        onClick={() => {
                          handleOpenModalCart();
                        }}
                      >
                        <p>Ver pedido</p>
                        <ShoppingCartIcon
                          fontSize="small"
                          className="m-0 p-0"
                        />
                      </button>
                      <div className="flex items-center w-full">
                        <button
                          type="button"
                          className="bg-neutral-800 text-white font-bold py-1 px-2 rounded-md w-full relative"
                          onClick={() => setShare(!share)}
                        >
                          Compartir
                          {share && (
                            <div className="absolute top-[40px] flex z-10 p-4 gap-4 left-[calc(50%-85px)] bg-black rounded-md">
                              <button
                                className="p-0 bg-transparent"
                                type="button"
                                onClick={shareOnWhatsApp}
                              >
                                <WhatsappIcon size={36} borderRadius={8} />
                              </button>
                              <button
                                className="p-0 bg-transparent"
                                type="button"
                                onClick={shareOnFacebook}
                              >
                                <FacebookIcon size={36} borderRadius={8} />
                              </button>
                              {/* <button
                            className="p-0 bg-transparent"
                            type="button"
                            onClick={shareOnTwitter}
                          >
                            <TwitterIcon height={36} width={36} />
                          </button> */}
                              <CopyToClipboard
                                text={currentUrl}
                                onCopy={() => {
                                  toast("Enlace copiado!", {
                                    duration: 1000,
                                  });
                                }}
                              >
                                <ContentCopyRoundedIcon
                                  style={{ cursor: "pointer" }}
                                  fontSize="large"
                                />
                              </CopyToClipboard>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderLayout;
