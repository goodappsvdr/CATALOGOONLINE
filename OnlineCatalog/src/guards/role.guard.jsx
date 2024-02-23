import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ allowedRole, children }) => {
  const { user } = useSelector((store) => store.auth);

  // const hasAccess = user.roleName.includes(allowedRole);
  const hasAccess = allowedRole.some((role) => user.roleName.includes(role));
  //Cuando cambie el loading si isauthenticated esta en true entonces no me redirige y muestra el outlet sino, me redirije

  if (!hasAccess) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RoleGuard;
