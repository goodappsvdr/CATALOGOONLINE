// eslint-disable-next-line no-unused-vars
import styles from "./HomePage.module.css";
import image from "../../../../public/images/fondo 1.jpg";
import image2 from "../../../../public/images/fondo 2.jpg";
const HomePage = () => {
  return (
    <div className="h-screen w-screen relative">
      <img
        src={image}
        alt=""
        className="hidden lg:block w-screen h-screen object-cover object-left-top absolute top-0 left-0 z-0"
      />
      <img
        src={image2}
        alt=""
        className="block lg:hidden w-screen h-screen object-cover object-right-top absolute top-0 left-0 z-0"
      />
      <div
        // className={`z-10 w-full max-lg:p-10 absolute top-2/3 -translate-y-1/2 md:-translate-y-1/3 lg:top-1/2 left-1/2 transform -translate-x-1/2 lg:-translate-y-1/2 lg:flex lg:items-center lg:justify-end`}
        className={`z-10 w-full max-lg:p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center lg:justify-end`}
      >
        <div className="bg-white lg:bg-transparent max-lg:bg-opacity-80 p-10 rounded-lg max-lg:shadow-lg lg:w-1/2 max-lg:flex items-center flex-col">
          <h1 className="text-4xl md:text-6xl font-black max-lg:text-center text-[#003A52]">
            Bienvenido!!!
          </h1>
          <h2 className="text-[#003A52] text-2xl md:text-4xl lg:text-5xl max-lg:text-center uppercase font-semibold">
            catálogo en línea
          </h2>
          <p className="text-[#003A52] text-xl text-md lg:text-2xl max-lg:text-center mt-5">
            Vendé y aumentá tu rentabilidad, con esta forma innovadora y rápida.
          </p>
          <h2 className="text-[#003A52] text-xl text-md lg:text-2xl max-lg:text-center mt-5 font-semibold">
            Crea tu propio catálogo web fácilmente.
          </h2>
          <p className="text-[#003A52] text-xl text-md lg:text-2xl max-lg:text-center mt-5">
            Mostramos tus productos de manera atractiva y visual, en cuestión de
            minutos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
