import { blue, red } from "../../assets/BasicStyle";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = blue;

export const __tabPatch = createAsyncThunk("checkTab", (payload, thunkAPI) => {
  return thunkAPI.dispatch(checkTap(payload));
});

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    checkTap: (state, action) => {
      if (action.payload === "cap") return blue;
      else return red;
    },
  },
});

export default tabSlice.reducer;
export const { checkTap } = tabSlice.actions;
