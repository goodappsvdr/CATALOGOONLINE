import MainPage from "../../pages/MainPage/MainPage";
import HeaderLayout from "./HeaderLayout/HeaderLayout";
import styles from "./MainLayout.module.css";
import { useSearchParams } from "react-router-dom";
import { CartProvider } from "../../../context/CartContext/CartContext";

const MainLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="h-full pt-[19rem] lg:pt-28 relative">
      <CartProvider>
        <div className={`${styles.mainlayout} h-full`}>
          <HeaderLayout
            setSearchParams={setSearchParams}
            searchParams={searchParams}
          />
          <MainPage searchParams={searchParams} />
        </div>
      </CartProvider>
    </div>
  );
};

export default MainLayout;
