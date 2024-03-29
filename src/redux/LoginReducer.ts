import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, AuthorizationType } from "../API/BloggerPlatformService";
import { setAppStatusAC } from "./AppReducer";

export const checkAuthTC = createAsyncThunk(
  "auth/getUserForLOginithation",
  async (
    param: { accessToken: string | null },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    try {
      const res = await authApi.authMe(param.accessToken);
      return res.data;
    } catch (e: any) {
    } finally {
      dispatch(setAppStatusAC({ status: "succeeded" }));
    }
  }
);

export const loginisationTC = createAsyncThunk(
  "auth/isLoginisation",
  async (param: { args: AuthorizationType }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    try {
      const res = await authApi.logIn(param.args);
      if (res.data) {
        localStorage.setItem("token", res.data.accessToken);
        return true;
      } else {
        return false;
      }
    } catch (e: any) {
    } finally {
      dispatch(setAppStatusAC({ status: "succeeded" }));
    }
  }
);

export type LoginStateType = {
  isLogin: boolean;
  autorised: boolean;
};

const initialState: LoginStateType = {
  isLogin: false,
  autorised: true,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Is Login
    builder.addCase(loginisationTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogin = action.payload;
      }
      return state;
    });
    builder.addCase(loginisationTC.rejected, (state, { payload }) => {
      //to do something inside
    });
    //is Auth
    builder.addCase(checkAuthTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLogin = true;
      }
      return state;
    });
    builder.addCase(checkAuthTC.rejected, (state, { payload }) => {
      //to do something inside
    });
  },
});

export const AuthReducer = slice.reducer;
