/* eslint-disable react/prop-types */
import ErrorBoundaryIcon from "../Icons/ErrorBoundaryIcon/ErrorBoundaryIcon";
// eslint-disable-next-line no-unused-vars
import styles from "./FallbackErrorPage.module.css";

const FallbackErrorPage = ({ error }) => {
  return (
    <section className="w-full flex flex-col items-center h-full justify-center">
      <ErrorBoundaryIcon className="max-w-40 w-full" />
      <h1 className="w-full text-3xl font-black text-center pt-6">
        Lo sentimos!
      </h1>
      <p className="w-full text-xl text-center">{error.message}</p>
    </section>
  );
};

export default FallbackErrorPage;
