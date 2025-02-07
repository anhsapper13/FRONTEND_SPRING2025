import axios, { AxiosError } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { HttpStatus } from "../constants/httpStatus";
import { BASE_URL } from "../constants/api-base-url";
import { store } from "../stores/store";
import { loginSuccess } from "../stores/slices/auth.slice";

const refreshToken = async () => {
  const userAuth = store.getState().auth.userAuth;
  if (!userAuth || !userAuth.userData) {
    return;
  }
  try {
    const response = await axios.post("/auth/refresh-token", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Refresh token error:", error);
    throw error; // Ném lỗi để có thể xử lý ở nơi gọi
  }
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json; charset=UTF-8",
  },
  timeout: 300000,
  timeoutErrorMessage: `Connection is timeout exceeded`,
});

// Request Interceptor: Kiểm tra và làm mới token nếu cần thiết
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = store.getState().auth.userAuth?.accessToken;
    const userData = store.getState().auth.userAuth?.userData;

    if (token) {
      const date = new Date();
      const decodedToken = jwtDecode<JwtPayload>(token);

      // Kiểm tra nếu token đã hết hạn
      if (decodedToken.exp && decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...userData,
          accessToken: data.accessToken, // Sử dụng accessToken thay vì token
        };
        store.dispatch(loginSuccess(refreshUser)); // Lưu token mới vào Redux
        config.headers.Authorization = `Bearer ${data.accessToken}`;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Nếu gặp lỗi 401, refresh token và thử lại request
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === HttpStatus.Unauthorized) {
      const userData = store.getState().auth.userAuth?.userData;

      try {
        const data = await refreshToken(); // Thử làm mới token
        const refreshUser = {
          ...userData,
          accessToken: data.accessToken,
        };
        store.dispatch(loginSuccess(refreshUser)); // Lưu token mới vào Redux
        // Cập nhật lại request và gửi lại request cũ
      } catch (refreshError) {
        store.dispatch(loginSuccess({ userData: null, accessToken: null }));
        return Promise.reject(refreshError); // Trả về lỗi nếu không thể refresh
      }
    }
    return Promise.reject(error);
  }
);
