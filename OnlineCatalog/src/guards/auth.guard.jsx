import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import MFLoader from "../components/UI/MFLoader/MFLoader";

export const AuthGuard = () => {
  const { isAuthenticated, loading } = useSelector((store) => store.auth);
  const location = useLocation();
  const navigate = useNavigate();
  //Cuando cambie el loading si isauthenticated esta en true entonces no me redirige y muestra el outlet sino, me redirije

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login", { state: location.pathname });
    }
  }, [isAuthenticated]);

  console.log(loading);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    loading && (
      <div className="mf-loader-div-guard">
        {/* <MFLoader /> */}
        cargando..
      </div>
    )
  );
};

export default AuthGuard;
