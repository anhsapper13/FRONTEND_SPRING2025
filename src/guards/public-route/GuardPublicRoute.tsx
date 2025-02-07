import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../stores/store";

interface GuardPublicRouteProps {
  children: React.ReactNode;
}

const GuardPublicRoute: React.FC<GuardPublicRouteProps> = ({ children }) => {
  const {isAuthenticated} = useSelector((state : RootState) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default GuardPublicRoute;
