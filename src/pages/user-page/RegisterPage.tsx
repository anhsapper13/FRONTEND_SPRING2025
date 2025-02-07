import { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../service/auth.service";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    gmail: "",
    password: "",
    confirmPassword: "",
    age: 0,
    role: "user",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { confirmPassword, ...others } = formData;
    console.log("register success ", others);
    await AuthService.register(others);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="block text-sm font-medium text-gray-700">Name</div>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700">Email</div>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.gmail}
            onChange={(e) =>
              setFormData({ ...formData, gmail: e.target.value })
            }
            required
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700">
            Password
          </div>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700">
            Confirm Password
          </div>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700">Address</div>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
        </div>
        <div>
          <div className="block text-sm font-medium text-gray-700">Age</div>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
