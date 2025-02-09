import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useRedux";
import AuthService from "../../service/auth.service";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../stores/slices/auth.slice";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ gmail: "", password: "" });
  // const { loading } = useSelector((state: RootState) => state.auth);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginStart();
    try {
      const response = await AuthService.login(formData);
      console.log("response", response.data);
      const { data } = response.data;
      if (response) {
        dispatch(loginSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(loginFailure("nguu"));
    }
  };
  const handleSuccessGoogle  = (credentialResponse : CredentialResponse)=>{
    console.log("credential",credentialResponse.credential);
    
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Register here
          </Link>
          <GoogleLogin 
            onSuccess={handleSuccessGoogle}
          />
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
