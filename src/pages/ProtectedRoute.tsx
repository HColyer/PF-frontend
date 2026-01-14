import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { User } from "../App";

interface ProtectedRouteProps {
  user: User | null;
  allowedRoles: User["role"][];
  children: ReactNode;
}

const ProtectedRoute = ({ user, allowedRoles, children }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;


