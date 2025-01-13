import { Navigate } from "react-router-dom";

interface GuardProtectedRouteProps {
  children: React.ReactNode;
  userRole: string | null;
  allowedRoles: string[];
}

const GuardProtectedRoute: React.FC<GuardProtectedRouteProps> = ({
  children,
  userRole,
  allowedRoles,
}) => {
  if (!userRole) {
    return <Navigate to={"/login"} />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
};

export default GuardProtectedRoute;
