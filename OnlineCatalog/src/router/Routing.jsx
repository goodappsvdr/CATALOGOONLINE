import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import HomePage from "../components/pages/HomePage/HomePage";
import { ErrorBoundary } from "react-error-boundary";
import FallbackErrorPage from "../components/UI/FallbackErrorPage/FallbackErrorPage";

export const Routing = () => {
  const router = createBrowserRouter([
    {
      path: "/:id",
      element: (
        <>
          <ErrorBoundary FallbackComponent={FallbackErrorPage}>
            <MainLayout />
          </ErrorBoundary>
        </>
      ),
    },
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
