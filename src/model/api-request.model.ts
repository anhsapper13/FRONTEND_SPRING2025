export interface ApiRequestModel<T = any> {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    isLoading?: boolean;
    payload?: T; 
    headers?: Record<string, any>; 
  }
  