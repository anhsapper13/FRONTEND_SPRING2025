import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserAuth {
  userData: {
    name: string;
    email: string;
    age: number;
    role: string;
    address: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userAuth: UserAuth | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userAuth: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userAuth = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userAuth = null;
    },
  },
});

export const { loginFailure,loginSuccess,loginStart, logout } = authSlice.actions;
export default authSlice.reducer;
