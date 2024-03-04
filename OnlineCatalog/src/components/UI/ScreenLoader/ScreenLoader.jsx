import styles from "./ScreenLoader.module.css";
import { LoaderDots } from "../Icons/LoaderDots/LoaderDots";

const ScreenLoader = () => {
  return (
    <div
      className={`${styles.screenloader} h-screen w-screen absolute top-0 right-0 left-0`}
    >
      {/* <Skeleton
        sx={{ height: "100%" }}
        variant="rectangular"
        animation="wave"
      /> */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full flex flex-col items-center h-full justify-center">
          <LoaderDots
            width="8em"
            height="8em"
            className="text-centroSalud-900 h-28"
          />
          <h6 className="w-full text-3xl font-black text-center pt-6">
            Cargando!
          </h6>
          <p className="w-full text-xl text-center">Espere un momento.</p>
        </div>
      </div>
    </div>
  );
};

export default ScreenLoader;
