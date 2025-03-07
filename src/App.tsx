import { useRoutes } from "react-router-dom";
import HomePage from "./pages/user-page/HomePage";
import LoginPage from "./pages/user-page/LoginPage";
import RegisterPage from "./pages/user-page/RegisterPage";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin-page/AdminDashboard";
import ContactPage from "./pages/user-page/ContactPage";
import GuardProtectedRoute from "./guards/role-based-guard/GuardProtectedRoute";
import AuthGuard from "./guards/auth-guard/AuthGuard";
import { useSelector } from "react-redux";
import { RootState } from "./stores/store";
import GuardPublicRoute from "./guards/public-route/GuardPublicRoute";

function App() {
  const userAuth =
    useSelector((state: RootState) => state.auth.userAuth) || null;
  const role = userAuth?.userData.role ?? null;

  const routers = useRoutes([
    {
      // general page
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "login",
          element: (
            <GuardPublicRoute>
              <LoginPage />
            </GuardPublicRoute>
          ),
        },
        {
          path: "register",
          element: (
            <GuardPublicRoute>
              <RegisterPage />
            </GuardPublicRoute>
          ),
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
      ],
    },
    // auth page
    // admin page
    {
      path: "/admin",
      element: (
        <AuthGuard>
          <GuardProtectedRoute userRole={role} allowedRoles={["admin"]}>
            <AdminLayout />
          </GuardProtectedRoute>
        </AuthGuard>
      ),
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
      ],
    },
  ]);
  return routers;
}

export default App;
