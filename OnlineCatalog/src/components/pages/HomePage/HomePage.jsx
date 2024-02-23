import styles from "./HomePage.module.css";
import catalogOnline from "../../../assets/favicon/catalogoOnline.png";

const HomePage = () => {
  return (
    <div className={` ${styles.bgPage}`}>
      <div
        className={`${styles.homepage} w-full max-w-6xl mx-auto h-screen flex items-center flex-col justify-center p-3`}
      >
        <img src={catalogOnline} alt="" className="h-60 w-60 mb-10" />
        <h1 className="text-xl md:text-5xl font-bold text-center">
          Bienvenido al catálogo en línea
        </h1>
        <h2 className="text-md md:text-2xl text-center mt-5">
          ¡Te damos la bienvenida al revolucionario catálogo en línea, la forma
          más innovadora y rápida de crear tu propio catálogo web! Con nuestra
          plataforma fácil de usar, podrás mostrar tus productos de manera
          atractiva y profesional en cuestión de minutos.
        </h2>
      </div>
    </div>
  );
};

export default HomePage;
