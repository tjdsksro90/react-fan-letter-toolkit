import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "api/api";
import { toast } from "react-toastify";

// 추가하게 될 빈값 기본값
const initialState = {
  createdAt: "2023-11-02T11:25:37.026Z",
  nickname: "",
  img: "img-icon-cap.png",
  content: "",
  writedTo: "cap",
  userid: "",
};

export const __getLists = createAsyncThunk(
  "getLists",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lists`
      );
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __addList = createAsyncThunk(
  "addList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/lists`,
        payload
      );
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getDetailList = createAsyncThunk(
  "getDetailList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lists/${payload}`
      );
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteList = createAsyncThunk(
  "deleteList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/lists/${payload}`
      );
      console.log("response delete", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editList = createAsyncThunk(
  "editList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/lists/${payload.param.id}`,
        {
          content: payload.desc,
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editUserList = createAsyncThunk(
  "editUserList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lists?userId=${payload.userId}`
      );
      const listItems = response.data;
      const updatePromises = listItems.map(async (item) => {
        const itemId = item.id;

        const payloadItem = {
          nickname: payload.userName,
          img: payload.userImg,
        };

        try {
          const updatedResponse = await axios.patch(
            `${process.env.REACT_APP_SERVER_URL}/lists/${itemId}`,
            payloadItem
          );
          console.log(
            `Item with ID ${itemId} updated successfully`,
            updatedResponse.data
          );
        } catch (updateError) {
          console.error(`Error updating item with ID ${itemId}`, updateError);
        }
      });

      await Promise.all(updatePromises);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editUserGetList = createAsyncThunk(
  "editUserGetList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lists?userId=${payload.userId}`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editUserPatchList = createAsyncThunk(
  "editUserPatchList",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/lists/${payload.pickId}`,
        {
          nickname: payload.userName,
          img: payload.userImg,
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err, "Error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: {
    [__getLists.pending ||
    __addList.pending ||
    __getDetailList.pending ||
    __deleteList.pending ||
    __editList.pending ||
    __editUserList.pending]: (state, action) => {
      // 아직 진행중일 때
      state.isLoading = true;
      state.isError = false;
    },
    [__addList.rejected ||
    __addList.rejected ||
    __getDetailList.rejected ||
    __deleteList.rejected ||
    __editList.rejected ||
    __editUserList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // 리스트 조회
    [__getLists.fulfilled]: (state, action) => {
      console.log("fulfiled : ", action);
      state.isLoading = false;
      state.isError = false;
      state.lists = action.payload;
    },
    // 리스트 추가
    [__addList.fulfilled]: (state, action) => {
      console.log("fulfiled : ", action);
      state.isLoading = false;
      state.isError = false;
      state.lists = [...state.lists, action.payload];
      toast.success("리스트 추가 성공!");
    },
    // 리스트 상세페이지
    [__getDetailList.fulfilled]: (state, action) => {
      console.log("fulfiled : ", action);
      state.isLoading = false;
      state.isError = false;
      state.detail = action.payload;
    },
    // 리스트 삭제
    [__deleteList.fulfilled]: (state, action) => {
      console.log("fulfiled : ", action);
      state.isLoading = false;
      state.isError = false;
      toast.success("리스트 삭제 성공!");
    },
    // 리스트 수정
    [__editList.fulfilled]: (state, action) => {
      console.log("fulfiled : ", action);
      state.isLoading = false;
      state.isError = false;
      state.detail.content = action.payload.content;
      toast.success("리스트 수정 성공!");
    },
    // 유저 프로필 수정시 게시물도 모두 수정
    [__editUserList.fulfilled]: (state, action) => {
      console.log("fulfiled __editUserList : ", action);
      state.isLoading = false;
      state.isError = false;
      return state;
    },
  },
});

export const {} = listsSlice.actions;
export default listsSlice.reducer;
