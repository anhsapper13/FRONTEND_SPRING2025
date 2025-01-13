import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserAuth {
  id: string;
  email: string;
  role: string | null;
  accessToken: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userAuth: UserAuth | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userAuth: {
    id: "",
    email: "",
    role: "guest",
    accessToken: "",
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userAuth: UserAuth }>
    ) => {
      state.isAuthenticated = true;
      state.userAuth = action.payload.userAuth;
    
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userAuth = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
