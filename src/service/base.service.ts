import { axiosInstance } from "../apis/api.interceptor";
import { ApiRequestModel } from "../model/api-request.model";

export const BaseService = {
  get<T = any>({
    url,
    //   isLoading = true,
    payload,
    headers,
  }: Partial<ApiRequestModel>): Promise<T> {
    const params = { ...payload };
    for (const key in params) {
      if ((params as any)[key] === "" && (params as any)[key] !== 0) {
        delete (params as any)[key];
      }
    }
    return axiosInstance.get(`${url}`, {
      params,
      headers: headers || {},
    });
  },

  post<T = any>({
    url,
    //   isLoading = true,
    payload,
    headers,
  }: Partial<ApiRequestModel>): Promise<T> {
    return axiosInstance.post(`${url}`, payload, {
      headers: headers || {},
    });
  },

  put<T = any>({
    url,
    //   isLoading = true,
    payload,
    headers,
  }: Partial<ApiRequestModel>): Promise<T> {
    return axiosInstance.put(`${url}`, payload, {
      headers: headers || {},
    });
  },

  delete<T = any>({
    url,
    //   isLoading = true,
    payload,
    headers,
  }: Partial<ApiRequestModel>): Promise<T> {
    return axiosInstance.delete(`${url}`, {
      params: payload,
      headers: headers || {},
    });
  },
};
