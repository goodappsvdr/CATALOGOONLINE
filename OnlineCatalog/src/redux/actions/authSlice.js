import { createSlice } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  persistLocalStorage,
} from "../../utilities/localStorage.utility";

const InitialUserState = {
  isAuthenticated: undefined,
  token: null,
  loading: true,
  user: null,
  error: null,
};
const LogoutUserState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  user: null,
  error: null,
};

export const UserKey = "auth";

const authSlice = createSlice({
  name: "auth",
  initialState: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : InitialUserState,
  reducers: {
    loginSuccess(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      persistLocalStorage(UserKey, { token });
    },
    loadUserSuccess(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },

    logout() {
      clearLocalStorage(UserKey);
      return LogoutUserState;
    },
    updateUser(state, action) {
      const result = { ...state, ...action.payload };
      persistLocalStorage(UserKey, { token: result.token });
      return result;
    },
    loginStarted(state) {
      state.loading = true;
    },

    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = action.payload;
    },
    restartState() {
      clearLocalStorage(UserKey);
      return InitialUserState;
    },

    loginFinished(state) {
      state.loading = false;
    },
  },
});

export const {
  loginSuccess,
  loadUserSuccess,
  logout,
  restartState,
  updateUser,
  loginFinished,
  loginStarted,
  loginFailed,
} = authSlice.actions;

export default authSlice.reducer;
