import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "api/api";
import { removeCookie, setCookie } from "api/cookies";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loadingState } from "./loading";

const initialState = {
  id: "",
  password: "",
};

export const __getLogin = createAsyncThunk(
  "getLogin",
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(loadingState(true));
      const response = await api.post(
        // "/login?expiresIn=1m",
        "/login",
        {
          id: payload.id,
          password: payload.password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      thunkAPI.dispatch(loadingState(false));
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      thunkAPI.dispatch(loadingState(false));
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getSignup = createAsyncThunk(
  "getSignup",
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(loadingState(true));
      const response = await api.post(
        "/register",
        {
          id: payload.id,
          password: payload.password,
          nickname: payload.nickname,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      thunkAPI.dispatch(loadingState(false));
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      thunkAPI.dispatch(loadingState(false));
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getUser = createAsyncThunk(
  "getUser",
  async (payload, thunkAPI) => {
    try {
      thunkAPI.dispatch(loadingState(true));
      const response = await api.get("/user", {
        headers: {
          "Content-type": "application/json",
        },
      });
      thunkAPI.dispatch(loadingState(false));
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      thunkAPI.dispatch(loadingState(false));
      return thunkAPI.rejectWithValue({
        err,
        navigate: payload.navigate,
      });
    }
  }
);

export const __editUser = createAsyncThunk(
  "editUser",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(loadingState(true));
    let formData = new FormData();
    console.log(payload.avatar, "--editUser.avatar--");
    formData.append("avatar", payload.avatar);
    formData.append("nickname", payload.nickname);
    try {
      const response = await api.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(payload, "payload payload payload payload ");
      thunkAPI.dispatch(loadingState(false));
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      thunkAPI.dispatch(loadingState(false));
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [__getLogin.pending ||
    __getUser.pending ||
    __getSignup.pending ||
    __editUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isLogin = false;
    },
    // rejected
    [__getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
      // removeCookie("accessToken");
      // toast.error("세션이 만료되어 자동 로그아웃합니다.");
      state.error = action.payload;
      action.payload.navigate("/login");
    },
    [__getLogin.rejected || __getSignup.rejected || __editUser.rejected]: (
      state,
      action
    ) => {
      state.isLoading = false;
      state.isLogin = false;
      state.error = action.payload;
    },
    // 로그인
    [__getLogin.fulfilled]: (state, action) => {
      console.log("fulfiled : ", action);
      state.isLoading = false;
      state.isLogin = true;
      state.id = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.avatar = action.payload.avatar;
      toast.success("로그인 성공!");
      setCookie("accessToken", action.payload.accessToken);

      // return state;
    },
    // 회원가입
    [__getSignup.fulfilled]: (state, action) => {
      console.log("fulfiled : ", action);
      state.isLoading = false;
      state.isLogin = true;
      return state;
    },
    // 유저 접근
    [__getUser.fulfilled]: (state, action) => {
      console.log("fulfiled userInfo: ", action);
      state.isLoading = false;
      state.isLogin = true;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.avatar = action.payload.avatar;
      return state;
    },
    // 유저 수정
    [__editUser.fulfilled]: (state, action) => {
      console.log("fulfiled editUser: ", action);
      state.isLoading = false;
      state.isLogin = true;
      state.nickname = action.payload.nickname;
      if (action.payload.avatar !== undefined)
        state.avatar = action.payload.avatar;
      return state;
    },
  },
});

export default loginSlice.reducer;
export const { checkLogin } = loginSlice.actions;
