import axios, { AxiosError } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Dispatch, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { UserAuth } from "../stores/slices/auth.slice";
import { HttpStatus } from "../constants/httpStatus";

const refreshToken = async () => {
  try {
    const response = await axios.post("/auth/refresh-token", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const axiosInstance = (
  user: UserAuth,
  dispatch: Dispatch,
  stateSuccess: ActionCreatorWithPayload<UserAuth>,
  navigate: NavigateFunction
) => {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decodedToken = jwtDecode<JwtPayload>(user?.accessToken);
      if (decodedToken.exp && decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers.Authorization = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.status === HttpStatus.Success) {
        return response.data;
      }
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === HttpStatus.Unauthorized) {
        console.log("Unauthorized");
        navigate("/login");
      } else if (error.response?.status === HttpStatus.Forbidden) {
        console.log("Forbidden");
      } else if (error.response?.status === HttpStatus.NotFound) {
        console.log("Not Found");
      } else if (error.response?.status === HttpStatus.InternalServerError) {
        console.log("Internal Server Error");
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
