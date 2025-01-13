import { Navigate } from "react-router-dom";

interface GuardPublicRouteProps {
  children: React.ReactNode;
  userRole?: string | null;
}

const GuardPublicRoute: React.FC<GuardPublicRouteProps> = ({
  children,
  userRole,
}) => {
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default GuardPublicRoute;
