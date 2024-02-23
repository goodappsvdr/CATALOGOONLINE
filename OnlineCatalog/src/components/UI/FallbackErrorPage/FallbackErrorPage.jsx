/* eslint-disable react/prop-types */
import styles from "./FallbackErrorPage.module.css";

const FallbackErrorPage = ({ error }) => {
  return (
    <section className={` ${styles.bgPage}`}>
      <div className="h-screen w-full flex flex-1 items-center flex-col justify-center">
        <h1 className="font-bold text-2xl md:text-5xl pb-3">{error.message}</h1>
        <p className="md:text-xl pb-4">
          Puede que se trate de un error o que este catálogo no exista.
        </p>
        <p className="md:text-xl pb-6">Por favor, inténtelo nuevamente.</p>
      </div>
    </section>
  );
};

export default FallbackErrorPage;
