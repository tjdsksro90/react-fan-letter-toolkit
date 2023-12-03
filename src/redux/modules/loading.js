import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default loading.reducer;
export const { loadingState } = loading.actions;
