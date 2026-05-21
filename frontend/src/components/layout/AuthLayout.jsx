import { Navigate, Outlet } from "react-router-dom";
import { getDefaultPathByRole } from "../../Routers/ProtectedRoute";

const AuthLayout = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    return <Navigate to={getDefaultPathByRole(role)} replace />;
  }

  return (
    <div className="auhLayout">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
