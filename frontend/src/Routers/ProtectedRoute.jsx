import { Navigate, Outlet, useLocation } from "react-router-dom";

const getToken = () => localStorage.getItem("token");
const getRole = () => localStorage.getItem("role");

export const getDefaultPathByRole = (role) => {
  if (role === "cashier") return "/POS";
  return "/Dashboard";
};

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={getDefaultPathByRole(role)} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
