import { Skeleton } from "@mui/material";
import styles from "./ScreenLoader.module.css";
import { LoaderDots } from "../Icons/LoaderDots/LoaderDots";

const ScreenLoader = () => {
  return (
    <div className={`${styles.screenloader} h-screen w-screen relative`}>
      <Skeleton
        sx={{ height: "100%" }}
        variant="rectangular"
        animation="wave"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center">
          <LoaderDots
            width="7em"
            height="7em"
            className="text-centroSalud-900"
          />
          <h1 className="text-center mt-10 sm:text-lg min-w-48">
            El catálogo está cargando,
          </h1>
          <h1 className="text-center sm:text-lg">espere un momento.</h1>
        </div>
      </div>
    </div>
  );
};

export default ScreenLoader;
