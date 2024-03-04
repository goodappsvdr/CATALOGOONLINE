import { Suspense } from "react";
import ItemsList from "../../UI/ItemsList/ItemsList";
import styles from "./MainPage.module.css";
import ScreenLoader from "../../UI/ScreenLoader/ScreenLoader";
import { Modal } from "@mui/material";
import { useCartContext } from "../../../context/CartContext/CartContext";
import CartProducts from "../../UI/CartProducts/CartProducts";
// import PrintIcon from "@mui/icons-material/Print";

// eslint-disable-next-line react/prop-types
const MainPage = ({ searchParams }) => {
  const { modalCart, handleCloseModalCart } = useCartContext();

  return (
    <>
      {/* <button
        className="absolute bg-neutral-700 right-2 top-0 p-2 rounded-3xl"
                            type="button"
        onClick={() => window.print()}
      >
        <PrintIcon className="text-white" />
      </button> */}
      <Modal
        open={modalCart}
        onClose={handleCloseModalCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-end items-start h-screen w-screen bg-black bg-opacity-80"
      >
        <div className="flex align-middle h-full max-h-full w-full md:max-w-lg">
          <CartProducts />
        </div>
      </Modal>

      <Suspense fallback={<ScreenLoader />}>
        <div
          className={`${styles.mainpage} max-w-6xl mx-auto p-4 lg:px-0 relative h-full`}
        >
          <ItemsList searchParams={searchParams} />
        </div>
      </Suspense>
    </>
  );
};

export default MainPage;
