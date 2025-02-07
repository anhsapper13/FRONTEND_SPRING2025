import { LoginUser, RegisterUser } from "../interfaces/auth.interface";
import { BaseService } from "./base.service";

const AuthService = {
  login: async (params: LoginUser) => {
    return await BaseService.post({
      url: "/auth/loginWithEmail",
      payload: params,
      // isLoading: true,
    });
  },
  register: async (params: RegisterUser) =>{
    return await BaseService.post({
      url:"/auth/register",
      payload:params
    })
  }
};

export default AuthService;
