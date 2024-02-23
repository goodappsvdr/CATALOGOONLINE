import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
// import { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import AuthGuard from "../guards/auth.guard";
// import RoleGuard from "../guards/role.guard";
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
      // children: [

      //   <ErrorBoundary FallbackComponent={FallbackErrorPage}>
      //   <Suspense fallback={<ScreenLoader />}>
      //     <ItemsFormEdit />
      //   </Suspense>
      // </ErrorBoundary>
      // ],
    },
    {
      path: "/",
      element: <HomePage />,
      // children: [

      //   <ErrorBoundary FallbackComponent={FallbackErrorPage}>
      //   <Suspense fallback={<ScreenLoader />}>
      //     <ItemsFormEdit />
      //   </Suspense>
      // </ErrorBoundary>
      // ],
    },
  ]);

  return <RouterProvider router={router} />;
};
