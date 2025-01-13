import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Logo
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link to="/login" className="hover:text-blue-500">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
