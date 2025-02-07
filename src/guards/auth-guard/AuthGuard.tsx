import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../stores/store";

interface AuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthGuard;
