import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { persistor, RootState } from "../../stores/store";
import { logout } from "../../stores/slices/auth.slice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const userAuth =
    useSelector((state: RootState) => state.auth.userAuth) || null;
  const dispatch = useDispatch();
  console.log("header", userAuth);
  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold">
            Logo
          </NavLink>
          <div className="flex space-x-4">
            <NavLink to="/" className="hover:text-blue-500">
              Home
            </NavLink>
            {userAuth ? (
              <div className="">
                <NavLink to="/profile" className="hover:text-blue-500 mr-3">
                  {userAuth.userData.name}
                </NavLink>
                <button onClick={handleLogout} className="hover:text-blue-500">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink to="/login" className="hover:text-blue-500">
                  Login
                </NavLink>
                <NavLink to="/register" className="hover:text-blue-500">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
