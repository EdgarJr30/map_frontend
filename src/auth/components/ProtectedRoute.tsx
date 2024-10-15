import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoleId?: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoleId }) => {
  const token = localStorage.getItem("token");
  const roleId = Number(localStorage.getItem("roleId"));
  if (!token || (allowedRoleId !== undefined && roleId !== allowedRoleId)) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
