import MainPage from "../../pages/MainPage/MainPage";
import HeaderLayout from "./HeaderLayout/HeaderLayout";
import styles from "./MainLayout.module.css";
import { useSearchParams } from "react-router-dom";
import { CartProvider } from "../../../context/CartContext/CartContext";

const MainLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <CartProvider>
      <div className={`${styles.mainlayout}`}>
        <HeaderLayout
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
        <MainPage searchParams={searchParams} />
      </div>
    </CartProvider>
  );
};

export default MainLayout;
